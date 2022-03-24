//repositories/TodoRepository

const Product = require('../models/product.model');
const stusu = require('../models/status.model');

class ProductRepository {

  constructor(model) {
    this.model = model;
  }

  // create a new Doctor
  create(data) {
    const product = new this.model(data);
    return product.save();
  }

  // return all doctors

  async findAll(page=1,limit=10,query) {
    return  await this.model.paginate(query,{
      populate:[
        {path:'sender',select:['name','email']},
        {path:'statusId',select:['name','active']},
        ],
      lean:true,
      page:page,
      limit,limit
    })

     // return this.model.find();
  }

  async findAll(page=1,limit=10,query,modelName) {
    console.log(query)
    // await this.model.findAll(query)

    return  await this.model.paginate(query,{
      populate:[
        {path:'sender',select:['name','email']},
        {path:'statusId',select:['name','active']},
        ],
      lean:true,
      page:page,
      limit,limit
    })
  }
  //find doctor by the id
  findById(id) {
    return this.model.findById(id);
  }

    // delete todo
  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  //update todo
  updateById(id, object) {
    const query = { _id: id };
    return this.model.findOneAndUpdate(query, { $set: { name: object.name, description: object.description,images:object.images ,statusId:object.statusId} });
  }

    //update todo
    updateStatus(id, object) {
      const query = { _id: id };
      return this.model.findOneAndUpdate(query, { $set: { statusId:object.statusId} });
    }
}

module.exports = new ProductRepository(Product);

