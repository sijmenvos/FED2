var express = require('express');
var router = express.Router();
var http = require('http');

router.post('/movies', function(req, res){
	var url = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=" + req.body.q + "&page_limit=" + req.body.page_limit + "&page=" + req.body.page + "&apikey=t3zbyjbktdrc3fqvjnadbseq";

	getData(url, function(data){
		res.send(data);
	});
});

router.post('/movie', function(req, res){
	var url = "http://api.rottentomatoes.com/api/public/v1.0/movies/" + req.body.id + ".json?apikey=t3zbyjbktdrc3fqvjnadbseq";

	getData(url, function(data){
		res.send(data);
	});
});

router.post('/movie/related', function(req, res){
	var url = "http://api.rottentomatoes.com/api/public/v1.0/movies/" + req.body.id + "/similar.json?apikey=t3zbyjbktdrc3fqvjnadbseq";

	getData(url, function(data){
		res.send(data);
	});
});

router.post('/movies/lists/upcoming', function(req, res){
	var url = "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json?apikey=t3zbyjbktdrc3fqvjnadbseq&country=nl";

	getData(url, function(data){
		res.send(data);
	});
});

var getData = function(url, callback){
	http.get(url, function(http_res) {
		var body = '';

		http_res.on('data', function(data) {
		  body += data;
		});

		http_res.on('end', function() {
		  callback(JSON.parse(body));
		});

	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
	
}

module.exports = router;
