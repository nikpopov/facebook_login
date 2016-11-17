angular.module('fbTester').controller('mainCntr', MainCtrl);

function MainCtrl($scope, $http, storage) {

  var filmList = [];
  $scope.search = {};
  $scope.token = storage.getStatus('token');
  $scope.currentPage = 0;
  $scope.pageLimit = 50; 
  
  $http({
    method: 'jsonp',
    url: 'https://24op9kten3.execute-api.us-east-1.amazonaws.com/beta/actors',
    params: {
      'access_token:': $scope.token
    }
  }).then(function(response) {
    console.log(response);
// i'm not sure in response format here
    $scope.actors = response;
//  $scope.actors.firstName = 
//  $scope.actors.lastName =     
  });
  
  $http({
    method: 'jsonp',
    url: 'https://24op9kten3.execute-api.us-east-1.amazonaws.com/beta/languages',
    params: {
      'access_token:': $scope.token
    }
  }).then(function(response) {
    console.log(response);
// i'm not sure in response format here
    $scope.languages = response;
  })

  $http({
    method: 'jsonp',
    url: 'https://24op9kten3.execute-api.us-east-1.amazonaws.com/beta/categories',
    params: {
      'access_token:': $scope.token
    }
  }).then(function(response) {
    console.log(response);
// i'm not sure in response format here
    $scope.categories = response;
  })

  $scope.search = function(form) {
    $http({
      method: 'jsonp',
      url: 'https://24op9kten3.execute-api.us-east-1.amazonaws.com/beta/films',
      params: {
        'title'       : $scope.search.title,
        'description' : $scope.search.description,
        'language'    : $scope.search.language || $scope.actorSelected,
        'category'    : $scope.search.category || $scope.categorySelected,
        'actor_name'  : $scope.search.actor || $scope.actorSelected,
        'access_token': $scope.token
      }
    }).then(function(response) {
      console.log(response);
//response format should be clarified
      filmList = response;
      $scope.films = filmList.slice($scope.pageLimit * $scope.currentPage, ($scope.pageLimit - 1) * ($scope.currentPage + 1));
    })
  }

  $scope.next = function() {
    if ($scope.filmList.length() > ($scope.pageLimit * $scope.currentPage)) {
      $scope.currentPage++;
      $scope.films = filmList.slice($scope.pageLimit * $scope.currentPage, ($scope.pageLimit - 1) * ($scope.currentPage + 1));      
    }
  };

  $scope.prev = function() {
    if ($scope.currentPage > 0) {
      $scope.currentPage++;
      $scope.films = filmList.slice($scope.pageLimit * $scope.currentPage, ($scope.pageLimit - 1) * ($scope.currentPage + 1));      
    }
  };

};

  
