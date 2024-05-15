const mongoose = require('mongoose');
mongoose
  .connect('mongodb+srv://carneiro:joaogoodman@utilizadores.uqwzeex.mongodb.net/Servidor')

  .then(() => {
    console.log('MongoDB conectado com Sucesso');
  })
  .catch(() => {
    console.log('Falhou');
  });
