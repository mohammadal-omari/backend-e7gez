const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');

//-------------------------------------------------------------------------
const JWTAuth = require('../middleware/auth/JWT.auth');
//-------------------------------------------------------------------------
const userController = require('../controllers/user/user.controller');
const itemController = require('../controllers/item/item.controller');
const adminController = require('../controllers/admin/admin');
const dashboardController =  require('../controllers/dashboard/dashboard.controller');
const fileController = require('../controllers/static files/read.files.controller');
//-------------------------------------------------------------------------
const payloadvalidate = require('../middleware/utilites/payloadValidate')
const multipartMiddleware = require('../middleware/utilites/multipart')
// const multipartMiddleware = multipart({ uploadDir: __dirname+ '/../upload' });
/*****************************************************************************/

// ---------------------------- Authentication Routes--------------------------------
router.post('/register', payloadvalidate, userController.register);
router.post('/login', payloadvalidate, userController.login);
router.post('/logout',JWTAuth, userController.logout);
router.post('/passwordValidity',JWTAuth, userController.passwordValidity);
router.post('/updatePassword',JWTAuth, userController.updatePassword);
router.post('/updateUserProfile',JWTAuth, multipartMiddleware, userController.updateUserProfile);
router.get('/userInfo/:email',JWTAuth, userController.getUserInfo);
// ---------------------------- Item Routes ------------------------------------------
router.post('/item/create', itemController.create);
router.get('/item/get', itemController.getAll);
router.get('/item/get/:itemNumber', itemController.getById);
router.post('/item/update', itemController.update);
// --------------------------------User------------------------------------------------
router.get('/user/get', userController.getAll);
router.get('/user/get/:userNumber', userController.getById);
router.post('/user/update', userController.updateUserProfile);
// ---------------------------- Admin Routes --------------------------------
router.post('/category/create', adminController.createCatogery);
router.get('/category/get', adminController.getAll);
router.post('/category/update', adminController.updateCatogery);
router.get('/category/get/:categoryNumber', adminController.getById);

// ---------------------------- Dashboard Routes --------------------------------
router.get('/dashborad/get', dashboardController.getAll);
router.get('/dashborad/Feeds/get', dashboardController.getAllFeeds);
router.post('/dashborad/Feeds/create', dashboardController.createFeed);
router.put('/dashborad/Feeds/open/:id', dashboardController.openFeeds);


// ---------------------------- Static files Routes --------------------------------
router.get('/readFile/:path', fileController.get);
router.post('/thumbnail-upload/', multipartMiddleware, fileController.create);





module.exports = router;