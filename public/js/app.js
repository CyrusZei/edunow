var app = angular.module('app',['ngRoute']);

app.config(function($routeProvider/*, $locationProvider*/){
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
  when('/search',{
    templateUrl: '../templates/search.html',
    controller: 'searchController'

  }).
  otherwise({redirectTo:'/'});
  //$locationProvider.html5mode(true);
});

app.controller('directoryController',['$scope','$http', function($scope,$http){
  $http.get('/api/').success(function(data){
    $scope.questions = data;



  });
}]);

app.controller('searchController',['$scope','$http','$window','$location', function($scope,$http,$window,$location){
   var searchObject = $location.search();
   console.log(searchObject.foo);
   var listArray = [];
   $http.get('/api/').success(function(data){

     for(var i = 0;i < data.length; i++) {
       //console.log(data[i].question_headline);
       if(data[i].question_headline.toLowerCase().indexOf(searchObject.foo.toLowerCase()) > -1){
         listArray.push(data[i]);
         console.log("true");
         console.log(data[i].question_headline);
       } else {
         console.log("false");
       }
     }
     console.log("list arr");
     console.log(listArray);

     $scope.questions = listArray;

   });



   //$scope.list = searchObject;


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
    alert("Dina fråga har skapats!");
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

//mark comment as correct answer
$scope.correct = function(index){
  $scope.question.comments[index].correct_answer = true;
  $http({
    method: 'PUT',
    url: '/api/' + questionId,
    data: {
      comments: $scope.question.comments
    }
  });
};


// up vote a comment
$scope.upVoteComment = function(index){
  console.log(index);
  $scope.question.comments[index].vote += 1;
  console.log($scope.question.comments);
  //console.log($scope.question);
  $http({
    method: 'PUT',
    url: '/api/' + questionId,
    data: {
      comments: $scope.question.comments
    }
  });
};

// add new comment
$scope.addNewComment = function(){
  commentArray ={
    name: $scope.comment_name,
    vote: 0,
    msg:$scope.comment_msg,
    correct_answer: false
  };

  $scope.question.comments.push(commentArray);
  console.log($scope.question.comments);

  $http({
    method: 'PUT',
    url: '/api/' + questionId,
    data: {
      comments: $scope.question.comments
    }
  }).then(function(response){
    $scope.comment_name = "";
    $scope.comment_msg = "";

  });




};



// --------------
  $http.get('/api/' + questionId).success(function(data){
    $scope.question = data;
  }).then(function(res){
    //console.log($scope.question);
    //$scope.question.comments.push(commentArray);
    //console.log($scope.question);
    //console.log(questionId);
    console.log($scope.question.comments[0].vote);
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
