# Projeto CRUD de Contatos

Este é um projeto de CRUD (Create, Read, Update, Delete) de contatos, desenvolvido com React no frontend e Node.js com Sequelize no backend.

## Tecnologias Utilizadas

- React: Biblioteca JavaScript para construção de interfaces de usuário.
- Material-UI: Framework de componentes React para um design bonito e responsivo.
- Node.js: Ambiente de execução JavaScript server-side.
- Express: Framework web para Node.js.
- Sequelize: ORM (Object-Relational Mapping) para Node.js, compatível com diversos bancos de dados relacionais.

## Funcionalidades

- Adicionar um novo contato com nome, email e telefone.
- Editar um contato existente.
- Excluir um contato.
- Pesquisar contatos pelo nome.

## Configuração

### Frontend

1. Clone o repositório: `git clone https://github.com/HenriqueADiniz/Crud-Contatos.git`
2. Navegue até o diretório do frontend: `cd Crud-Contatos/frontend`
3. Instale as dependências: `npm install`
4. Inicie o servidor de desenvolvimento: `npm start`

### Backend

1. Navegue até o diretório do backend: `cd Crud-Contatos/backend`
2. Instale as dependências: `npm install`
3. Configure as credenciais do banco de dados no arquivo `config/database.js`.
4. Execute as migrações do banco de dados: `npx sequelize-cli db:migrate`
5. Inicie o servidor: `npm start`

Certifique-se de configurar corretamente o backend com as credenciais do seu banco de dados antes de iniciar o servidor.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [Licença MIT](https://opensource.org/licenses/MIT).
