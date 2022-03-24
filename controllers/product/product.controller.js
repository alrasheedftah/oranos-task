const repository = require('../../repositories/product.repository')
const ROLES = require('../../_helper/role')

exports.getProducts=(req,res,next)=>{
    var query={}
    if(req.user.role == ROLES.User)
    query = { sender : req.user._id }     
    

    repository.findAll(1,10,query)
    
    .then(products=>{
        res.json({products});
    })
    .catch((error) => console.log(error));
}


exports.getFrontProducts=(req,res,next)=>{
    quer={ statusId:2 }
    repository.findAll(1,100,quer)
    .then(products=>{
        res.json({products});
    })
    .catch((error) => console.log(error));
}


// TODO Create Order Collection To Save All History For Product
exports.getOrders=(req,res,next)=>{
    var query = { $or :[{ statusId : 1,  },{ statusId : 4,  }] }
    
    if(req.user.role == ROLES.User)
     query = { $and :[ {sender : req.user._id } ,{$or :[{ statusId : 1,  },{ statusId : 4,  }] }] }
    repository.findAll(1,10,query)
    
    .then(products=>{
        res.json({products});
    })
    .catch((error) => console.log(error));
}


exports.addNewProduct=(req,res,next)=>{
    req.body.sender = req.user._id
    req.body.statusId = 1
    repository.create(req.body)
    .then((product) => {
        console.log(product)
        res.json(product);
      })
      .catch((error) => console.log(error));
}



exports.updateProduct=(req,res,next)=>{
    let id = req.params.id
    req.body.statusId = 4; // For Udated Status 
    repository.updateById(id,req.body)
    .then((product) => {
        if(!product)
        res.send({
            status: false,
            message: 'Id Not Found '
        });

        else{
            res.send({
                status: true,
                message: 'Data Updated Succefuly',
                product : product
            });
        }
      })
      .catch((error) => next(error));
}

exports.updateStatusProduct=(req,res,next)=>{
    let id = req.params.id
    repository.updateStatus(id,req.body)
    .then((product) => {
        if(!product)
        res.send({
            status: false,
            message: 'Id Not Found '
        });

        else{
            res.send({
                status: true,
                message: 'Data Updated Succefuly',
                product : product
            });
            
        }


      })
      .catch((error) => next(error));
}



exports.updateProductWithStatus=(req,res,next)=>{
    let id = req.params.id
    repository.updateById(id,req.body)
    .then((product) => {
        if(!product)
        res.send({
            status: false,
            message: 'Product Not Found'
        });

        else{
            res.send({
                status: true,
                message: 'Data Updated Succefuly',
                product : product
            });
            
        }


      })
      .catch((error) => next(error));
}
