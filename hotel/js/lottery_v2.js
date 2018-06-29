var defaults={selector:"#lottery",width:4,height:4,initSpeed:300,speed:0,upStep:50,upMax:50,downStep:30,downMax:500,waiting:3e3,index:0,target:7,isRunning:!1},lottery={lottery:function(options){this.options=$.extend(!0,defaults,options),this.options.speed=this.options.initSpeed,this.container=$(this.options.selector),this._setup()},_setup:function(){for(var i=0;i<this.options.width;++i)this.container.find(".lottery-group:first .lottery-unit:eq("+i+")").attr("lottery-unit-index",i);i=lottery._count()-this.options.height+1;for(var j=0,len=this.options.width+this.options.height-2;len<=i;--i,++j)this.container.find(".lottery-group:last .lottery-unit:eq("+j+")").attr("lottery-unit-index",i);for(i=1,len=this.options.height-2;i<=len;++i)this.container.find(".lottery-group:eq("+i+") .lottery-unit:first").attr("lottery-unit-index",lottery._count()-i),this.container.find(".lottery-group:eq("+i+") .lottery-unit:last").attr("lottery-unit-index",this.options.width+i-1);this._enable()},_enable:function(){this.container.find("a").bind("click",this.beforeRoll)},_disable:function(){this.container.find("a").unbind("click",this.beforeRoll)},_up:function(){var _this=this;_this.options.speed<=_this.options.upMax?_this._constant():(_this.options.speed-=_this.options.upStep,_this.upTimer=setTimeout(function(){_this._up()},_this.options.speed))},_constant:function(){var _this=this;clearTimeout(_this.upTimer),setTimeout(function(){_this.beforeDown()},_this.options.waiting)},beforeDown:function(){this.aim(),this.options.beforeDown&&this.options.beforeDown.call(this),this._down()},_down:function(){var _this=this;_this.options.speed>_this.options.downMax&&_this.options.target==_this._index()?_this._stop():(_this.options.speed+=_this.options.downStep,_this.downTimer=setTimeout(function(){_this._down()},_this.options.speed))},_stop:function(){clearTimeout(this.downTimer),clearTimeout(this.rollerTimer),this.options.speed=this.options.initSpeed,this.options.isRunning=!1,this._enable(),$.magnificPopup.open({items:{src:"#youGetit"},midClick:!0,fixedContentPos:"true",mainClass:"my-mfp-zoom-in",type:"inline"},0)},beforeRoll:function(){var _this=lottery;_this._disable(),_this.options.beforeRoll&&_this.options.beforeRoll.call(_this),_this._roll()},_roll:function(){var _this=this;_this.container.find("[lottery-unit-index="+_this._index()+"]").removeClass("active"),++_this.options.index,_this.container.find("[lottery-unit-index="+_this._index()+"].lottery-unit").addClass("active"),_this.rollerTimer=setTimeout(function(){_this._roll()},_this.options.speed),_this.options.isRunning||(_this._up(),_this.options.isRunning=!0)},_index:function(){return this.options.index%this._count()},_count:function(){return this.options.width*this.options.height-(this.options.width-2)*(this.options.height-2)},aim:function(){this.options.aim?this.options.aim.call(this):(this.options.target=parseInt(parseInt(10*Math.random())*this._count()/10),console.log(this.options.target))}};


$(function(){

    // 影像地圖RWD
    $('map').imageMapResize();
    
	lottery.lottery({
		selector:     '#lottery',
		width:        3,
		height:       3,
		index:        0,    // 初始位置
		initSpeed:    350,  // 初始轉動速度
		upStep:       80,   // 加速滾動步長
		upMax:        100,  // 速度上限
		downStep:     40,   // 減速滾動步長
		downMax:      100,  // 减速上限
		waiting:      1200,
		aim: function () {  // 重寫計算中獎號的方法：aim
			this.options.target = parseInt(parseInt(Math.random() * 10) * this._count() / 10);
			console.log(this.options.target+1);
			var giftNo = this.options.target+1

			$('p.popup_07').removeClass('hide');
			$('p.popup_07').addClass('hide');

			if (giftNo == 7) {
				$('#youGetit h2').html('');
				$('p.popup_07').removeClass('hide');
			} else {
				$('p.popup_07').addClass('hide');
				$('#youGetit h2').html('<img src="img/item/popup_0'+ giftNo +'.jpg">');
				
			}
			
		}
	});	


	// 燈箱
	$('.open-popup-link').magnificPopup({
		type:'inline',
		midClick: true,
		fixedContentPos: 'true',
		fixedBgPos: 'true',
		removalDelay: 100,
        mainClass: 'my-mfp-zoom-in'
	});
	
	var navp = $('img.gotop, img.FB_m');
	$(window).scroll(function(){
		if ($(window).scrollTop() == 0 ) {
			navp.css("opacity","0");
		}else {
			navp.css("display","block");
			navp.css("opacity","0.8");
		}
	});

	// 滑動
	$('img.gotop, li.top').click(function(){
		$('html,body').animate({scrollTop: '0px'}, 800);
	});

    // 側選單
	$('.arrow_right').click(function(){
		$(this).hide();
		$('.arrow_left').show();
		$("ul.menu_box").animate({right:'-122px'});
	});

	$('.arrow_left').click(function(){
		$(this).hide();
		$('.arrow_right').show();
		$("ul.menu_box").animate({right:'0px'});
	});

	// 關閉 固定置底APP Banner
	$('.app_close').click(function(){
		$('.app_download').hide(100);
		$('.footer').addClass('noAPP');
		$('.gotop_box').addClass('noAPP');
	});


	
    

});
















