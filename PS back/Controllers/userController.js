const express = require('express');
const User = require('../Models/userModel.js');
const user = express.Router();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'sua_chave_secreta_aqui';

user.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const check = await User.findOne({ username: username });
  
      if (check) {
        const matchPassword = await bcrypt.compare(password, check.password);
        if (matchPassword){
          // Criação do token JWT
          const token = jwt.sign({ id: check._id }, JWT_SECRET, {
            expiresIn: 86400 // expira em 24 horas
          });
          res.header('authorization', token)
          res.json({token, userId:check._id, message:'Sucesso'});
  
  
        } else {
          res.json('PasswordErrada')
        }
      } else {
        res.json('UtilizadorNaoExiste');
      }
    } catch (e){
        res.status(500).json('Erro');
        console.log(e);
    }
  });
  
  user.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const check = await User.findOne({ username: username });

        if (check) {
        res.json('UtilizadorExiste');
        } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        const data = {
            username: username,
            email: email,
            password: hashedPassword,
        };
        
        await User.insertMany([data]);
        // Criação do token JWT
        const token = jwt.sign({ id: data._id }, JWT_SECRET, {
            expiresIn: 86400 // expira em 24 horas
        });
        res.header('authorization', token)
        res.json({token, userId:data._id, message:'Sucesso'});
        }
    } catch (e) {
        res.status(500).json('Erro');
        console.log(e);
    }
});

module.exports = user;