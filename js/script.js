
  $(window).scroll(function(e) {
    var rotation = $(window).scrollTop(); 
    //Set span innerHTML to rolation
    $('#test').text(rotation);
    //Social button interactions go here
    $('.social').css( "-webkit-transform", "rotate(" + rotation + "deg)" );
    $('.social').css( "-moz-transform", "rotate(" + rotation + "deg)" );
    $('.social').css( "-o-transform", "rotate(" + rotation + "deg)" );
  });
