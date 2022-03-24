const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// fore Check Role Autherization
const utils = require('../auth/utilis')

const ROLES = require('../_helper/role')

// const BodyParser = require('body-parser')
const ProductController = require('../controllers/product/product.controller')

const upload = require('../controllers/upload.controller')


// // add a Doctor item
router.get('/',
passport.authenticate('jwt', { session: false }),
utils.checkIsInRole(ROLES.Admin,ROLES.User),
ProductController.getOrders);

// Post User Route
router.post('/',
passport.authenticate('jwt', { session: false }),
utils.checkIsInRole(ROLES.Admin,ROLES.User),
ProductController.updateProduct);



// Put Product Route
router.put('/:id',
passport.authenticate('jwt', { session: false }),
utils.checkIsInRole(ROLES.Admin),
// upload.uploadFiles,
ProductController.updateProductWithStatus);




module.exports = router;
