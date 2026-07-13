from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    senha = serializers.CharField(
        write_only=True, 
        source='password', 
        style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = [
            'id', 'name', 'foto','email', 'senha', 'birthday', 'cep', 'estado', 
            'cidade', 'rua', 'numero', 'descricao_perfil', 'formas_contato', 
            'tipo_colaborador', 'chave_pix', 'link_whatsapp', 'endereco_atuacao'
        ]

    def create(self, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
        
class RelatoAbandonoSerializer(serializers.ModelSerializer):
    # Exibe o nome do usuário que relatou no GET, mas aceita apenas o ID no POST/PUT
    nome_usuario_relatou = serializers.ReadOnlyField(source='id_usuario_relatou.name')

    class Meta:
        model = Relato_Abandono
        fields = [
            'id', 'situacao_caso', 'descricao', 'horario_ocorrido', 'estado_animal', 
            'cidade', 'rua', 'endereco_complemento', 'e_anonimo', 'id_usuario_relatou',
            'nome_usuario_relatou'
        ]


class AnimalSerializer(serializers.ModelSerializer):
    nome_ong = serializers.ReadOnlyField(source='id_ong_resgatou.name')
    situacao_atual_display = serializers.CharField(source='get_situacao_atual_display', read_only=True)
    estagio_vida_display = serializers.CharField(source='get_estagio_vida_display', read_only=True)

    class Meta:
        model = Animal
        fields = [
            'id', 'tipo_animal', 'estagio_vida', 'estagio_vida_display', 'data_resgate', 
            'forma_resgate', 'situacao_atual', 'situacao_atual_display', 'anuncio_ativo', 
            'id_ong_resgatou', 'nome_ong'
        ]

class NotificacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificacao
        fields = ['id', 'id_ong_destino', 'id_relato', 'mensagem', 'data_envio', 'lida']


class SolicitacaoAdocaoVisitaSerializer(serializers.ModelSerializer):
    nome_usuario = serializers.ReadOnlyField(source='id_usuario.name')
    tipo_animal = serializers.ReadOnlyField(source='id_animal.tipo_animal')
    status_display = serializers.CharField(source='get_status_solicitacao_display', read_only=True)

    class Meta:
        model = Solicitacao_Adocao_Visita
        fields = [
            'id', 'id_usuario', 'nome_usuario', 'id_animal', 'tipo_animal', 
            'data_hora_visita', 'quantidade_adotar', 'status_solicitacao', 'status_display'
        ]
        
class AnimalAdocaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimalAdocao
        fields = '__all__'

class AnimalTratamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimalTratamento
        fields = '__all__'

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.username_field in self.fields:
            self.fields[self.username_field].required = False
        self.fields['username'] = serializers.CharField(required=False)

    def validate(self, attrs):
        email_val = attrs.get('email')
        username_val = attrs.get('username')
        
        credencial = email_val or username_val
        
        if not credencial:
            raise serializers.ValidationError({
                "email": "Este campo é obrigatório."
            })
        
        attrs[self.username_field] = credencial
        
        # 1. Executa a validação padrão para gerar as chaves 'access' e 'refresh'
        data = super().validate(attrs)
        
        # 2. INJETA OS DADOS DO USUÁRIO DE VOLTA (O que estava faltando!)
        data['user'] = {
            'id': self.user.id,
            'name': self.user.name,
            'email': self.user.email,
            'tipo_colaborador': self.user.tipo_colaborador
        }
        
        return data