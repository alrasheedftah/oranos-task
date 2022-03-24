const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UserController = require('../../controllers/user/user.controller')
const UserValidation = require('../../Domain/Request/UserValidation')
const { validate, ValidationError, Joi } = require('express-validation')

// ...


router.post(
  '/signup',
  validate(UserValidation,{},{}),
  UserController.addNewUser
  );


// router.post(
//   '/signup',
//   passport.authenticate('signup', { session: false }),
//   async (req, res, next) => {
//     res.json({
//       message: 'Signup successful',
//       user: req.user
//     });
//   }
// );
  
router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            console.log(info)
            const error = new Error('An error occurred.');
            console.log(req.body)
            return next(error.message);
          }

          req.login(
            user,
            { session: false ,failureFlash:true},
            async (error) => {
              if (error) return next(error);
              const body = { _id: user._id, email: user.email ,role:user.role};
              const token = jwt.sign({ user: body }, 'TOP_SECRET');
            console.log(req.body)

              return res.json({ token ,role:user.role });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);


router.get('/profile',passport.authenticate('jwt', { session: false }),UserController.getProfile);



module.exports = router;
