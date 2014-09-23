var app = app || {};

(function(){
	app.controller = {
		init: function(){
			app.sections.init();
			app.router.init();
		}
	};

	app.router = {
		init: function(){
			routie('*', function(route){
				app.sections.toggle(route);
			});
		}
	};

	app.sections = {
		init: function(){
			this.about();
			this.movies();
		},
		toggle: function(id){
			var elements = document.getElementsByTagName('section');
			for(var i in elements){
				if(elements[i].classList){
					elements[i].classList.remove('active');
				}
			}
			if(document.getElementById(id)){
				document.getElementById(id).classList.add('active');
			}
		},
		about: function(){
			Transparency.render(document.getElementById('about'), app.content.about, app.directives);
		},
		movies: function(){
			Transparency.render(document.getElementById('renderMovies'), app.content.movies, app.directives);
		}
	};

	app.controller.init();
})();