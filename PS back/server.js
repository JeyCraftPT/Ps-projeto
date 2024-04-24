import express from 'express'
import path from 'path';
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';


/* Usar a routes do ficheiro Users.js */
/* import userControllerRoutes from './Controllers/userController.js'
import taskControllerRoutes from './Controllers/taskController.js'
import NotaControllerRoutes from './Controllers/notaController.js' */


const app = express()


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

/* Para podermos receber json */
app.use(cookieParser());


/* Usar a routes do ficheiro Users.js */
/* app.use('/api/user', userControllerRoutes)
app.use('/api/task', taskControllerRoutes)
app.use('/api/nota', NotaControllerRoutes) */


const PORT = process.env.PORT || 3000

/* Link de conexão de base de dados */
const URI = 'mongodb+srv://JeyCraftPT:WzICSG8aBgJcb7jP@programaservi.shp4kua.mongodb.net/?retryWrites=true&w=majority&appName=ProgramaServi' 

/* Tentar conectar a base de dados, caso contrário mostrar erro */

/* Fazer conexão com base de dados */

mongoose.connect(URI).then(() => console.log('Connected to MongoDB')).catch((error) => console.log(error))

// Definir pasta publica para carregar o HTML
//Vai buscar o nosso diretório atual e carrega os ficheiros dentro da pasta public

app.use(express.static(path.join(process.cwd(), 'public')))



app.listen(PORT, () => console.log(`Server listening on localhost:${PORT}`))

