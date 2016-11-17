angular.module('fbTester').controller('demoCtrl', DemoCtrl);

function DemoCtrl($scope, $location, $http, storage) {
  
  $scope.status = storage.getDefault();

//  $scope.client_id = '304719319921543';
//  $scope.client_id = '685429268272398'
//  $scope.url = 'http://nik.papatut.net';

//  $scope.$on('fb.auth.authResponseChange', function() {

//    $scope.status = $facebook.isConnected();
//    if($scope.status) {
//      $facebook.api('/me').then(function(user) {
//        console.log(user);
//        $scope.user = user;
//      });
//      $facebook.getAuthResponse().then(function(response) {
//        console.log(response);
//      })
//    }
//  });

//  $scope.loginToggle = function() {
//    if($scope.status) {
//      $facebook.logout();
//    } else {
//      $facebook.login();
//    }
//  };

  $scope.home = function() {
    $location.path('/');
  };

  $scope.check = function() {
    $location.path('/main');
  };

  $scope.fbLogin = function() {

    $scope.url = $location.absUrl();
    $scope.appID = storage.getStatus('appID');

    $http({
      method: 'jsonp',
      url: 'https://www.facebook.com/v2.8/dialog/oauth',
      params: {
        'client_id': $scope.appID,
        'redirect_uri': $scope.url,
        'scope': 'public_profile'
      }
    }).then(function(response) {
      console.log(response);
      $http({
        method: 'jsonp',
        url: 'https://24op9kten3.execute-api.us-east-1.amazonaws.com/beta/oauth',
        params: {
          redirect_uri: $scope.url,
          code: response.code
        }
      }).then(function(response) {
        console.log(response);
        storage.setStatus('token', responce);
      })
    })
  };

};
