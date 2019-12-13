// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

/**
 *
 * Script-Name: example_billpay_routing_validation_request
 */

var billpayapi = require('mastercard-billpayapi');
var MasterCardAPI = billpayapi.MasterCardAPI;

var consumerKey = "your consumer key";   // You should copy this from "My Keys" on your project page e.g. UTfbhDCSeNYvJpLL5l028sWL9it739PYh6LU5lZja15xcRpY!fd209e6c579dc9d7be52da93d35ae6b6c167c174690b72fa
var keyStorePath = "path to your .p12 private key file"; // e.g. /Users/yourname/project/sandbox.p12 | C:\Users\yourname\project\sandbox.p12
var keyAlias = "keyalias";   // For production: change this to the key alias you chose when you created your production key
var keyPassword = "keystorepassword";   // For production: change this to the key alias you chose when you created your production key

// You only need to do initialize MasterCardAPI once
//
var authentication = new MasterCardAPI.OAuth(consumerKey, keyStorePath, keyAlias, keyPassword);
MasterCardAPI.init({
	sandbox: true,
	debug: true,
	authentication: authentication
});


var requestData = {
  "BillPayAccountValidation": {
    "RppsId": "99887761",
    "BillerId": "9998887771",
    "AccountNumber": "1234567890",
    "TransactionAmount": "250.00",
    "CustomerIdentifier1": "",
    "CustomerIdentifier2": "",
    "CustomerIdentifier3": "",
    "CustomerIdentifier4": "",
    "ResponseString": ""
  }
};
billpayapi.RPPSPaymentValidatorAPI.create(requestData
, function (error, data) {
	if (error) {
		err("HttpStatus: "+error.getHttpStatus());
		err("Message: "+error.getMessage());
		err("ReasonCode: "+error.getReasonCode());
		err("Source: "+error.getSource());
		err(error);

	}
	else {
		out(data.BillPayAccountValidation.RppsId); //-->99887761
		out(data.BillPayAccountValidation.BillerId); //-->9998887771
		out(data.BillPayAccountValidation.AccountNumber); //-->1234567890
		out(data.BillPayAccountValidation.TransactionAmount); //-->250.00
		out(data.BillPayAccountValidation.ResponseString); //-->Successful
	}
});


function out(value) {
	console.log(value);
}

function outObj(item, key) {
	console.log(item[key]);
}

function err(value) {
	console.error(value);
}