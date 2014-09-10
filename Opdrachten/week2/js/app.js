var app = app || {};
(function(){
	app.controller = {
		init: function(){
			app.gps.init();
		}
	}
	app.controller.init();
})();