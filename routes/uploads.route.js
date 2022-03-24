const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// fore Check Role Autherization
const utils = require('../auth/utilis')

const ROLES = require('../_helper/role')

const upload = require('../controllers/upload.controller')

router.post('/',
// passport.authenticate('jwt', { session: false }),
// utils.checkIsInRole(ROLES.Admin),
upload.uploadFiles);



module.exports = router;
