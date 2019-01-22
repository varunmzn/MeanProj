const mongoose = require('mongoose');

var assessmentsSchema = new mongoose.Schema({
    assessmentName: {
        type: String,
        required: 'Assessment name can\'t be empty'
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
assessmentsSchema.pre('update', function (next) {
    this.set('updatedAt', Date.now());
    return next();
  })

mongoose.model('Assessments', assessmentsSchema);