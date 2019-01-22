const mongoose = require('mongoose');

var subjectsSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: 'Subject name can\'t be empty'
    },
  
    createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      },
});


// save update time before update
subjectsSchema.pre('update', function (next) {
    this.set('updatedAt', Date.now());
    return next();
  })

mongoose.model('Subjects', subjectsSchema);