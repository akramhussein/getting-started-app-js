$(function(){
	/************************************
	* Connect and login to deepstreamHub
	************************************/
	//establish a connection. You can find your endpoint url in the
	//deepstreamhub dashboard
	var ds = deepstream('wss://154.deepstreamhub.com?apiKey=97a397bd-ccd2-498f-a520-aacc9f67373c');

	//display the connection state at the top
	ds.on( 'connectionStateChanged', function( connectionState ){
		$( '#connection-state' ).text( connectionState );
	});

	//authenticate your connection. We haven't activated auth,
	//so this method can be called without arguments
	ds.login();

	/************************************
	* Realtime datastore
	************************************/
	// Create or retrieve a record with the name test/johndoe
	var myRecord = ds.record.getRecord( 'test/johndoe' );

	// We want to synchronize a path within the record, e.g. `firstname`
	// with an input so that every change to the input will be saved to the
	// record and every change from the record will be written to the input
	function bindInputToPath( record, input, path ) {

		// Write changes from the record to the input element
		record.subscribe( path, function( value ){
			input.val( value );
		});

		//Write changes to the input element to the record
		input.on( 'keyup', function(){
			record.set( path, input.val() );
		});
	}

	//bind the input for firstname
	bindInputToPath( myRecord, $( '#firstname' ), 'firstname' );

	//bind the input for lastname
	bindInputToPath( myRecord, $( '#lastname' ), 'lastname' );

	/************************************
	* Publish Subscribe
	************************************/
	$( '#send-event' ).click(function(){
		ds.event.emit( 'test-event', $( '#event-data' ).val() );
	});

	ds.event.subscribe( 'test-event', function( eventData ){
		var html = '<li>Received test-event with <em>' + eventData + '</em></li>';
		$( '#events-received' ).append( html );
	});

	/************************************
	* Request Response
	************************************/
	$('#make-rpc').click(function(){
		ds.rpc.make( 'get-current-mood', function( err, resp ){
			$( '#display-response' ).text( resp || err.toString() );
		});
	});


});