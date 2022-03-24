module.exports = {
  DB: process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb://localhost:27017/dbtask', //'mongodb+srv://anarasta:FaqJhW7z6JGEl3xG@cluster0-ezfxl.mongodb.net/doctor?retryWrites=true&w=majority'
   // 
    APP_PORT: process.env.APP_PORT ? process.env.APP_PORT : 3000,
    baseURL: process.env.BACKEND_URL ? process.env.BACKEND_URL : 'http://localhost' //'https://doctory-app.herokuapp.com'// 'http://localhost',
 
  };
  