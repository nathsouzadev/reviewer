# AI Reviewer

Projeto desenvolvido para conclusão de curso da turma JS + AWS na Reprograma em outubro/24

## Installation

1 - Install and run [Docker](https://www.docker.com/);

1.1 - If running, in the first time, use the script

```bash
$ npm run local:setup
```

1.2 - Rename `.env.local` to `.env`

2 - Run the scripts

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Routes available

```bash
$ localhost:3005/api
```

## Healthcheck

```bash
$ localhost:3005/api/health
```

## Backlog

### Anna Caroline

[ ] Criar rota POST /users

```
{
    name: 'Ada Lovelace',
    email: 'ada@reprograma.com.br'
}
```

[ ] Criar rota GET /users/:id

[ ] Criar rota GET /users

[ ] Criar rota PATCH /users/:id

```
{
    name: 'Ada Lovelace',
    email: 'ada@reprograma.com.br'
}
```

[ ] Criar rota DELETE /users/:id

### Nathally Souza

[x] Criar integração com o Gemini

[ ] Validar se o usuário existe

[ ] Criar rota POST /review

```
{
    email: 'ada@reprograma.com.br',
    url: 'github.com/pull-request'
}
```

#### Desenvolvido por Nathally Souza e Aana Caroline
