angular.module('tabete.services', ['ngCordova'])

.factory('newStudyFactory', function(){
  var service = {};
  var _studyData = {};

  var getPathFromUrl = function(url) {
    return url.split("?")[0];
  };

  var getParameterFromUrl = function(url, parameter) { 
    var params = url.split('?')[1].split('&');
   
    for (var i = 0; i < params.length; i++) {
      var p=params[i].split('=');
    if (p[0] == parameter) {
      return decodeURIComponent(p[1]);
    }
    }
    return '';
  };

  service.getStudyDataFromUrl = function(url)
  {
    _studyData.studyServer = getPathFromUrl(url);
    _studyData.studyName = getParameterFromUrl(url, 'study');
    _studyData.studyPassword = getParameterFromUrl(url, 'password');

    return _studyData;
  };

  return service;
});




