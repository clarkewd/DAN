(function($){ //Anonomous namespace

$(function(){ //jQuery Document Ready
	/* Black magic goes here */
	//add this in your javascript code to 'hide' the address bar
	window.scrollTo(0, 1);
    /* windows load function */
	$(window).load(function(){
		hideFooter();
		if(Modernizr.touch){
			// script target to touch device
			$('.flexslider').flexslider({
				animation: "slide",
				animationLoop: false,
				video: false,
				controlNav: false,
				directionNav: false,
				slideshow: false,
				animationSpeed: 400,
				start: function(slider){
					$('body').removeClass('loading');
				}
			});
		}else{
			// script target to no-touch device
			$('.flexslider').flexslider({
				animation: "slide",
				animationLoop: false,
				prevText: "",
				nextText: "",
				keyboard: true,
				slideshow: false,
				animationSpeed: 400,
				// controlsContainer: ".display-content-text",
				start: function(slider){
					$('body').removeClass('loading');
				}
			});
		}
	});
	/* windows ready function */
	$(window).ready(function(){
		legacyScroll();
		windowHeight();
		contentPositionInt();
		hideFooter();
		toggleNav();
		toggleLocation();
	});
	/* windows resize function */
	$(window).resize(function(){
		windowHeight();
		hideFooter();
	});
	/* windows scroll function */
    $(window).scroll(function () {
		// var windowHeight = $(window).height();
		// var scrollPos = $('body').scrollTop();
		scrollNav();
		bookingScoll();
		// $('.page-legacy').css('backgroundPosition','center '+((scrollPos-(windowHeight*2))*0.4)+'px');
		// console.log(scrollPos);
    });
    function windowHeight(){
		var windowHeight = $(window).height();
		$('.page-full-screen').css('height', windowHeight);
		if(Modernizr.mq('screen and (max-width: 480px)')){
			$('.page-full-screen').css('height', 'auto');
		}
	}
	function scrollNav(){
		var bodyOffset = $('body').scrollTop();
		var logoHeight = $('.identity').outerHeight(true);
		if(bodyOffset>100){
			$('.identity .logo').addClass('hide-logo');
			$('.identity .hide-logo').css('margin-top', -logoHeight);
		}else{
			$('.identity .hide-logo').css('margin-top', '16px');
		}
	}
	function legacyScroll(){
		$('.btn-legacy').live('click touch', function(e){
			var targetOffset = $('.page-legacy').offset();
			$('body').animate({
				scrollTop:targetOffset.top
			}, '600');
			e.preventDefault();
		});
	}
	function contentPositionInt(){
		var navHeight = $('.site-nav').height();
		var heightOffset = 32;
		$('.page-content-page-focus .wrap .display-container').css('margin-top', navHeight+heightOffset);
		if(Modernizr.mq('screen and (max-width: 480px)')){
			$('.page-content-page-focus .wrap .display-container').css('margin-top', '0px');
		}
	}
	function bookingScoll(){
		var bodyOffset = $('body').scrollTop();
		var targetOffset = $('.footer-push').offset();
		if(bodyOffset>(targetOffset.top*0.8)){
			$('.bottom-booking').addClass('center-booking');
		}else{
			$('.bottom-booking').removeClass('center-booking');
		}
    }
    function hideFooter(){
		var footerHeight = $('.practical-info').outerHeight(true);
		var btnLegacyBottom = $('.bottom-booking .booking').outerHeight(true);
		$('.bottom-booking').css('bottom', -footerHeight);
		// $('.btn-legacy').css('bottom', (btnLegacyBottom+14)); legacy btn removed
		// push footer need fix
		$('.footer-push').css('height', footerHeight);
		if(Modernizr.mq('screen and (max-width: 480px)')){
			$('.bottom-booking').css('bottom', '0px');
			$('.footer-push').css('height', '0px');
		}
    }
    function toggleNav(){
		var windowHeight = $(window).height();
		var activate = false;
		$('.mobile-nav .nav-item-menu').bind('touchstart', function(e){
			$('.nav-bar .main-nav').css('height', windowHeight+100);
			$('.nav-bar .main-nav').toggleClass('mobile-main-nav');
			if(activate === false){
				activate = true;
				document.ontouchmove = function(e){ e.preventDefault(); };
			}else if(activate === true){
				activate = false;
				document.ontouchmove = function(e){ return true; };
			}
		});
    }
    function toggleLocation(){
    	console.log('test');
		$('.page-location .display-content-row-description').bind('click', function(e){
			console.log('test');
		});
    }
});
})( jQuery );