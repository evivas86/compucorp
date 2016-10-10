app.controller('MainController', ['$scope', '$http', 'coordinates', 'myCoordinates', '$log', function($scope, $http, coordinates, myCoordinates, $log) {

	  $scope.mapCenter = {
	    lat: coordinates.lat,
			lng: coordinates.lng,
	    zoom: 14
	  };

		$scope.nghide = coordinates.ngh;

	  getOpenWeathermapData ('',coordinates.lat,coordinates.lng,coordinates.msg);

	  function getSightsPoints(lat,lng,msg) {

	    $http.jsonp('https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gsradius=10000&gscoord=' + lat + '%7C' + lng + '&gslimit=30&format=json&callback=JSON_CALLBACK')
	      .success(function(data, status, headers, config) {
	        $scope.geodata = data;
	        var currentPositionPoint = {
	          lat: lat,
	          lng: lng,
	          focus: true,
	          message: msg,
	          icon: {
	            type: 'awesomeMarker',
	            icon: 'user',
	            markerColor: 'blue',
	            iconColor: 'white'
	          }
	        }
	        $scope.mapMarkers = geodataToMarkers($scope.geodata);
	        $scope.mapMarkers.push(currentPositionPoint);
	      });
	    }

	    function getOpenWeathermapData(city,latitude,longitude,msg) {
	      var openweatherurl = 'http://api.openweathermap.org/data/2.5/weather';
	      $http.jsonp(openweatherurl, { params : {
	          APPID:'1e7bcc5394ee7538d0a9b743e5ca737f',
	    		  q : city,
	          lat : latitude,
	          lon : longitude,
	          callback: 'JSON_CALLBACK'
	        }}).
	        success(function(data, status, headers, config) {
	          // Set weather values to the view
	      		$scope.datalon = data.coord.lon;
	      		$scope.datalat = data.coord.lat;
	      		$scope.weather = data.weather[0].description;
	          $scope.wicon = data.weather[0].icon;
	      		$scope.maxtemp = data.main.temp_max;
	      		$scope.mintemp = data.main.temp_min;
	      		$scope.windspeed = data.wind.speed;
	      		$scope.clouds = data.clouds.all;
	      		$scope.wcountry = data.sys.country;
	          $scope.mapCenter = {
	            lat: data.coord.lat,
	            lng: data.coord.lon,
	            zoom: 14
	          };

	          getSightsPoints ($scope.datalat,$scope.datalon,msg);

	          $log.log('Data retrieved from ' + openweatherurl);
	        }).
	        error(function(data, status, headers, config) {
	          // Log an error in the browser's console.
	          $log.error('Could not retrieve data from ' + openweatherurl);
	        });
	    }

	  $scope.search = function() {
	    getOpenWeathermapData ($scope.scity,'','','This is what you searching for?');
	  };
}])
