
exports.getHome=(req,res,next)=>{
    res.render('index',{
        pageTitle:'Home',
        isUser: req.params.id,
        friendRequests:[]
    })

}


exports.getHomeAna=(req,res,next)=>{
    res.render('app',{
        pageTitle:'Home',
        isUser: req.params.id,
        friendRequests:[]
    })

}