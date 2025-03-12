# Arquivo Digital da Policia Civil

Esse e um projeto open-source desenvolvido com o intuito de ser um gerenciador de arquivos digitais, desenvolvido para a delegacia de policia civil de Osorio/RS


## Uso

Para usar o sistema e necessario realizar alguns passos para que o sistema funcione corretamente.
O sistema foi desenvolvido com a ideia de modularidade e facil implementacao, portanto, foi utilizado `Docker` para a criacao de `containers`
***

### 1. Instalacao

 Primeiro passo e baixar o codigo fonte, voce pode fazer isso usando o comando `git clone`

 E preciso criar um arquivo `.env` para os dados de conexao com o banco de dados e para a criacao do token JWT. Segue a lista de variaveis de ambiente:
 * `DB_HOST`
 * `DB_USER`
 * `DB_PASSWORD`
 * `DB_NAME`
 * `DB_PORT`
 * `DB_SSLMODE`
 * `JWT_KEY_SIGNING`

***

### 2. Docker
 
 Como o projeto foi desenvolvido em Docker, nao e necessario a instalacao de depencias do Node, nem do Go. 
 Para fazer a execucao e necessario criar o _build_ dos _containers_ individuais, pois as imagens sao usadas no arquivo `docker-compose-yml`

 ```
  api:
    image: server/adpc:1.4 #imagem da API
    container_name: api-adpc
    # ...
  
  app:
    image: app/adpc:1.0 #imagem do APP
    container_name: app-adpc
    # ...
  
  nginx:
    image: nginx/adpc:1.2 #imagem do NGINX
    container_name: nginx-adpc
    # ...
 ```

 Para criar a imagem de cada _container_ entre em cada diretorio "/api, /app, /nginx" e execute:
 `docker build -t nome-da-imagem .`

***

### 3. Inicializacao
 
 Com as imagens criadas, podemos executar o `docker-compose` para levantar a aplicacao como um todo.
 No meu caso, eu utilizei o mesmo arquivo `.env`, que criamos anteriormente, para o arquivo do `docker-compose`.
 `docker-compose up`

 ou caso o arquivo `.env` esteja em um diretorio diferente:
 `docker-compose --env-file "caminho-do-.env" up`

***

## Desing

Design das tela do APP no Figma: [link](https://www.figma.com/design/Wd4Kgeyj1XPbaknrvAlqRg/Gerenciador-de-Arquivos?node-id=0-1&t=gxuirvnPvhMxR96W-1)

***

## Tecnologias

Nome | Stack | Funcionalidade
:---: | :---: | :---: 
Figma | Design | Desenvolvimento do prototipo e telas do App
React.Js | Front-End | Criacao de telas e componente
Axios.Js | Front-End | Requisicoes para a API
Golang | Back-End | Linguagem usada para o desenvolvimento do BackEnd
Gin-Gonic | Back-End | Framework para a facilitar a criacao de APIs REST com Go
GORM | Back-End | O ORM do Go para facilitar a integracao com o banco de dados
PostgreSQL | Database | Banco de dados relacional
PgAdmin | Database | Interface de uso para o PostgreSQL
Docker | DevOps | Usado para a cricao de containers e deploy do App

Alem de tudo isso o sistema roda, localmente na intranet isolado da internet externa, em um SO Linux Ubuntu Server virtualizado.
