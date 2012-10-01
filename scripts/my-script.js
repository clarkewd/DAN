(function($){ //Anonomous namespace

$(function(){ //jQuery Document Ready
	/* Black magic goes here */
	/* windows load function */
	$(window).load(function(){
		hideFooter();
		if(Modernizr.touch){
			// script target to touch device
			$('.flexslider').flexslider({
				animation: "slide",
				animationLoop: false,
				video: false,
				controlNav: true,
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
	});
	/* windows resize function */
	$(window).resize(function(){
		windowHeight();
		hideFooter();
	});
	/* windows scroll function */
    $(window).scroll(function () {
		scrollNav();
		bookingScoll();
    });
    function windowHeight(){
		var windowHeight = $(window).height();
		$('.page-full-screen').css('height', windowHeight)
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
		console.log('test');
	}
	function bookingScoll(){
		var bodyOffset = $('body').scrollTop();
		var targetOffset = $('.page-legacy').offset();
		if(bodyOffset>(targetOffset.top*0.9)){
			$('.bottom-booking').addClass('center-booking');
		}else{
			$('.bottom-booking').removeClass('center-booking');
		}
    }
    function hideFooter(){
		var footerHeight = $('.practical-info').outerHeight(true);
		var btnLegacyBottom = $('.bottom-booking .booking').outerHeight(true);
		$('.bottom-booking').css('bottom', -footerHeight);
		$('.btn-legacy').css('bottom', (btnLegacyBottom+14));
    }
});
})( jQuery );