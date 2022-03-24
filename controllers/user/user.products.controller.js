const repository = require('../../repositories/product.repository')

// get Bookeds for user User 
exports.getUserProducts=(req,res,next)=>{
    let userId=req.params.id
    const query = { sender: userId };
    repository.findAll(1,10,query,'sender').then(bookeds=>{
        res.json(bookeds)
    })
    .catch(err=> console.log(err))
}

