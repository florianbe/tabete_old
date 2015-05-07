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
})

.factory('dataAccessLayer', function ($cordovaSQLite) {
	var service = {};

	service.initDatabase = function() {
        //SERVERS
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS servers (id integer primary key, url text, subject_id text)");
        //STUDIES
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS studies (id integer primary key, version integer, server_id integer, remote_id integer, name text, short_name text, description text, state text, start_date text, end_date text, finalupload_date text)");
        //SUBSTUDIES
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS substudies (id integer primary key, version integer, study_id integer, title text, triggertype text, description text)");
        //SIGNAL POINTS
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS signalpoints (id integer primary key, substudy_id integer, signal_date text)");
        //QUESTION GROUPS
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS questiongroups (id integer primary key, version integer, substudy_id integer, name text, sequence_id integer, randomorder integer)");
        //QUESTIONS
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS questions (id integer primary key, version integer, questiongroup_id integer, sequence_id integer, type text, mandatory integer, text text, min text, max text, step text)");
        //QUESTIONS OPTIONS
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS questionoptions (id integer primary key, question_id integer, code text, description text, value text)");
        //ANSWERS
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS answers (id integer primary key, question_id integer, answer text, testanswer integer, answer_date text, signal_date text)");
	}

	return service;
});




