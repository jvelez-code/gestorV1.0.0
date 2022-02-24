const express =require('express');
var cors = require('cors');
//const app = express();
//const bodyParser = require('body-parser');

class Server{

   


    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server,{
            cors: {
                origins: ['http://0.0.0.0:4200']
            }
        });

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    
   }

   routes(){
    this.app.use(require('../routes/reportes'));
    
   /* this.app.get('/',(req, res)=>{
     res.send("Hola mundo env")
     });*/
    }

    middlewares(){
       // CORS
       //this.app.use( cors() );
       // Configurar cabeceras y cors
    this.app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
    });


       // Lectura y parseo del body
       this.app.use( express.json() );
       this.app.use( express.urlencoded({extended: false}));

       // Directorio Público
       this.app.use( express.static('public') );
    }

    

    socket() {
        this.io.on('connection',socket => {
        console.log('Cliente concectado', socket.id);
    
        socket.on('disconnect',()=>{
        console.log('Cliente desconcectado', socket.id);    
        })    
        });         
        }

    listen(){
        //this.app.listen(this.port,()=>{
            this.server.listen(this.port,()=>{
            console.log("Corriendo en puerto",this.port )
    });
    }

   }
      module.exports = Server;


