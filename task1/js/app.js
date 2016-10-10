var app = angular.module('weatherApp', ['ngRoute', 'leaflet-directive']);

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		controller: 'MainController',
		templateUrl: 'views/main.html',
		resolve: {
			coordinates: function (myCoordinates) {
				return myCoordinates;
			}
		}
	})
	.otherwise({
		redirectTo: '/'
	});

});
