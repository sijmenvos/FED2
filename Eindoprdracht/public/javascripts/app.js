angular.module('eindOpdracht', ['ui.router', 'ngTouch'])

.run(function($rootScope){
	console.log('run');

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){ 
    console.log(error);
  })
})

.config(function($sceDelegateProvider, $stateProvider, $urlRouterProvider, $httpProvider){
	console.log('config');

  console.log($httpProvider.defaults.headers.common);

	$sceDelegateProvider.resourceUrlWhitelist([
	    // Allow same origin resource loads.
	    'self',
	    // Allow loading from api
	    'http://api.rottentomatoes.com/**'
  	]);

  $urlRouterProvider.otherwise("upcoming");

	$stateProvider
    .state('upcoming', {
      url: "/upcoming",
      templateUrl: "views/upcoming",
      controller: 'upcomingCtrl',
      resolve: {
        upcoming: model.getUpcoming
      }
    })
    .state('search', {
      url: "/search",
      templateUrl: "views/search",
      controller: 'searchCtrl',
      resolve: {
        // cars: model.getCars
      }
    })
    .state('watchlist', {
      url: "/watchlist",
      templateUrl: "views/watchlist",
      controller: 'watchlistCtrl',
      resolve: {
        // watchlist: model.getCars
      }
    })
    .state('movie', {
      url: "/movie/:id",
      templateUrl: "views/movie",
      controller: 'movieCtrl',
      resolve: {
        movie: model.getMovie,
        related: model.getRelated
      }
    });
})