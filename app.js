const { Socket } = require('dgram');

const express = require('express')

const path=require('path')


const config = require('./Config/Config');
const createError = require('http-errors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
var fs = require('fs')
const { validate, ValidationError, Joi } = require('express-validation')

const fileUpload = require('express-fileupload');


const homeRouter=require('./routes/home.route')


http = require('http'),
app = express(),
server = http.createServer(app)


mongoose.connect(config.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
// io = require('socket.io')(server);
// require('./Sockets/init.socket')(io)



// enable files upload
app.use(fileUpload({
  createParentPath: true
}));



// write logs to a file
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'assets/access.log'), { flags: 'a' })
 




app.set('view engine','ejs')
app.set('views','views') //defualt

app.use(express.static(path.join(__dirname,'assets')))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());  //enable cors
 
app.use(logger('dev',{ stream: accessLogStream }));

//import To Protected Routed
require('./auth/auth');


// Home Route 
app.use('/',homeRouter)


// Authentication Route 
const Authroutes = require('./routes/auth/user.route');
app.use('/auth',Authroutes);

// User Route ust For Admin Role
const UserRoutes = require('./routes/users/users.route')
app.use('/api/admin/users',UserRoutes)
//for Both Admin And Sender 
const ProductRoutes = require('./routes/product.route')
app.use('/api/admin/products',ProductRoutes)

const OrderRoutes = require('./routes/orders.route')
app.use('/api/admin/orders',OrderRoutes)

//for Upload File Routes 
const UploadRoutes = require('./routes/uploads.route')
app.use('/api/admin/uploads',UploadRoutes)

const FrontRoutes = require('./routes/front.route')
app.use('/api/front/products',FrontRoutes)

server.listen(process.env.PORT || config.APP_PORT,()=>{

    console.log('Node app is running on port 3000');
    
    }); //http://muhana9.com/markatChat/
    