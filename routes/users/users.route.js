const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// fore Check Role Autherization
const utils = require('../../auth/utilis')

const ROLES = require('../../_helper/role')

// const BodyParser = require('body-parser')
const UserController= require('../../controllers/user/user.controller')


// // add a Doctor item
router.get('/',
// passport.authenticate('jwt', { session: false }),
// utils.checkIsInRole(ROLES.Admin),
UserController.getUsers);
router.get('/:id',UserController.getUserData);
router.post('/',UserController.addNewUser);
router.delete('/:id',UserController.deleteUser);
router.put('/:id',UserController.updateUser);

router.get('/:id/product',UserController.updateUser);




module.exports = router;
