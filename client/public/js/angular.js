var stream = angular.module('myApp', ['ui.bootstrap','angularMoment', 'ipCookie']);

stream.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
});

stream.controller('TweetCtrl', ['$scope', 'socket', function($scope, socket){
    $scope.status = "No tweets yet...";
    $scope.tweets = [];
    var i = 0;
    socket.on('newTweet', function (tweet) {
      $scope.status = "";
      $scope.tweets.push(tweet);
    });
  }
]);

stream.controller('CommitCtrl', ['$scope', 'socket', 'ipCookie', function($scope, socket, ipCookie){
  
    $scope.status = "No commits yet...";
    $scope.commits = ipCookie('commits') || [];
    var i = 0;
    // new commit arrives from server
    socket.on('newCommit', function (commit) {
      if (commit.message){
        return;
      } else{
        console.log(commit)
        console.log("hi!");
        $scope.status = "";
        $scope.commits = commit;
        ipCookie('commits',commit)
        console.log('commits',$scope.commits)
      }
      
    });
  }
]);

stream.filter('fromNow', function () {
    return function (input) {
      return moment(input).fromNow();
    };
  });
