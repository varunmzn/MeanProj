const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Subjects = mongoose.model('Subjects');

module.exports.register = (req, res, next) => {
    var user = new Subject();
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


module.exports.createSubject = (req, res, next) => {
    var subjects = new Subjects();
    // delete req.body._id;
    subjects.subjectName=req.body.subjectname;

    if(req.body._id){
        subjects.update({"_id" : req.body._id }, req.body, (err,result)=>{
             console.log("Updated")
        if(!err){
            res.send(result);
        } else {
                return next(err);
        }
      });
    }else{
       
        subjects.save((err, doc) => {
        if (!err){
        console.log(req.body)
            res.send(doc);
        }
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate subject name found.']);
            else
            console.log(err)
                return next(err);
        }
    }); 
    }
  
}
module.exports.getSubject = (req, res, next) => {
    // let query =   { fullName: { $exists: true, $nin: [ 5, 15 ] } };
    let query =   { fullName: { $exists: false } };
     Subjects.find(query,(err,result)=>{
    if(!err){
        res.send(result);
    } else {
            return next(err);
    }
  });
}

module.exports.getSubjectById = (req, res, next) => {
    let query = req.body.id ; 
     Subjects.findById(query,(err,result)=>{
         console.log(result)
    if(!err){
        res.send(result);
    } else {
            return next(err);
    }
  });
}

module.exports.updateSubject = (req, res, next) => {
    let query = req.body.id   ;
    Subjects.update({"_id" : query}, { firstName: 'jason bourne' }, (err,result)=>{
         console.log(result)
    if(!err){
        res.send(result);
    } else {
            return next(err);
    }
  });
}

module.exports.updateMoreSubject = (req, res, next) => {
    let query = req.body.firstName  ;
    Subjects.update({"firstName" : query}, { firstName: 'Varun' },{'multi':true}, (err,result)=>{
         console.log(result)
    if(!err){
        res.send(result);
    } else {
            return next(err);
    }
  });
}

module.exports.deleteSubject = (req, res, next) => {
    let query = req.params.id   ;
    Subjects.deleteOne({"_id" : query}, (err,result)=>{
         console.log(result)
    if(!err){
        res.send(result);
    } else {
            return next(err);
    }
  });
}

module.exports.deleteMoreSubject = (req, res, next) => {
    let query = req.body.firstName ;
    Subjects.deleteMany({"firstName" : query}, (err,result)=>{
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
    Subject.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'Subject record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
        }
    );
}