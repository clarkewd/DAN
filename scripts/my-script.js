(function($){ //Anonomous namespace

$(function(){ //jQuery Document Ready
	/* Black magic goes here */
	//add this in your javascript code to 'hide' the address bar
	window.scrollTo(0, 1);
    /* windows load function */
	$(window).load(function(){
		hideFooter();
		googleMapLocation();
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
		$('.page-location .display-content-row-description').bind('click', function(e){
			$(this).parent().find('.display-content-accordion').slideToggle();
			$(this).parents('.wrap').toggleClass('active');
			google.maps.event.trigger(document.getElementById("map-nyhavn"), 'resize');
			google.maps.event.trigger(document.getElementById("map-stroeget"), 'resize');
			google.maps.event.trigger(document.getElementById("map-backstreet"), 'resize');
		});
    }
	function googleMapLocation(){
		// Create an array of styles.
		var styles = [
		{
			stylers:
				[
					{ "visibility": "off" }
				]
		},{
			"featureType": "landscape",
			"stylers": [
				{ "visibility": "on" },
				{ "color": "#c8cfc9" }
			]
		},{
			"featureType": "road",
			"stylers": [
				{ "visibility": "on" },
				{ "color": "#e4e7e4" }
			]
		},{
			"featureType": "water",
			"stylers": [
				{ "visibility": "on" },
				{ "color": "#96bec4" }
			]
		},{
			"featureType": "poi",
			"elementType": "geometry",
			"stylers": [
				{ "color": "#808080" },
				{ "visibility": "off" }
			]
		},{
			"featureType": "poi",
			"elementType": "labels.text.fill",
			"stylers": [
				{ "visibility": "on" },
				{ "color": "#192923" }
			]
		},{
			"featureType": "poi",
			"elementType": "labels.text.stroke",
			"stylers": [
				{ "visibility": "on" },
				{ "weight": 2 },
				{ "color": "#ffffff" }
			]
		},{
			"elementType": "labels.icon",
			"stylers": [
			{ "visibility": "on" }
			]
		}];
		// Create a new StyledMapType object, passing it the array of styles,
		// as well as the name to be displayed on the map type control.
		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
		// lan og lng
		var locLatLng = new google.maps.LatLng(55.680128,12.586668);
		var nyhavnLatLng = new google.maps.LatLng(55.676097,12.568337);
		var stroegetLatLng = new google.maps.LatLng(58.676097,11.568337);
		var backstreetLatLng = new google.maps.LatLng(54.676097,10.568337);
		var iconMarkerSmall = 'content/gfx/icon-google-map-marker-small.png';
		var iconMarkerBig = 'content/gfx/icon-google-map-marker-big.png';
		// Create a map object, and include the MapTypeId to add
		// to the map type control.
		var locOptions = {
			zoom: 16,
			center: locLatLng,
			scrollwheel: false,
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			}
		};
		var nyhavnOptions = {
			zoom: 16,
			center: nyhavnLatLng,
			scrollwheel: false,
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			}
		};
		var stroegetOptions = {
			zoom: 16,
			center: stroegetLatLng,
			scrollwheel: false,
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			}
		};
		var backstreetOptions = {
			zoom: 16,
			center: backstreetLatLng,
			scrollwheel: false,
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			}
		};
		var localMap = new google.maps.Map(document.getElementById('map-location'),locOptions);
		var nyhavnMap = new google.maps.Map(document.getElementById('map-nyhavn'),nyhavnOptions);
		var stroegetMap = new google.maps.Map(document.getElementById('map-stroeget'),stroegetOptions);
		var backstreetMap = new google.maps.Map(document.getElementById('map-backstreet'),backstreetOptions);
		// add marker
		var markerSmall = new google.maps.Marker({
			position: nyhavnLatLng,
			map: nyhavnMap,
			icon: iconMarkerSmall,
			title:"Hotel"
		});
		var markerBig = new google.maps.Marker({
			position: locLatLng,
			map: localMap,
			icon: iconMarkerBig,
			title:"Hotel"
		});
		//Associate the styled map with the MapTypeId and set it to display.
		localMap.mapTypes.set('map_style', styledMap);
		localMap.setMapTypeId('map_style');
		nyhavnMap.mapTypes.set('map_style', styledMap);
		nyhavnMap.setMapTypeId('map_style');
		stroegetMap.mapTypes.set('map_style', styledMap);
		stroegetMap.setMapTypeId('map_style');
		backstreetMap.mapTypes.set('map_style', styledMap);
		backstreetMap.setMapTypeId('map_style');
	}
});
})( jQuery );