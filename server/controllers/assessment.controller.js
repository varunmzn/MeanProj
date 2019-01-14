const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');
const Users = mongoose.model('Users');
const Assessments = mongoose.model('Assessments');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}


module.exports.createAssessment = (req, res, next) => {
    var users = new Users();
    // delete req.body._id;
    assessments.assessmentName=req.body.assessmentName;

    if(req.body._id){
        console.log("update")
        Assessments.update({"_id" : req.body._id }, req.body, (err,result)=>{
             console.log("Updated")
        if(!err){
            res.send(result);
        } else {
                return next(err);
        }
      });
    }else{
        console.log("inserted")
       
        assessments.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate assessment name found.']);
            else
                return next(err);
        }
    }); 
    }
  
}
module.exports.getAssessment = (req, res, next) => {
    // let query =   { fullName: { $exists: true, $nin: [ 5, 15 ] } };
    let query =   { fullName: { $exists: false } };
     Users.find(query,(err,result)=>{
    if(!err){
        res.send(result);
    } else {
            return next(err);
    }
  });
}

module.exports.getAssessmentById = (req, res, next) => {
    let query = req.body.id ; 
     Users.findById(query,(err,result)=>{
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
    Users.update({"_id" : query}, { firstName: 'jason bourne' }, (err,result)=>{
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
    Users.update({"firstName" : query}, { firstName: 'Varun' },{'multi':true}, (err,result)=>{
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
    Users.deleteOne({"_id" : query}, (err,result)=>{
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
    Users.deleteMany({"firstName" : query}, (err,result)=>{
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
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
        }
    );
}