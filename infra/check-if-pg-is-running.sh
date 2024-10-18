#!/bin/bash

# Nome do contêiner
CONTAINER_NAME="postgres"

# Verifica se o contêiner está rodando
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "O contêiner '$CONTAINER_NAME' já está em execução."
else
    echo "O contêiner '$CONTAINER_NAME' não está em execução. Iniciando..."
    
    # Verifica se o contêiner existe, mas está parado
    if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
        echo "O contêiner '$CONTAINER_NAME' existe, mas está parado. Iniciando contêiner..."
        docker start $CONTAINER_NAME
    else
        # Caso o contêiner não exista, cria e inicia um novo
        echo "O contêiner '$CONTAINER_NAME' não existe. Criando e iniciando um novo..."
        docker run --name $CONTAINER_NAME -e POSTGRES_PASSWORD=minhasenha -p 5432:5432 -v $HOME/meu-vol-postgres:/var/lib/postgresql/data -d postgres
    fi
fi
