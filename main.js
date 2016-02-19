var express = require("express");
var bodyParser = require('body-parser');
var events = require("events");
var rest = require("./rest");
var eventEmitter = new events.EventEmitter();
var fs = require('fs');
var form = fs.readFileSync('./web/form.html');
var qs = require('querystring');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var formValue = {};
var sharedContext = {};
var response;

var bargainFinderMaxActivity = function() {
	console.log("BargainFinderMax");
	formValue.departureDateTime = formValue.departureDate+"T00:00:00";
	var requestObject = {
		event : "bfm",
		nextEvent : "end",
		service : "/v1.8.6/shop/flights?mode=live",
		query : {
			"OTA_AirLowFareSearchRQ": {
				"OriginDestinationInformation": [
					{
						"DepartureDateTime": formValue.departureDate+"T00:00:00",
						"DestinationLocation": {
							"LocationCode": formValue.destination
						},
						"OriginLocation": {
							"LocationCode": formValue.origin
						},
						"RPH":"1"
					}
				],
				"POS": {
					"Source": [
						{
							"RequestorID": {
								"CompanyName": {
									"Code": "TN"
								},
								"ID": "REQ.ID",
								"Type": "0.AAA.X"
							}
						}
					]
				},
				"TPA_Extensions": {
					"IntelliSellTransaction": {
						"RequestType": {
							"Name": "50ITINS"
						}
					}
				},
				"TravelerInfoSummary": {
					"AirTravelerAvail": [
						{
							"PassengerTypeQuantity": [
								{
									"Code": "ADT",
									"Quantity": 1
								}
							]
						}
					]
				}
			}
		}
		,
		directUrl : null
		
	};
	rest.post(requestObject, sharedContext, eventEmitter);
	
}
var instaFlightActivity = function() {
	console.log("InstaFlight");
	var requestObject = {
		event: "if",
		nextEvent: "bfm",
		service: "",
		directUrl: sharedContext["lpc"].FareInfo[0].Links[0].href
	};
	rest.get(requestObject, sharedContext, eventEmitter);
}
var leadPriceCalendarActivity = function() {
	console.log("LeadPriceCalendar");
	var requestObject = {
		event : "lpc",
		nextEvent : "if",
		service : "/v2/shop/flights/fares",
		query : formValue,
		directUrl : null
	};
	rest.get(requestObject, sharedContext, eventEmitter);
}
var workflowEnd = function() {
	var prettyResult = {
		lpc: {
			OriginLocation: sharedContext.lpc.OriginLocation,
			DestinationLocation: sharedContext.lpc.DestinationLocation,
			FareInfo: sharedContext.lpc.FareInfo[0]
		},
		"if": {
			FirstItinerary: sharedContext['if'].PricedItineraries[0].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0]
		},
		bfm: {
			FirstItinerary: sharedContext.bfm //.OTA_AirLowFareSearchRS.PricedItineraries.PricedItinerary[0]
		}
	};
	//console.log(JSON.stringify(prettyResult));
	response.end(JSON.stringify(prettyResult));
}

eventEmitter.on("lpc", leadPriceCalendarActivity);
eventEmitter.on("if", instaFlightActivity);
eventEmitter.on("bfm", bargainFinderMaxActivity);
eventEmitter.on("end", workflowEnd);

app.use(express.static('web'));
app.post('/*', urlencodedParser, function(req, res) {
	formValue = {
		origin: req.body.origin,
		destination: req.body.destination,
		departureDate: req.body.departureDate,
		lengthofstay: 5
	}
	eventEmitter.emit("lpc");
		
	console.log("Post END");
	response = res;
	
});
app.listen(1337, function () {});
