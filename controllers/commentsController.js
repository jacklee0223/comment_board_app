var Comment = require('../models/Comment');

module.exports.showComments = function (req, res) {
  Comment.find(function(error, comments) {
    if(error) return res.send(error);
    res.render('comments/index', {comments: comments});
  });
};
