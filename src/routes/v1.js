const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');

//-------------------------------------------------------------------------
const JWTAuth = require('../middleware/auth/JWT.auth');
//-------------------------------------------------------------------------
const userController = require('../controllers/user/user.controller');
const itemController = require('../controllers/item/item.controller');
const dashboardController =  require('../controllers/dashboard/dashboard.controller');
const fileController = require('../controllers/static files/read.files.controller');
//-------------------------------------------------------------------------
const payloadvalidate = require('../middleware/utilites/payloadValidate')
const multipartMiddleware = require('../middleware/utilites/multipart')
// const multipartMiddleware = multipart({ uploadDir: __dirname+ '/../upload' });
/*****************************************************************************/

// ---------------------------- Authentication Routes--------------------------------
router.post('/register', payloadvalidate,multipartMiddleware, userController.register);
router.post('/login', payloadvalidate, userController.login);
router.post('/logout',JWTAuth, userController.logout);
router.post('/passwordValidity',JWTAuth, userController.passwordValidity);
router.post('/updatePassword',JWTAuth, userController.updatePassword);
router.post('/updateUserProfile',JWTAuth, multipartMiddleware, userController.updateUserProfile);
router.get('/userInfo/:email',JWTAuth, userController.getUserInfo);
// ---------------------------- Item Routes ------------------------------------------
router.post('/item/create',JWTAuth, itemController.create);
router.get('/item/get',JWTAuth, itemController.getAll);
router.get('/item/get/:itemNumber',JWTAuth, itemController.getById);
router.post('/item/update',JWTAuth, itemController.update);



// ---------------------------- Dashboard Routes --------------------------------

// ---------------------------- Static files Routes --------------------------------
router.get('/readFile/:path', fileController.get);




module.exports = router;