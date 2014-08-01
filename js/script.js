//Social button interactions go here
	$(window).scroll(function(e) {
		var rotation = $(document).scrollTop(); 
		//Set span innerHTML to rolation
		$('#test').text(rotation);
		$('.social').css( "-webkit-transform", "rotate(" + rotation + "deg)" );
		$('.social').css( "-moz-transform", "rotate(" + rotation + "deg)" );
		$('.social').css( "-o-transform", "rotate(" + rotation + "deg)" );		
	});

//Animations 

/* Example use of animate.css with jquery
$( document ).ready(function(e){
	$('SOMESELECTORHERE').addClass('animated ANIMATE.CSS-CLASS');
});
*/