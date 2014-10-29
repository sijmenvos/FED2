angular.module('eindOpdracht')

.controller('appCtrl', function($rootScope){
	$rootScope.orderByList = [{
		text: 'Title',
		expression: 'title'
	},{
		text: 'Release Date',
		expression: 'release_dates.theater'
	}];

	$rootScope.orderBy = $rootScope.orderByList[1];
	$rootScope.reverse = false;

	$rootScope.back = function() {
		console.log('test');
		window.history.back();
	}
	$rootScope.forward = function() {
		window.history.forward();
	}
})


.controller('upcomingCtrl', function($scope, $state, movies, upcoming){
	$scope.movies = upcoming.movies;
	console.log(upcoming);

	$scope.openMovie = function(id){
		$state.go('movie', {id: id});
	}
})

.controller('searchCtrl', function($rootScope, $scope, $http, $timeout, movies){

  $scope.search = function(term){
    if(!term) return;

    $scope.loading = 'images/loader.gif?t=' + new Date().getTime();
    if(loadingtimer) 
    	$timeout.cancel(loadingtimer);

    var loadingtimer = $timeout(function(){
    	$scope.loading = false;
    },6500);

    movies.search(term, function(err, data){
  		$rootScope.movies = data.movies;
  		console.log(data);
  	})
  }

})

.controller('movieCtrl', function($scope, movie, related){
	$scope.movie = movie;
	$scope.related = related.movies;
	console.log(related);
	console.log(movie);
});