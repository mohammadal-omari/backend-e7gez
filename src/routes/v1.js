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
router.post('/register', payloadvalidate,JWTAuth, userController.register);
router.post('/auth', payloadvalidate, userController.login);
router.get('/auth/renew', JWTAuth, userController.renewToken);
router.post('/logout',JWTAuth, userController.logout);
router.post('/passwordValidity',JWTAuth, userController.passwordValidity);
router.post('/updatePassword',JWTAuth, userController.updatePassword);
router.post('/updateUserProfile',JWTAuth, multipartMiddleware, userController.updateUserProfile);
router.get('/userInfo/:email',JWTAuth, userController.getUserInfo);
// ---------------------------- Item Routes ------------------------------------------
router.post('/item/create',JWTAuth, itemController.create);
router.get('/item/get',JWTAuth,  itemController.getAll);
router.get('/item/get/:itemNumber',JWTAuth,  itemController.getById);
router.post('/item/update',JWTAuth,  itemController.update);
router.get('/item/getByAdminId/:adminId', itemController.getByAdminId);//JWTAuth, 
// --------------------------------User------------------------------------------------
router.get('/user/get',JWTAuth,  userController.getAll);
router.get('/user/get/:userNumber',JWTAuth,  userController.getById);
router.post('/user/update',JWTAuth,  userController.updateUserProfile);
// ---------------------------- Admin Routes --------------------------------
router.post('/category/create',JWTAuth,  adminController.createCatogery);
router.get('/category/get',JWTAuth,  adminController.getAll);
router.post('/category/update',JWTAuth,  adminController.updateCatogery);
router.get('/category/get/:categoryNumber',JWTAuth,  adminController.getById);

// ---------------------------- Dashboard Routes --------------------------------
router.get('/dashborad/get',JWTAuth,  dashboardController.getAll);
router.get('/dashborad/Feeds/get',JWTAuth,  dashboardController.getAllFeeds);
router.post('/dashborad/Feeds/create',  dashboardController.createFeed);
router.put('/dashborad/Feeds/open/:id',JWTAuth,  dashboardController.openFeeds);


// ---------------------------- Static files Routes --------------------------------
router.get('/readFile/:path', fileController.get);
router.post('/thumbnail-upload/', multipartMiddleware, fileController.create);





module.exports = router;