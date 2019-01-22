const mongoose = require('mongoose');

var questionsSchema = new mongoose.Schema({
    questionName: {
        type: String,
        required: 'Question name can\'t be empty'
    },
   subjectId: {
      type: String,
      required: 'Subject ID can\'t be empty'
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
// questionsSchema.pre('update', function (next) {
//     this.set('updatedAt', Date.now());
//     return next();
//   })

mongoose.model('Questions', questionsSchema);