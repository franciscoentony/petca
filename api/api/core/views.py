from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView



####### CRUD Animal ########
@api_view(['GET'])
def AnimaisAdocaoListar(request):
    lista_animais = AnimalAdocao.objects.all()
    serializer = AnimalAdocaoSerializer(lista_animais, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def AnimalDoacaoDetalhar(request, id):
    try:
        animal = AnimalAdocao.objects.get(id=id)
    except AnimalAdocao.DoesNotExist:
        return Response({'erro': 'Animal não encontrado'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = AnimalAdocaoSerializer(animal, context={'request' : request})
    
    return Response(serializer.data)
    

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def AnimalAdocaoInserir(request):
    serializer = AnimalAdocaoSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def AnimalAdocaoEditarAPI(request, id):
    animal = get_object_or_404(Animal, pk=id)
    serializer = AnimalAdocaoSerializer(data=request.data, instance=animal)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def AnimalAdocaoRemoverAPI(request, id):
    animal = get_object_or_404(AnimalAdocao, pk=id)
    animal.delete()
    return Response(
        status=status.HTTP_204_NO_CONTENT
    )

@api_view(['POST'])
def register_view(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": True, "message": "Usuário criado com sucesso!"}, 
            status=status.HTTP_201_CREATED)    
        
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer