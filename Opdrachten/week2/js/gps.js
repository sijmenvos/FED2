var app = app || {};
(function(){
	var interval = intervalCounter = false;
	app.gps = {
		// Variable declaration
		currentPosition: false,

	    // Test of GPS beschikbaar is (via geo.js) en vuur een event af
	    init: function (){
	        app.debug.message("Controleer of GPS beschikbaar is...");

	        app.ET.addListener('GPS_AVAILABLE', this.startInterval);
	        app.ET.addListener('GPS_UNAVAILABLE', function(){app.debug.message('GPS is niet beschikbaar.')});

	        (geo_position_js.init())?app.ET.fire('GPS_AVAILABLE'):app.ET.fire('GPS_UNAVAILABLE');
	    },
	    // Vraag de huidige positie aan geo.js, stel een callback in voor het resultaat
	    updatePosition: function (){
	        intervalCounter++;
	        geo_position_js.getCurrentPosition(this.setPosition, _geo_error_handler, {enableHighAccuracy:true});
	    },
	    // Start een interval welke op basis van config.refreshRate de positie updated
	    startInterval: function (event){
	        app.debug.message("GPS is beschikbaar, vraag positie.");
	        this.updatePosition();
	        interval = self.setInterval(this.updatePosition, app.config.refreshRate);
	        app.ET.addListener('POSITION_UPDATED', this.checkLocations);
	    },
	    // Callback functie voor het instellen van de huidige positie, vuurt een event af
	    setPosition: function (position){
	        this.currentPosition = position;
	        app.ET.fire("POSITION_UPDATED");
	        app.debug.message(intervalCounter+" positie lat:"+position.coords.latitude+" long:"+position.coords.longitude);
	    },
	    // Controleer de locaties en verwijs naar een andere pagina als we op een locatie zijn
	    checkLocations: function (event){
	        // Liefst buiten google maps om... maar helaas, ze hebben alle coole functies
	        for (var i = 0; i < locaties.length; i++) {
	            var locatie = {coords:{latitude: locaties[i][3],longitude: locaties[i][4]}};

	            if(this.calculateDistance(locatie, this.currentPosition)<locaties[i][2]){

	                // Controle of we NU op die locatie zijn, zo niet gaan we naar de betreffende page
	                if(window.location!=locaties[i][1] && localStorage[locaties[i][0]]=="false"){
	                    // Probeer local storage, als die bestaat incrementeer de locatie
	                    try {
	                        (localStorage[locaties[i][0]]=="false")?localStorage[locaties[i][0]]=1:localStorage[locaties[i][0]]++;
	                    } catch(error) {
	                        app.debug.message("Localstorage kan niet aangesproken worden: "+error);
	                    }

	    			// TODO: Animeer de betreffende marker

	                    window.location = locaties[i][1];
	                    app.debug.message("Speler is binnen een straal van "+ locaties[i][2] +" meter van "+locaties[i][0]);
	                }
	            }
	        }
	    },

	    // Bereken het verchil in meters tussen twee punten
	    calculateDistance: function (p1, p2){
	        var pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
	        var pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
	        return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);
	    },
	    errorHandler: function (code, message) {
		    app.debug.message('geo.js error '+code+': '+message);
		}
	}
})();