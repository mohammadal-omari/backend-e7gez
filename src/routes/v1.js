const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');

//-------------------------------------------------------------------------
const JWTAuth = require('../middleware/auth/JWT.auth');
//-------------------------------------------------------------------------
const userController = require('../controllers/user/user.controller');
const dashboardController =  require('../controllers/dashboard/dashboard.controller');
const fileController = require('../controllers/static files/read.files.controller');
//-------------------------------------------------------------------------
const payloadvalidate = require('../middleware/utilites/payloadValidate')
const multipartMiddleware = require('../middleware/utilites/multipart')
// const multipartMiddleware = multipart({ uploadDir: __dirname+ '/../upload' });
/*****************************************************************************/

// ---------------------------- Authentication Routes--------------------------------
router.post('/register', payloadvalidate,multipartMiddleware, userController.register);
router.post('/authentication/login', payloadvalidate, userController.login);
router.post('/authentication/logout',JWTAuth, userController.logout);
router.post('/authentication/passwordValidity',JWTAuth, userController.passwordValidity);
router.post('/authentication/updatePassword',JWTAuth, userController.updatePassword);
router.post('/authentication/updateUserProfile',JWTAuth, multipartMiddleware, userController.updateUserProfile);
router.get('/userInfo/:email',JWTAuth, userController.getUserInfo);
// ---------------------------- LRS Routes ------------------------------------------
// ---------------------------- Dashboard Routes --------------------------------

// ---------------------------- Static files Routes --------------------------------
router.get('/readFile/:path', fileController.get);




module.exports = router;