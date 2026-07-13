from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('animais-adocao/listar/', AnimaisAdocaoListar, name="AnimaisAdocaoListar"),
    path('animais-adocao/inserir/', AnimalAdocaoInserir, name="AnimalAdocaoInserir"),
    path('animais-adocao/remover/<int:id>/', AnimalAdocaoRemoverAPI, name="AnimalAdocaoRemoverAPI"),
    path('animais-adocao/detalhes/<int:id>/', AnimalDoacaoDetalhar, name='detalhar-animal'),
    
    path('auth/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/register/', register_view, name='auth_register'),
]