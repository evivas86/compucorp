app.factory('myCoordinates', ['$q', function myCoordinates($q) {

	var deferred = $q.defer();

	if (window.navigator && window.navigator.geolocation) {
		window.navigator.geolocation.getCurrentPosition(getCoordinates,locationDenied);
	} else {
		deferred.reject({msg: "Browser does not supports HTML5 geolocation"});
	}

	function getCoordinates(coordinates){
		var myCoordinates = {};
		myCoordinates.lat = coordinates.coords.latitude;
		myCoordinates.lng = coordinates.coords.longitude;
		myCoordinates.msg = 'Here You Are!';
		myCoordinates.ngh = 'ng-hide';
		deferred.resolve(myCoordinates);
	}

	function locationDenied(error) {
    if (error.code == error.PERMISSION_DENIED) {
				myCoordinates.lat = 51.505;
				myCoordinates.lng = -0.09;
				myCoordinates.msg = 'So, you denied to share Huh? Here is the Default ubication';
				myCoordinates.ngh = '';
				deferred.resolve(myCoordinates);
    }
}

	return deferred.promise;

}])
