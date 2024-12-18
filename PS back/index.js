const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const user = require('./Controllers/userController.js');
const pecas = require('./Controllers/pecasController.js');
const montagem = require('./Controllers/montagemController.js');
const estatisticas = require('./Controllers/estatisticasController.js')
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const JWT_SECRET = 'sua_chave_secreta_aqui';


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

  jwt.verify(token, JWT_SECRET, function (err, decoded) {

    if (err) return res.status(500).json({ auth: false, message: 'Falha ao autenticar o token.' });

    // Se tudo estiver correto, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

app.get('/', cors(), (req, res) => { });


// Para funcionar o userController.js
app.use('/', user);

// Para funcionar o pecasController.js
app.use('/', verifyToken, pecas);

// Para funcionar o montagemController.js
app.use('/', verifyToken, montagem);

// Para funcionar o estatisticasController.js
app.use('/', verifyToken, estatisticas);

app.listen(3001, () => {
  console.log('Porta Conectada');
});