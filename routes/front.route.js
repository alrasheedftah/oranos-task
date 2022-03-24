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
ProductController.getFrontProducts);


module.exports = router;
