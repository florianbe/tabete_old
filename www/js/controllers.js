angular.module('tabete.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicSideMenuDelegate, $localstorage) {
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

.controller('StudiesCtrl', function($scope, $ionicModal) {
  $scope.studies = [
    { title: 'Zeitverwendung im Studienalltag', id: 1 },
    { title: 'Langeweile im Praktikum', id: 2 }
  ];

  $ionicModal.fromTemplateUrl('templates/addstudy.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalNewStudy = modal;
  });

  $scope.showNewStudy = function() {
    $scope.modalNewStudy.show();
  };

  $scope.closeNewStudy = function() {
    $scope.modalNewStudy.hide();
  };

  $scope.scanNewStudy = function() {

  }

})

.controller('QuestionGroupCtrl', function($scope, $stateParams) {
});
