var mongoose = require('mongoose');

var Comment = new mongoose.Schema({
  content: String,
  created_at: Date,
  updated_at: Date,

  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }
});



module.exports = mongoose.model('Comment', Comment);
