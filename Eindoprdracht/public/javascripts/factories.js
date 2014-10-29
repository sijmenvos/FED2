angular.module('eindOpdracht')

.factory('movies', function movies($http){
	return {
		upcoming: function(callback){
			$http.post('/api/movies/lists/upcoming')
		        .success(function (data) {
		            callback(null, data);
		        })
		        .error(function (e) {
		            callback(e);
		        });
		},
 		search: function search(query, callback) {
		    $http.post('/api/movies', {q: query, page_limit: 10, page:1})
		        .success(function (data) {
		            callback(null, data);
		        })
		        .error(function (e) {
		            callback(e);
		        });
		},
		single: function single(id, callback){
			$http.post('/api/movie', {id: id})
	        	.success(function (data) {
		            callback(null, data);
		        })
		        .error(function (e) {
		            callback(e);
		        });
		},
		related: function related(id, callback){
			$http.post('/api/movie/related', {id: id})
	        	.success(function (data) {
		            callback(null, data);
		        })
		        .error(function (e) {
		            callback(e);
		        });
		}
    };
});