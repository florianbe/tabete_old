var controllers = angular.module('tabete.controllers', ['ngCordova', 'tabete.services']);

controllers.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicSideMenuDelegate, $localstorage) {
  // Create the password modal that we will use later
  $ionicModal.fromTemplateUrl('templates/password.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalPassword = modal;
  });

  $scope.input = {};

  //Initialize settings - get from localstorage, create new if none exist.
  $scope.settings = $localstorage.getObject('settings');

  if (!$scope.settings.hasOwnProperty('passwordset'))
  {
    $scope.settings = {
    testmode:     false, 
    passwordset:  false,
    password:     ""
    };

    $localstorage.setObject('settings', $scope.settings);
  }

  //Slow slider down and set localstorage settings 
  $scope.toggleTestMode = function() {
        $timeout(function() {$ionicSideMenuDelegate.toggleLeft();}, 100);
        $localstorage.setObject('settings', $scope.settings);
  };

  // Triggered in the password modal to close it
  $scope.closePassword = function() {
    $scope.passworderror = "";
    $scope.modalPassword.hide();
  };

  // Open the password modal
  $scope.password = function() {
    $scope.modalPassword.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doPassword = function() {
    
    if($scope.settings.passwordset){
      if($scope.settings.password === $scope.input.password){
        $scope.settings.password = "";
        $scope.input.password = "";
        $scope.settings.passwordset = false;
        $scope.closePassword();
      }
      else {
        $scope.passworderror = "Falsches Passwort";
      }
    }
    else {
      $scope.settings.password = $scope.input.password;
      $scope.settings.passwordset = true;
      $localstorage.setObject('settings', $scope.settings);
      $scope.input.password = "";
      $scope.closePassword();
    }
  };
})


.controller('StudiesCtrl', function($scope, $ionicModal, $cordovaBarcodeScanner, $http, newStudyFactory) {
  $scope.studies = [
    { title: 'Zeitverwendung im Studienalltag', id: 1 },
    { title: 'Langeweile im Praktikum', id: 2 }
  ];

  $scope.newStudyInput = {};

  $ionicModal.fromTemplateUrl('templates/addstudy.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalNewStudy = modal;
  });

  var testHttpFunction = function() {
    var url = "http://anthill-inside.net/tabea_test/api/v1/study/1?password=zeitver2015";
    // var url = "http://tabea.dev:8080/api/v1/study/1?password=geheim";
    // var url = "http://tabea.dev:8080/api/v1/study/getid?study=te_stu&password=geheim";
    $http.get(url).then(function(data) {
      console.log(data.data.study.title);
      $scope.studystuff =  data.data.study.title;
  })
  };
  
  $scope.showNewStudy = function() {
    //$scope.modalNewStudy.show();
    testHttpFunction();
    
  };

  $scope.closeNewStudy = function() {
    
    $scope.newStudyInput = {};
    $scope.modalNewStudy.hide();
  };

  

  $scope.scanNewStudy = function() {
      
      // var url = 'http://www.anthill-inside.net/tabea_test?study=te_stu&password=te_stu';

      $cordovaBarcodeScanner.scan().then(function(imageData) {
            var url = imageData.text;
            $scope.newStudyInput = newStudyFactory.getStudyDataFromUrl(url);

        }, function(error) {
            alert('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es noch einmal.');
        });
    };
})

.controller('QuestionGroupCtrl', function($scope, $stateParams) {
});
