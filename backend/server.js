// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const contatoRoutes = require('./routes/contato.router'); // Importe as rotas de contatos

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Rotas
app.use('/contatos', contatoRoutes); // Use as rotas de contatos

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor rodando!'); // Mensagem de teste
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
