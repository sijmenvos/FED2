
var model = {

  getUpcoming: ['movies', '$q', function(movies, $q) {
    var defer = $q.defer();
  
    movies.upcoming(function(err, data){
    	defer.resolve(data);
    });
  
    return defer.promise;
  }],
  getMovie: ['movies', '$q', '$stateParams', function(movies, $q, $stateParams) {
    var defer = $q.defer();
  
    movies.single($stateParams.id, function(err, data){
    	defer.resolve(data);
    });
  
    return defer.promise;
  }],
  getRelated: ['movies', '$q', '$stateParams', function(movies, $q, $stateParams) {
    var defer = $q.defer();
  
    movies.related($stateParams.id, function(err, data){
    	defer.resolve(data);
    });
  
    return defer.promise;
  }],
}