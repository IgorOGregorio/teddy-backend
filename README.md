# Projeto em Desenvolvimento

Este repositório contém o código-fonte de um projeto em desenvolvimento, configurado para ser executado utilizando Docker e Docker Compose.

## Pré-requisitos

Certifique-se de que você tem as seguintes ferramentas instaladas em sua máquina:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Executando o Projeto

Para iniciar o projeto em modo de desenvolvimento, siga os seguintes passos:

1. Clone este repositório
2. Execute o comando abaixo para construir e levantar os containers em segundo plano:
    ```bash
     docker-compose -f docker-compose.dev.yml up --build -d
3. Para verificar os logs e o status dos containers, utilize:
    ```bash
    docker-compose logs -f
4. Para parar os containers:
    ```bash
    docker-compose down
5. O projeto executa em http://localhost:3000

## Projeto em produção

Acesse [Swagger](http://85.31.62.16:3944/api#/)

## Próximas features

1. Na contabilidade de acessos da URL, utilizar filas para garantir a contagem correta em acessos simultaneos. Intuito é utilizar BullMQ para gerenciamentos dos jobs inseridos nas filas e REDIS para armazenar em memória os jobs a serem realizados.
2. Ferramentas de monitoramento como Prometheus
3. Otimizar CI/CD pipelines para testes.

