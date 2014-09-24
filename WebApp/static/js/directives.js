var app = app || {};

(function(){

	app.directives = {
	  	coverImage: {
	    	src: function(params) {
	      		return this.cover;
	    	}
	  	},
	  	paragraphs: {
	  		text: function(params){
	  			this.description.forEach(function(paragraph){
	  				var node = document.createElement('p');
		  			node.innerHTML = paragraph;
		  			params.element.appendChild(node);
	  			});
		  	}
	  	}
	};

})();