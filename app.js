var app = angular.module('fbTester', ['ngRoute']);

app.config(function($routeProvider, $httpProvider) {

//    $facebookProvider.setAppId('304719319921543');
//    $facebookProvider.setAppId('685429268272398');
    
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.withCredentials = true;
  delete $httpProvider.defaults.headers.common["X-Requested-With"];
//  $httpProvider.defaults.headers.common["Accept"] = "application/json";
//  $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
  $httpProvider.defaults.headers.common["Content-Type"] = "application/javascript";
  
  $routeProvider
    .when('/main', {
            templateUrl: 'main.html',
            controller: 'mainCntr'
    })
    .otherwise({
            redirectTo: '/'
    });
  })

//app.run(['$rootScope', '$window', function($rootScope, $window) {
//    (function(d, s, id) {
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) return;
//      js = d.createElement(s); js.id = id;
//      js.src = "//connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));
//
//    $rootScope.$on('fb.load', function() {
//      $window.dispatchEvent(new Event('fb.load'));
//    });
//}]);


app.service('storage', function() {
    var userStatus = {
        userID: '',
        appID: '304719319921543',
        userFirstName: '',
        userLastName: '',
        userName: '',
        isLoggedIn: true,
        token: ''
    };
    this.getDefault = function() {
        return userStatus
    };
    this.getStatus = function(name) {
        return userStatus[name]
    };
    this.setStatus = function(name, value) {
        userStatus[name] = value
    }
});

