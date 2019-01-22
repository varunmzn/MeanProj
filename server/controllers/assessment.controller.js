const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Assessments = mongoose.model('Assessments');


module.exports.createAssessment = (req, res, next) => {
    var assessments = new Assessments();
    // delete req.body._id;
    assessments.assessmentName=req.body.assessmentname;

    if(req.body._id){
        Assessments.update({"_id" : req.body._id }, req.body, (err,result)=>{
             console.log("Updated")
        if(!err){
            res.send(result);
        } else {
                return next(err);
        }
      });
    }else{
       
        assessments.save((err, doc) => {
        if (!err){
        console.log(req.body)
            res.send(doc);
        }
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate assessment name found.']);
            else
            console.log(err)
                return next(err);
        }
    }); 
    }
  
}
module.exports.getAssessment = (req, res, next) => {
    // let query =   { fullName: { $exists: true, $nin: [ 5, 15 ] } };
    let query =   { fullName: { $exists: false } };
     Assessments.find(query,(err,result)=>{
    if(!err){
        res.send(result);
    } else {
            return next(err);
    }
  });
}

module.exports.getAssessmentById = (req, res, next) => {
    let query = req.body.id ; 
     Assessments.findById(query,(err,result)=>{
         console.log(result)
    if(!err){
        res.send(result);
    } else {
            return next(err);
    }
  });
}

module.exports.updateAssessment = (req, res, next) => {
    let query = req.body.id   ;
    Assessments.update({"_id" : query}, { firstName: 'jason bourne' }, (err,result)=>{
         console.log(result)
    if(!err){
        res.send(result);
    } else {
            return next(err);
    }
  });
}

module.exports.updateMoreAssessment = (req, res, next) => {
    let query = req.body.firstName  ;
    Assessments.update({"firstName" : query}, { firstName: 'Varun' },{'multi':true}, (err,result)=>{
         console.log(result)
    if(!err){
        res.send(result);
    } else {
            return next(err);
    }
  });
}

module.exports.deleteAssessment = (req, res, next) => {
    let query = req.params.id   ;
    Assessments.deleteOne({"_id" : query}, (err,result)=>{
         console.log(result)
    if(!err){
        res.send(result);
    } else {
            return next(err);
    }
  });
}

module.exports.deleteMoreAssessment = (req, res, next) => {
    let query = req.body.firstName ;
    Assessments.deleteMany({"firstName" : query}, (err,result)=>{
         console.log(result)
    if(!err){
        res.send(result);
    } else {
            return next(err);
    }
  });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, assessment, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered assessment
        else if (assessment) return res.status(200).json({ "token": assessment.generateJwt() });
        // unknown assessment or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.assessmentProfile = (req, res, next) =>{
    Assessment.findOne({ _id: req._id },
        (err, assessment) => {
            if (!assessment)
                return res.status(404).json({ status: false, message: 'Assessment record not found.' });
            else
                return res.status(200).json({ status: true, assessment : _.pick(assessment,['fullName','email']) });
        }
    );
}