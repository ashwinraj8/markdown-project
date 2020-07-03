
   let  ensureAuthenticated =  (req, res, next)=> {
      if (req.isAuthenticated()) {
       // console.log(req);
        return next();
      }
     // req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/users/login');
    }

  
    let checkAdmin  = (req, res, next)=> {
      if (req.user.isAdmin){
        return next();
      }
     // req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/users/login');
    }

    const serializeUser = user => {
      return {
        username: user.username,
        email: user.email,
        name: user.name,
        _id: user._id,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt
      };
    };
  


  module.exports = {
    ensureAuthenticated,
    checkAdmin,
    serializeUser
  }