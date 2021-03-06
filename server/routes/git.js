var express = require('express'),
    router = express.Router(),
    request = require("request");

// angular, streams
router.get('/commits', ensureAuthenticated, function(req, res, next) {
  res.render('commits');
});

// *** old - rest endpoint, react *** //

// router.get('/', ensureAuthenticated, function(req, res){

//   var owner = 'RefactorU';
//   var repo = 'hackathon-live-feed';
//   var url = 'https://api.github.com/repos/'+owner+'/'+repo+'/commits';
//   var authToken = req.user.github.token;

//   var options = {
//     method: 'get',
//     json: true,
//     url: url,
//     headers : {
//       'User-Agent': 'test',
//       'Authorization': 'token '+authToken
//     }
//   };

//   request(options, url, function(err, resp, body) {
//     if (err) {
//       res.status(500).send('Something broke!');
//     }
//     res.status(200).send({response:body});
//   });

// });

// todo - add helper for API call !!!!

// router.get('/commits', ensureAuthenticated, function(req, res){

//   var owner = 'RefactorU';
//   var repo = 'hackathon-live-feed';
//   var url = 'https://api.github.com/repos/'+owner+'/'+repo+'/commits';
//   var authToken = req.user.github.token;

//   var options = {
//     method: 'get',
//     json: true,
//     url: url,
//     headers : {
//       'User-Agent': 'test',
//       'Authorization': 'token '+authToken
//     }
//   };

//   request(options, url, function(err, resp, body) {
//     if (err) {
//       res.status(500).send('Something broke!');
//     }

//     var responseArr = [];
//     var responseObj = {};

//     for (var i = 0; i < body.length; i++) {
//       responseObj = {};
//       responseObj.name = body[i].commit.author.name;
//       responseObj.date = body[i].commit.author.date;
//       responseObj.message = body[i].commit.message;
//       responseObj.sha = body[i].sha;
//       responseObj.url = body[i].html_url;
//       responseObj.avatar = body[i].author.avatar_url;
//       responseArr.push(responseObj);
//     }
//     res.render('commits', {response:responseArr});
//   });

// });

// router.get('/fetchcommits', ensureAuthenticated, function(req, res){

//   var owner = 'RefactorU';
//   var repo = 'hackathon-live-feed';
//   var url = 'https://api.github.com/repos/'+owner+'/'+repo+'/commits';
//   var authToken = req.user.token;

//   var options = {
//     method: 'get',
//     json: true,
//     url: url,
//     headers : {
//       'User-Agent': 'test',
//       'Authorization': 'token '+authToken
//     }
//   };

//   request(options, url, function(err, resp, body) {
//     if (err) {
//       res.status(500).send('Something broke!');
//     }

//     var responseArr = [];
//     var responseObj = {};

//     for (var i = 0; i < body.length; i++) {
//       responseObj = {};
//       responseObj.name = body[i].commit.author.name;
//       responseObj.date = body[i].commit.author.date;
//       responseObj.message = body[i].commit.message;
//       responseObj.sha = body[i].sha;
//       responseObj.url = body[i].html_url;
//       responseObj.avatar = body[i].author.avatar_url;
//       responseArr.push(responseObj);
//     }
//     res.send({response:responseArr, data: req.body});
//   });

// });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}


module.exports = router;