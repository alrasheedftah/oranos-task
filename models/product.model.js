const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;
// Define schema for todo items
const BookedSchema = new Schema({
  name: {
    type: String,
  },
  description:{
    type:String,
  },
  images:{
    type:[String],
  },  
  time:Date,
  // statusId:Number,
  sender:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'user'
},
statusId:{
  type:Number,
  ref:'statu'
}  
},
{timestamps:true}
);

BookedSchema.plugin(mongoosePaginate);
const Booked = mongoose.model('product', BookedSchema);

module.exports = Booked;
