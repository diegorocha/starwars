# Starwars

Esse projeto se trata de uma api simples feita em NodeJS com intuito de manipular dados dos planetas de starwars.

## Como executar

Para facilitar a execução no ambiente de desenvolvimento foi criado um arquivo docker-compose.yml que é responsável por gerenciar um container mongodb e um container nodejs.

É preciso ter o docker e docker-compose instalados.

Gerar o arquivo .env com as variáveis de ambiente do container da aplicação

```
cp env-sample .env
```

O arquivo env-sample foi deixado como exemplo das variáveis que precisam ser preenchidas.

Iniciando ambiente de desenvolvimento:
```
docker-compose up
```
Para iniciar no modo background
```
docker-compose up -d
```
Parando ambiente de desenvolvimento
```
docker-compose down
```

## Observações
Como o intuito era permitir um acesso sequencial dos planetas através de um id foi utilizado o pacote "mongoose-auto-increment" para criar um autoincremento no mongodb, embora essa ideia não seja a mais adequada na prática, foi utilizada para facilitar essa implementação.

Foram incluidas duas rotas adicionais com intuito de verificar o funcionamento da aplicação

* ping - Verificar se a instância está funcionando. Útil para um possível load balance.
* healthcheck - Verificar se as dependências do projeto estão acessíveis. Util para "troubleshooting"

O projeto não foi desenvolvido com finalidade de entrar em produção, então existem alguns ajustes a serem feitos, como por exemplo o melhor desacoplamento do mongodb durante a execução dos testes unitários, bem como o aumento dos testes (quantidade e cobertura) e melhoria de alguns dos  testes existentes.

Outro ponto que pode melhor é a adoção de um padrão de estilo de código, como o ESLint.
