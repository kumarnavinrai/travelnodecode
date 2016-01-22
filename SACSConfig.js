//++++++++++++++++++++
//+ SACSConfig.js +
//++++++++++++++++++++
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'abcdbzzzzakuku';

module.exports = {
	"environment" : "https://api-tls.cert.sabre.com",
/*	"userId" : "e58921f8018d62136e2ef414b5ab154d",
	"group" : "95ad03c375f35e394c",
	"domain" : "94b001",
	"secret" : "e9a62cb443e96339", */
	"userId" : "4atx10hopaikzdfh",
	"group" : "DEVCENTER"
	"domain" : "EXT"
	"secret" : "8Ny4sTiE"
	"formatVersion" : "V1",
	
	encrypt : function(text) {
		var cipher = crypto.createCipher(algorithm, password);
		var crypted = cipher.update(text, 'utf8', 'hex');
		crypted += cipher.final('hex');
		return crypted;
	},
	decrypt : function(text) {
		var decipher = crypto.createDecipher(algorithm, password);
		var dec = decipher.update(text, 'hex', 'utf8');
		dec += decipher.final('utf8');
		return dec;
	}
}