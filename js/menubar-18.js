$( function(){
	
	// 側邊選單開關換圖
	$('#RMenuOutF').click(function(){
		$(this).hide();
		$('#RMenuInF').show();
		$('#sliderRightF').animate({right:'-210px'});
	});

	$('#RMenuInF').click(function(){
		$(this).hide();
		$('#RMenuOutF').show();
		$('#sliderRightF').animate({right:'40px'});
	});
	
	
	$( ".mainstage" ).click(function() {
		$(this).toggleClass( "active" );
			if ($( ".mainstage" ).is('.active')){
					$(".mainstage img").attr("src","img/icon_01-1.png");
				}else {
					$(".mainstage img").attr("src","img/sidebar_icon1.png");
			};
	});	
	

	$(".mainstage").hover(
		function(e){ $(".mainstage img").attr("src","img/icon_01-1.png"); }, // over
		function(e){ $(".mainstage img").attr("src","img/sidebar_icon1.png");}  // out
	);
	
	
	
	$(".substage").hover(
		function(e){ $(".substage img").attr("src","img/icon_02-1.png"); }, // over
		function(e){ $(".substage img").attr("src","img/sidebar_icon2.png");}  // out
	);
		
		
	// 手機版底頂選單開關
	$( ".openF" ).click(function() {
		$(this).toggleClass( "active" );
		
			if ($( ".openF, .substage" ).is('.active')){
					$(".openF img, .substage img").attr("src","img/icon_02-1.png");
					$(".openF, .substage").hover(
						function(e){ $(".substage img").attr("src","img/icon_02-1.png"); }, // over
						function(e){ $(".substage img").attr("src","img/icon_02-1.png");}  // out
					);
				}else {
					$(".openF img").attr("src","img/sidebar_icon2.png");
			};
		
		$( ".RsubmenuF" ).toggleClass( "active" );
		$(".blackBoxF").toggleClass( "active" );
	});	


	$( ".blackBoxF, .submenu_close" ).click(function() {
		$(".openF").removeClass( "active" );
		$( ".RsubmenuF" ).removeClass( "active" );
		$(".blackBoxF").removeClass( "active" );
		$(".openF img").attr("src","img/sidebar_icon2.png");
	});		
	
});


$(window).scroll(function(){
	if (  $(window).scrollTop() > 40 ) {
			$('#sliderRightF').css('top','5px');
	}else {
			$('#sliderRightF').css('top','45px');
	}
});





