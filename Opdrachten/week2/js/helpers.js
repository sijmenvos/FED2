var app = app || {};
(function(){
	app.helpers = {
		isNumber: function (n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}
	}

})();