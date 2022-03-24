//repositories/TodoRepository

const User = require('../models/user.model');

class UserRepository {

  constructor(model) {
    this.model = model;
  }

  // create a new Doctor
  create(data) {
    const user = new this.model(data);
    return user.save();
  }

  // return all doctors

 async findAll(page,limit=2) {
   return  await this.model.paginate({},{
      page: page,
      limit: limit,
      })
//  return this.model.find({});
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
    return this.model.findOneAndUpdate(query, { $set: object });
  }
}

module.exports = new UserRepository(User);

