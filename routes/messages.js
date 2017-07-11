 var express = require('express');
 var router = express.Router();
 var jwt = require('jsonwebtoken');

var User = require('../models/user');
 var Message = require('../models/message');

router.get('/', function(req, res, next) {
   Message.find()
      .exec(function(err, messages){
         if(err) {
            return res.status(500).json({
               title: "An error ocured while fetching the DB",
               error: err
            });
         }
         res.status(200).json({
            message: "Success",
            obj: messages
         });
      });
});

// Only sign users can post messages
router.use('/', function(req, res, next) {
   jwt.verify(req.query.token, 'secret', function(err, decoded) {
      if(err) {
         return res.status(401).json({
            title: "Not Authenticated",
            error: err
         });
      }
      next();
   })
});

 router.post('/', function (req, res, next) {
   var decode = jwt.decode(req.query.token);
   User.findById(decode.user._id, function(err, user) {
     if(err) {
       return res.status(500).json({
         title: 'An error occurred',
         error: err
       });
     }
     var message = new Message({
        content: req.body.content,
        user: user
     });
     message.save(function(err, result) {
        if (err) {
           return res.status(500).json({
              title: 'An error occurred',
              error: err
           });
        }
        user.messages.push(result);
        user.save();
        res.status(201).json({
           message: "Saved message",
           obj: result
        });
     });
   });

 });

 router.patch('/:id', function (req, res, next) {
    var decode = jwt.decode(req.query.token);
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Message not found'}
            });
        }
         if(message.user != decode.user._id) {
               return res.status(401).json({
                  title: 'Not Authenticated',
                  error: err
            })
         }
        message.content = req.body.content;
        message.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: { message: 'Users do not match'}
                });
            }
            res.status(200).json({
                message: 'Updated message',
                obj: result
            });
        });
    });
});

 router.delete('/:id', function(req, res, next) {
    var decode = jwt.decode(req.query.token);
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Message not found'}
            });
        }
        if(message.user != decode.user._id) {
             return res.status(401).json({
                title: 'Not Authenticated',
                error: { message: 'Users do not match'}
          })
       }
        message.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted message',
                obj: result
            });
        });
    });
});


 module.exports = router;
