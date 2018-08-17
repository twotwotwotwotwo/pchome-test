$( function(){
	$(document).on('scroll touchmove', function() {
		var $win = $(window),
			w = $win.width(),
			h = $win.height()
			if( $(window).scrollTop() >= 30 ){
				$('.fixedbar_carousel').fadeOut(300);
			} else {
				$('.fixedbar_carousel').fadeIn(300);
			}	
			if( ($(window).scrollTop() + h) > $('#footer').position().top){
				$('.fixedbar_carousel').addClass('open');
			} else {
				$('.fixedbar_carousel').removeClass('open');
			}
	}).scroll();	
	
	$('.close_under .close').click(function(){
    	$('.fixedbar_carousel').addClass('hide');
    });


});





$( function(){

    	// iframe RWD
	$('iframe').iFrameResize( [{
		inPageLinks	: true,
		log			: false,
	}] );

    // 影像地圖RWD
    $('map').imageMapResize();	
    });