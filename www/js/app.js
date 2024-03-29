// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var tabete = angular.module('tabete', ['ionic', 'ionic.utils', 'ngCordova', 'tabete.services', 'tabete.controllers' ]);

tabete.run(function($ionicPlatform, dataAccessLayer) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
   
    dataAccessLayer.initDatabase();

  });
});

tabete.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.studies', {
      url: "/studies",
      views: {
        'menuContent': {
          templateUrl: "templates/studies.html",
          controller: 'StudiesCtrl'
        }
      }
    })

  .state('app.questiongroup', {
    url: "substudy/:sustuId",
    views: {
      'menuContent': {
        templateUrl: "templates/questiongroup.html",
        controller: 'QuestionGroupCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('app.studies');
});
