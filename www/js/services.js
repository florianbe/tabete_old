var servicemodule = angular.module('tabete.services', ['ngCordova']);

servicemodule.factory('studyDataFactory', function(){
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

  service.getStudyAcccessDataFromUrl = function(url)  {
    _studyData.studyServer = getPathFromUrl(url);
    _studyData.studyName = getParameterFromUrl(url, 'study');
    _studyData.studyPassword = getParameterFromUrl(url, 'password');

    return _studyData;
  };

  service.retrieveStudyData = function(url, studyName, studyPassword) {
  	return null;
  }

  service.validateStudyData = function(jsonStudyData) {
  	//Study must have at least one Substudy
  	if (!jsonStudyData.substudies) {
  		console.error('validate Study Data: no substudies');
  		return false;  		
  	}

  	for (var i = 0; i < jsonStudyData.substudies.length; i++) {
  		var substudy = jsonStudyData.substudies[i];

  		// if substudy is not event-based --> check for signal times
  		if (!(substudy.trigger === 'EVENT') && !substudy.trigger_signals && substudy.trigger_signals.length < 1){
  			console.error('validate Study Data: trigger based study with no signal times');
  			return false;
  		}
  		// substudy must have at least one question group
  		if (!substudy.questiongroups && substudy.questiongroups.length < 1) {
  			console.error('validate Study Data: Substudy has no Question Groups');
  			return false;
  		}
  		//questiongroup must have at least one question
  		for (var j = 0; j < substudy.questiongroups.length; j++) {
  			if (!substudy.questiongroups[i].questions && substudy.questiongroups[i].questions.length < 1)
  			{
				console.error('validate Study Data: Question Group has no Questions');
  				return false;
  			}
  		}
	}  	
 	return true;
  };

  return service;
});

servicemodule.factory('dataAccessLayer', function ($cordovaSQLite) {
	
	var service = {};

	var devDelete = function() {
		$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS servers");
		$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS studies");
		$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS substudies");
		$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS signalpoints");
		$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS questiongroups");
		$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS questions");
		$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS questionoptions");
		$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS answers");

	};

	service.initDatabase = function() {
		//INITIALIZE Database

		//Prodution
		 //db = $cordovaSQLite.openDB({ name: "tabete.db" });

    	//Local development
    	db = window.openDatabase("tabete.db", "1.0", "Cordova Demo", 200000);

    	//devDelete();

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

        //devDelete();
	};

	service.createNewStudy = function (server_url, studydata){

	};

	service.getSubjectId = function(server_url) {

	};

	return service;
});
