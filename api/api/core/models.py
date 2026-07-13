from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('O email é obrigatório')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser):
    TIPO_CHOICES = [
        ('individual', 'Colaborador Individual'),
        ('ong', 'ONG'),
    ]
    
    name = models.CharField('Nome', max_length=150)
    email = models.EmailField('Email', max_length=100, unique=True)
    foto = models.ImageField(upload_to='perfis', blank=True, null=True)
    birthday = models.DateField('Data de Nascimento', null=True, blank=True) 
    cep = models.CharField('CEP', max_length=8)
    estado = models.CharField('Estado', max_length=100)
    cidade = models.CharField('Cidade', max_length=100)
    rua = models.CharField('Rua', max_length=150)
    numero = models.CharField('Número', max_length=20)
    descricao_perfil = models.TextField('Descrição Perfil', blank=True, null=True)
    formas_contato = models.CharField('Contato', max_length=200)
    tipo_colaborador = models.CharField('Tipo Colaborador', max_length=20, choices=TIPO_CHOICES)
    chave_pix = models.CharField('Pix', max_length=150, null=True, blank=True)
    link_whatsapp = models.URLField('Whatsapp', max_length=300, null=True, blank=True)
    endereco_atuacao = models.TextField('Endereço Atuação', null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.name
    

class Relato_Abandono(models.Model):
    situacao_caso = models.CharField('Situação', max_length=100)
    descricao = models.TextField('Descrição')
    horario_ocorrido = models.DateTimeField('Horário Ocorrido')
    estado_animal = models.CharField('Estado do Animal', max_length=100)
    cidade = models.CharField('Cidade', max_length=100)
    rua = models.CharField('Rua', max_length=150)
    endereco_complemento = models.TextField('Endereço Complemento', blank=True, null=True)
    e_anonimo = models.BooleanField('Anônimo', default=False)
    
    # Para permitir o anonimato, a FK precisa aceitar NULL. 
    # Usamos SET_NULL para que, se o usuário deletar a conta, a denúncia não suma do mapa.
    id_usuario_relatou = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"Relato {self.id} - {self.cidade}"


class Animal(models.Model):
    SITUACAO_CHOICES = [
        ('a_resgatar', 'A Resgatar'),
        ('em_tratamento', 'Em Tratamento'),
        ('pronto_adocao', 'Pronto para Adoção'),
    ]
    ESTAGIO_CHOICES = [
        ('filhote', 'Filhote'),
        ('adulto', 'Adulto'),
    ]

    tipo_animal = models.CharField('Tipo Animal', max_length=50) 
    estagio_vida = models.CharField('Estágio de Vida', max_length=20, choices=ESTAGIO_CHOICES)
    data_resgate = models.DateField('Data Resgate')
    forma_resgate = models.TextField('Forma Resgate')
    situacao_atual = models.CharField('Situação Atual', max_length=20, choices=SITUACAO_CHOICES)
    anuncio_ativo = models.BooleanField('Anúncio Ativo', default=True)
    id_ong_resgatou = models.ForeignKey(User, on_delete=models.PROTECT)

    def __str__(self):
        return f"{self.tipo_animal} ({self.situacao_atual})"


class Notificacao(models.Model):
    # Adicionado related_name para evitar conflitos de busca reversa no Django
    id_ong_destino = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notificacoes')
    
    id_relato = models.ForeignKey(Relato_Abandono, on_delete=models.CASCADE) 
    
    mensagem = models.TextField('Mensagem')
    # auto_now_add preenche a data de envio automaticamente na hora que a notificação é criada
    data_envio = models.DateTimeField('Data Envio', auto_now_add=True) 
    lida = models.BooleanField(default=False)


class Solicitacao_Adocao_Visita(models.Model):
    STATUS_CHOICES = [
        ('pendente', 'Pendente'),
        ('aprovado', 'Aprovado'),
        ('recusado', 'Recusado'),
    ]

    id_usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    id_animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    data_hora_visita = models.DateTimeField('Data e Hora Visita')
    quantidade_adotar = models.IntegerField('Quantidade', default=1)
    status_solicitacao = models.CharField("Status", max_length=20, choices=STATUS_CHOICES, default='pendente')
    
class AnimalAdocao(models.Model):
    ESPECIE_CHOICES = [
        ('cachorro', 'Cachorro'),
        ('gato', 'Gato'),
        ('passaro', 'Passaro'),
    ]
    ESTAGIO_CHOICES = [
        ('filhote', 'Filhote'),
        ('adulto', 'Adulto'),
    ]

    titulo = models.CharField(max_length=150)
    especie = models.CharField('Espécie', max_length=100, choices=ESPECIE_CHOICES)
    raca = models.CharField(max_length=100)
    descricao = models.TextField()
    contato = models.CharField(max_length=100)
    cidade = models.CharField(max_length=100)
    estado = models.CharField(max_length=50)
    estagio = models.CharField('Estágio de Vida', max_length=20, choices=ESTAGIO_CHOICES)
    quantidade = models.IntegerField(default=1)
    foto = models.ImageField(upload_to='animais_adocao/', blank=True, null=True)

    def __str__(self):
        return self.titulo
    
class AnimalTratamento(models.Model):
    especie = models.CharField(max_length=100)
    raca = models.CharField(max_length=100)
    descricao_ocorrido = models.TextField()
    chave_pix = models.CharField(max_length=200)
    foto = models.ImageField(upload_to='animais_tratamento/', blank=True, null=True)

    def __str__(self):
        return f"{self.especie} - {self.raca}"