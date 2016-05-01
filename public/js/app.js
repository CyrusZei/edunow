var app = angular.module('app',['ngRoute']);

app.config(function($routeProvider){
  $routeProvider.
  when('/',{
    templateUrl : '../templates/directory.html',
  }).
  when('/question/:id',{
    templateUrl: '../templates/view.html',
    controller: 'viewController'
  }).
  when('/new/',{
    templateUrl: '../templates/new.html',
    controller: 'newController'

  }).
  otherwise({redirectTo:'/'});

});

app.controller('directoryController',['$scope','$http', function($scope,$http){
  $http.get('/api/').success(function(data){
    $scope.questions = data;



  });
}]);

app.controller('newController',['$scope','$http','$window', function($scope,$http,$window){

  $scope.questios = [];


$scope.addNewQuestion = function() {

  $http({
    method: 'POST',
    url: '/api',
    data: {
      question_headline: $scope.question_headline,
      author_user: $scope.author_user,
      question_msg: $scope.question_msg,
      tags: $scope.tags
    }
  }).then(function(response) {
    alert("data has been saved");
    $window.open('/', '_self');
    $scope.questions.push(response.data);
    console.log("scope");
    console.log($scope.questionss);
    console.log("respons data");
    console.log(response.data);
    console.log();
    document.getElementById("questionForm").reset();
  });
};


}]);

app.controller('viewController', ['$scope', '$routeParams','$http', '$location','$window',   function($scope, $routeParams, $http,$location,$window){
var questionId = $routeParams.id;



// --------------
$scope.addNewComment = function(){
  commentArray ={
    name: $scope.comment_name,
    vote: 0,
    msg:$scope.comment_msg
  };

  $scope.question.comments.push(commentArray);
  console.log($scope.question.comments);

  $http({
    method: 'PUT',
    url: '/api/' + questionId,
    data: {
      comments: $scope.question.comments
    }
  });



/*
  $http.put('/api/' + questionId, {id:questionId, comments: commentArray}).success(function(data){
    $scope.question = data;
    $scope.question.comments.push(commentArray);
  }).then(function(res){
    console.log($scope.question);

    //console.log(res);
  });
*/

};



// --------------
  $http.get('/api/' + questionId).success(function(data){
    $scope.question = data;
  }).then(function(res){
    //console.log($scope.question);
    //$scope.question.comments.push(commentArray);
    //console.log($scope.question);
    //console.log(questionId);

  });


  $scope.delete = function(){
      $http({
        method: 'DELETE',
        url: '/api/' + questionId
      }).then(function(){
         //$location.path('/');
         $window.open('/', '_self');

      });
  };

}]);
