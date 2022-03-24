const mongoose=require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');


const statusScheema=mongoose.Schema({
  _id:Number,
  name:String,
  active:Boolean,
    products:[{
      type:Number,
      ref:'product',
      // get:ana
    }]       
},
{ timestamps:true }
)


const status=mongoose.model("statu",statusScheema)
module.exports = status;


