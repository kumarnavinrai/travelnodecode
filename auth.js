//auth.js
var config = require("./configuration");
var base64 = require("./base64");
var Client = require('node-rest-client').Client;
require("datejs");
var tokenString = "";
var expirationDate;
module.exports = {
	
	getAuthString : function() {
		if (tokenString.length == 0 || expirationDate == null || expirationDate.isBefore()) {
			var client = new Client();
			var args = {
				data : "grant_type=client_credentials",
				headers : {"Authorization" : "Basic " + this._buildAuthString(),
							"Content-Type" : "application/x-www-form-urlencoded"}
			}
			var promise = new Promise(function(accept, reject) {
				client.post(config.endpoint + "/v2/auth/token", args, function(data) {
					tokenString = data.access_token;
					expirationDate = Date.today().setTimeToNow().addSeconds(data.expires_in);
					console.log("Token aquired; token's expiration date: "+expirationDate);
					accept(data.access_token);
				});
				
			});
			return promise;
		} else {
			return new Promise(function(accept, reject) {
				console.log("Just reading the previously aquired token...");
				accept(tokenString);
			})
		} 
	},
	
	_buildAuthString : function() {
		var credentials = config.formatVersion
					+ ":" 
					+ config.decrypt(config.userId)
					+ ":"
					+ config.decrypt(config.group)
					+ ":"
					+ config.decrypt(config.domain);
		var secret = base64.encode(config.decrypt(config.secret));
		return base64.encode(base64.encode(credentials)+":"+secret);
	},
	
	_callAuthentication : function() {
		
	}
};