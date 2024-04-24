import express from 'express'
const router = express.Router()
import User from '../Models/userModel.js'
import bcrypt from 'bcrypt'

/*

    GET -> Obter
    POST -> Criar
    UPDATE -> Atualizar
    PUT -> Atualizar (substituir)
    DELETE -> Apagar

*/


/* 
router.register = function(req, res) {
    var newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
      if (err) {
        return res.status(400).send({
          message: err
        });
      } else {
        user.hash_password = undefined;
        return res.json(user);
      }
    });
  };
 */
router.post('/Register', async (req, res) => {
    console.log(req.body)
    if(!req.body.username)
        return res.status(400).json({ message: 'Missing username'})

    if(!req.body.password)
        return res.status(400).json({ message: 'Missing password'})


    try {
        const userData = { username: req.body.username , hashPassword: await bcrypt.hash(req.body.password, 10)}
        const user = await User.create(userData)
        res.cookie('userData', JSON.stringify(user), { maxAge: 1000 * 60 * 60 * 24}); // 24 horas de expirar)
        return res.redirect('http://localhost:3000/main.html')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    } 
});
  
/*   router.sign_in = function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
      }
      return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') });
    });
  }; */

router.get('/login', async (req, res) => {

    if(!req.query.username)
        return res.status(400).json({ message: 'Missing username'})

    if(!req.query.password)
        return res.status(400).json({ message: 'Missing password'})
        
    const { username, password } = req.query;


    try {
      // Find the user by username in the database
      const user = await User.findOne({ username });
      console.log(user)
  
      if (!user) {
        // User not found
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare the entered password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.hashPassword);
  
      if (passwordMatch) {
        // Passwords match, authentication successful
        // Return user information
        res.cookie('userData', JSON.stringify(user), { maxAge: 1000 * 60 * 60 * 24}); // 24 horas de expirar)
        return res.redirect('http://localhost:3000/main.html')

      } else {
        // Passwords do not match, authentication failed
        return res.status(401).json({ message: 'Authentication failed' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


/*   router.loginRequired = function(req, res, next) {
    if (req.user) {
      next();
    } else {
  
      return res.status(401).json({ message: 'Unauthorized user!!' });
    }
  }; */


/*   router.profile = function(req, res, next) {
    if (req.user) {
      res.send(req.user);
      next();
    } 
    else {
     return res.status(401).json({ message: 'Invalid token' });
    }
  }; */

export default router