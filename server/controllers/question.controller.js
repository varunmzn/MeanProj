const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const image =  require ('../common/fileupload')
const Questions = mongoose.model('Questions');



module.exports.createQuestion = (req, res, next) => {
    var questions = new Questions(req.body);
    // delete req.body._id;
    // questions.questionName=req.body.questionname;
   console.log("req.body")
   console.log(req.body)
    if(req.body._id){
        Questions.update({"_id" : req.body._id }, req.body, (err,result)=>{
             console.log("Updated")
        if(!err){
            res.send(result);
        } else {
                return next(err);
        }
      });
    }else{
        console.log("heloo")
        console.log(req.body)
        questions.save((err, doc) => {
        if (!err){
            res.send(doc);
        }
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate question name found.']);
            else
            console.log(err)
                return next(err);
        }
    }); 
    }
  
}
module.exports.getQuestion = (req, res, next) => {
    // let query =   { fullName: { $exists: true, $nin: [ 5, 15 ] } };
    let query =   { fullName: { $exists: false } };
     Questions.find(query,(err,result)=>{
    if(!err){
        res.send(result);
    } else {
            return next(err);
    }
  });
}

module.exports.getQuestionById = (req, res, next) => {
    let query = req.body.id ; 
     Questions.findById(query,(err,result)=>{
         console.log(result)
    if(!err){
        res.send(result);
    } else {
            return next(err);
    }
  });
}

module.exports.updateQuestion = (req, res, next) => {
    let query = req.body.id   ;
    Questions.update({"_id" : query}, { firstName: 'jason bourne' }, (err,result)=>{
         console.log(result)
    if(!err){
        res.send(result);
    } else {
            return next(err);
    }
  });
}

module.exports.updateMoreQuestion = (req, res, next) => {
    let query = req.body.firstName  ;
    Questions.update({"firstName" : query}, { firstName: 'Varun' },{'multi':true}, (err,result)=>{
         console.log(result)
    if(!err){
        res.send(result);
    } else {
            return next(err);
    }
  });
}

module.exports.deleteQuestion = (req, res, next) => {
    let query = req.params.id   ;
    Questions.deleteOne({"_id" : query}, (err,result)=>{
         console.log(result)
    if(!err){
        res.send(result);
    } else {
            return next(err);
    }
  });
}

module.exports.deleteMoreQuestion = (req, res, next) => {
    let query = req.body.firstName ;
    Questions.deleteMany({"firstName" : query}, (err,result)=>{
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
    Question.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'Question record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
        }
    );
}