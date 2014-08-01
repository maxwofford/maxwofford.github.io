//Social button interactions go here
	$(window).scroll(function(e) {
		var rotation = $(document).scrollTop(); 
		//Set span innerHTML to rolation
		$('#test').text(rotation);
		$('#spinning').css( "-webkit-transform", "rotate(" + rotation + "deg)" );
		$('#spinning').css( "-moz-transform", "rotate(" + rotation + "deg)" );
		$('#spinning').css( "-o-transform", "rotate(" + rotation + "deg)" );		
	});
