var app = app || {};

(function(){

	app.directives = {
	  	coverImage: {
	    	src: function(params) {
	      		return this.cover;
	    	}
	  	},
	  	paragraphs: {
	  		html: function(params){
	  			return this.description;
		  	}
	  	}
	};

})();