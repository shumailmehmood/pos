var express = require('express');
var router = express.Router();
const UsersController = require('../controllers/users');
const CategoryController = require('../controllers/categories');
const SellerController = require('../controllers/sellers');
const CompanyController = require('../controllers/companies');
const ItemController = require('../controllers/items');
//-----------------POST Requests------------------//
router.post('/login', UsersController.login);
router.post('/registerCategory', CategoryController.register);
router.post('/registerSeller', SellerController.reg);
 router.post('/registerCompany', CompanyController.register);
router.post('/registerItem', ItemController.items_register);
//-----------------GET Requests------------------//
router.get('/getAllCategories', CategoryController.get);
router.get('/getSearchCategories', CategoryController.search);
router.get('/getSearchSellers', SellerController.search);
router.get('/getAllSellers', SellerController.get);
router.get('/getSearchCompanies', CompanyController.search);
router.get('/getAllCompanies', CompanyController.get);
router.get('/getSearchItems', ItemController.item_get_active);
//---------------PUT Request ------------------------//
router.put('/updateStock', ItemController.item_update);
module.exports = router;

