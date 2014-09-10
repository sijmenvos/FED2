var app = app || {};
(function(){
	app.debug = {
		customDebugging: false,
		debugId: false,
		message: function (message){
		    (this.customDebugging && this.debugId)?document.getElementById(this.debugId).innerHTML:console.log(message);
		},
		setCustomDebugging: function (debugId){
		    this.debugId = debugId;
		    this.customDebugging = true;
		}
	}
})();