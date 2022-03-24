const repository = require('../../repositories/user.repository')
const repositoryProduct = require('../../repositories/product.repository')


exports.getProfile=(req,res,next)=>{
    repository.findById(req.user._id)
    .then(users=>{
        res.json({users});
    })
}



exports.getUsers=(req,res,next)=>{
    page=req.query.page
    repository.findAll(page)
    .then(users=>{
        res.json({users});
    })
}

exports.getUserData=(req,res,next)=>{
    let id=req.params.id
    repository.findById(id).then(user=>{
        res.json(user)
    })
    .catch(err=> next(err))
}

// get Bookeds for user User 
exports.getUserBookeds=(req,res,next)=>{
    let id=req.params.id
    repository.findById(id).then(user=>{
        res.json(user)
    })
    .catch(err=> console.log(err))
}



exports.addNewUser=(req,res,next)=>{
    repository.create(req.body)
    .then((user) => {
        res.json(user);
      })
      .catch((error) => next(error));
}


exports.updateUser=(req,res,next)=>{
    let id = req.params.id
    repository.updateById(id,req.body)
    .then((user) => {
        res.json(user);
      })
      .catch((error) => next(error));
}




exports.deleteUser=(req,res,next)=>{
    let id = req.params.id
    repository.deleteById(id,req.body)
    .then((user) => {
        res.json(user);
      })
      .catch((error) => next(error));
}