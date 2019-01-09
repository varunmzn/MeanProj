const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

router.post('/createUser', ctrlUser.createUser);
router.get('/getUser', ctrlUser.getUser);
router.post('/getUserById', ctrlUser.getUserById);
router.post('/updateUser', ctrlUser.updateUser);
router.post('/updateMoreUser', ctrlUser.updateMoreUser);
router.delete('/deleteUser/:id', ctrlUser.deleteUser);
router.post('/deleteMoreUser', ctrlUser.deleteMoreUser);

module.exports = router;




