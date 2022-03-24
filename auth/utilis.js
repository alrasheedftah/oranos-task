

exports.checkIsInRole = (...roles) => (req, res, next) => {
    if (!req.user) {
      return res.redirect('/login')
    }
   
    const hasRole = roles.find(role => req.user.role === role)
    if (!hasRole) {
        console.log(req.user)
        console.log("error Role "+req.user)
      return res.redirect('/login')
    }

    
   
    return next()
   }
   

//    exports.checkIsInRole   