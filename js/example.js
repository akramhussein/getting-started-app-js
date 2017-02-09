$(function(){
	/************************************
	* Connect and login to deepstreamHub
	************************************/
	//establish a connection. You can find your endpoint url in the
	//deepstreamhub dashboard
	var ds = deepstream('wss://154.deepstreamhub.com?apiKey=97a397bd-ccd2-498f-a520-aacc9f67373c');

	//authenticate your connection. We haven't activated auth,
	//so this method can be called without arguments
	ds.login();

	/************************************
	* Realtime datastore
	************************************/









});