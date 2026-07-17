import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from core.models import AnimalAdocao, User

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def create_user():
    def make_user(email="teste@exemplo.com", password="senha_segura_123", name="Fulano da Silva"):
        return User.objects.create_user(email=email, password=password, name=name)
    return make_user

@pytest.fixture
def create_animal():
    def make_animal():
        return AnimalAdocao.objects.create(
            titulo="Cachorro para Adoção",
            especie="cachorro",
            raca="Vira-lata",
            descricao="Muito dócil e brincalhão",
            contato="84999999999",
            cidade="Natal",
            estado="RN",
            estagio="adulto",
            quantidade=1
        )
    return make_animal

@pytest.mark.django_db
def test_registrar_usuario(api_client):
    url = reverse('auth_register')
    data = {
        "name": "Novo Usuario",
        "email": "novo_usuario@exemplo.com",
        "senha": "senha_forte_123",
        "cep": "59000000",
        "estado": "RN",
        "cidade": "Natal",
        "rua": "Rua Teste",
        "numero": "123",
        "formas_contato": "WhatsApp",
        "tipo_colaborador": "individual"
    }
    response = api_client.post(url, data, format='json')
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data["success"] is True

@pytest.mark.django_db
def test_login_usuario(api_client, create_user):
    create_user(email="login@exemplo.com", password="password123")
    url = reverse('token_obtain_pair')
    data = {
        "email": "login@exemplo.com",
        "password": "password123"
    }
    response = api_client.post(url, data, format='json')
    assert response.status_code == status.HTTP_200_OK
    assert "access" in response.data
    assert "user" in response.data

@pytest.mark.django_db
def test_listar_animais_adocao(api_client, create_animal):
    create_animal()
    url = reverse('AnimaisAdocaoListar')
    response = api_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 1

@pytest.mark.django_db
def test_inserir_animal_adocao(api_client):
    url = reverse('AnimalAdocaoInserir')
    data = {
        "titulo": "Gato Manhoso",
        "especie": "gato",
        "raca": "Siamês",
        "descricao": "Procura um lar amoroso",
        "contato": "84988888888",
        "cidade": "Parnamirim",
        "estado": "RN",
        "estagio": "filhote",
        "quantidade": 1
    }
    response = api_client.post(url, data, format='multipart')
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data["titulo"] == "Gato Manhoso"

@pytest.mark.django_db
def test_detalhar_animal_adocao(api_client, create_animal):
    animal = create_animal()
    url = reverse('detalhar-animal', kwargs={'id': animal.id})
    response = api_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert response.data["titulo"] == animal.titulo

@pytest.mark.django_db
def test_detalhar_animal_nao_encontrado(api_client):
    url = reverse('detalhar-animal', kwargs={'id': 999})
    response = api_client.get(url)
    assert response.status_code == status.HTTP_404_NOT_FOUND

@pytest.mark.django_db
def test_remover_animal_adocao(api_client, create_animal):
    animal = create_animal()
    url = reverse('AnimalAdocaoRemoverAPI', kwargs={'id': animal.id})
    response = api_client.delete(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert AnimalAdocao.objects.count() == 0