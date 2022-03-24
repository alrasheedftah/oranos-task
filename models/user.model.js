const mongoose=require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt = require('bcrypt');


const userScheema=mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    gender:String,
    birth:Date,
    password:String,
    role:String,
    // isAdmin:{
    //     type:Boolean,
    //     default:false
    // }
    products:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'product',
      // get:ana
    }]       
    
},
{ timestamps:true }
)




userScheema.pre(
    'save',
    async function(next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);
  
      this.password = hash;
      next();
    }
  );
  
  // 10180 abo albusher
  // ...
  
    
  userScheema.methods.isValidPassword = async function(password) {
      const user = this;
      const compare = await bcrypt.compare(password, user.password);
    
      return compare;
    }
    


userScheema.plugin(mongoosePaginate)
const User=mongoose.model("user",userScheema)
module.exports = User;
