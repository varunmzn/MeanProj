const express = require('express');
const router = express.Router();
const path  =  require("path");

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        let dest = 'uploads';
        callback(null, dest);
    },
    filename: function (req, file, callback) {
        var fileUniquename = Date.now();
        callback(null, fileUniquename + path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage });

const ctrlUser = require('../controllers/user.controller');
const ctrlAssess = require('../controllers/assessment.controller');
const ctrlSubject = require('../controllers/subject.controller');
const ctrlQue = require('../controllers/question.controller');
const ctrlfileUpload = require('../controllers/fileupload.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

router.post('/createUser', ctrlUser.createUser);
router.get('/getUser', ctrlUser.getUser);
router.post('/getUserById', ctrlUser.getUserById);
router.post('/updateUser', ctrlUser.updateUser);
router.post('/updateMoreUser', ctrlUser.updateMoreUser);
router.delete('/deleteUser/:id', ctrlUser.deleteUser);
router.post('/deleteMoreUser', ctrlUser.deleteMoreUser);



router.post('/createAssessment', ctrlAssess.createAssessment);
router.get('/getAssessment', ctrlAssess.getAssessment);
router.post('/getAssessmentById', ctrlAssess.getAssessmentById);

router.post('/createSubject', ctrlSubject.createSubject);
router.get('/getSubject', ctrlSubject.getSubject);
router.post('/getSubjectById', ctrlSubject.getSubjectById);

router.post('/createQuestion', ctrlQue.createQuestion);
router.get('/getQuestion', ctrlQue.getQuestion);
router.post('/getQuestionById', ctrlQue.getQuestionById);

// router.post('/uploadFiles', upload.any(), function (req, res) {
//     console.log(req.body)
//     console.log(req.files)

// },ctrlfileUpload.uploadFiles);

router.post('/uploadFiles', upload.any(),ctrlfileUpload.uploadFiles);



module.exports = router;




