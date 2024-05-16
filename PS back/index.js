const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const user = require('./Controllers/userController.js');
const pecas = require('./Controllers/userController.js');
const montagem = require('./Controllers/userController.js');
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Conexão com Mongoose à Base de Dados
mongoose
  .connect('mongodb+srv://carneiro:joaogoodman@utilizadores.uqwzeex.mongodb.net/Servidor')

  .then(() => {
    console.log('MongoDB conectado com Sucesso');
  })
  .catch(() => {
    console.log('Falhou');
  });


// Função para verificar o token
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ auth: false, message: 'Token não fornecido.' });

  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Falha ao autenticar o token.' });

    // Se tudo estiver correto, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

app.get('/', cors(), (req, res) => {});


// Rota protegida
app.get('/utilizador/montagem', verifyToken, (req, res) => {
  res.json('Conteúdo protegido');
});

// Para funcionar o userController.js
app.use('/', user);

// Para funcionar o pecasController.js
app.use('/', pecas);

// Para funcionar o montagemController.js
app.use('/', montagem);


app.listen(3001, () => {
  console.log('Porta Conectada');
});