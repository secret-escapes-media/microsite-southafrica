(function ($, root, undefined) {$(function () {'use strict'; // on ready start
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////
//        general
///////////////////////////////////////

  // css tricks snippet - http://css-tricks.com/snippets/jquery/smooth-scrolling/
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 500);
          return false;
        }
      }
    });
  });

  // inserts current year
  $('.js-year').html(new Date().getFullYear());

  // detects touch device
  if ("ontouchstart" in document.documentElement){
    $('html').addClass('touch');
  }


///////////////////////////////////////
//        Navigation
///////////////////////////////////////

  // mobile nav toggle open & close
  $('.js-toggle-mobile-nav').on('click', function(e) {
    $('.mobile-nav').toggleClass('is-open').toggleClass('is-closed');
  });

  // current page nav highlight
  var currentPage = $('body').data('current-page');
  $('.' + currentPage + ' .site-nav__link--' + currentPage).addClass('site-nav__link--current');


///////////////////////////////////////
//      SVG image swap
///////////////////////////////////////

  // finds image with class and swaps .png with .svg in img source string
  if (Modernizr.svgasimg) {
    var svgSwap = $('img.js-svg-swap');
    svgSwap.each( function() {
      var currentSrc = $(this).attr('src'),
          newSrc = currentSrc.replace('.png', '.svg');
      $(this).attr('src', newSrc);
    });
  }


///////////////////////////////////////
//      Youtube thumbnails
///////////////////////////////////////

  // stopped on touch devices
  if ( $('html.touch').length === 0 ) {

    // Loops through all videos on page
    $('.js-youtube-thumbnail').each(function(index, el) {
      var video             = $(this).find('.video__iframe'),
          videoSrc          = video.attr('src'),
          thumbnailImg      = $(this).data('thumbnail-img'),
          thumbnailElement  = '<div class="video__thumbnail" style="background-image: url(\'' + thumbnailImg + '\')"><div class="video__play js-play-video"></div></div>';

      // hide video, but keep aspect ratio
      video.css('visibility', 'hidden');

      // Add thumbnail element to hold image & play button
      $(this).prepend(thumbnailElement);
      var thumbnail   = $(this).find('.video__thumbnail'),
          playButton  = $(this).find('.js-play-video');

      // play button event
        playButton.on('click', function(e) {
          e.preventDefault();
          // add auto play query to iframe
          video.attr('src', videoSrc + '&autoplay=1');
          // fade out iframe and show video
          thumbnail.fadeOut( 175, function() {
            video.css('visibility', 'visible');
          });
        });

    });

  }


///////////////////////////////////////
//    Stlyist offer query string
///////////////////////////////////////

  // searches for specific queryString, returns value or true if empty value
  function getQueryStringByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return true;
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  if ( !(getQueryStringByName('stylist-offer')) ) {
    $('.js-stylist-offer').hide();
  }


///////////////////////////////////////
//      Fade in video overlay
///////////////////////////////////////

$(window).scroll(function(){
  $('.video-background__overlay').css("opacity", 0 + $(window).scrollTop() / 500);
});


///////////////////////////////////////
//      GAME
///////////////////////////////////////

// Sees type of activity preffered & price difference from UK & SA
$('.js-submit-choices').on('click', function(e) {
  e.preventDefault();

  // setting variables
  var adventureTotal   = 0,
      luxuryTotal      = 0,
      ukPriceTotal     = 0,
      saPriceTotal     = 0,
      pefferedType     = "",
      pickedActivities = [];

  // counts selected activities, finds type & adds prices to totals
  $('input[type="radio"]:checked').each(function() {
    var activityName = $(this).parent('label').text(),
        activityType = $(this).attr('value'),
        ukPrice      = $(this).data('price-uk'),
        saPrice      = $(this).data('price-sa');
    // sees if activity is adventure or luxury
    if (activityType === 'adventure') {
      adventureTotal++;
    } else if (activityType === 'luxury'){
      luxuryTotal++;
    }
    // Adds the prices to each total
    ukPriceTotal += ukPrice;
    saPriceTotal += saPrice;

    activityName = $.trim(activityName);
    pickedActivities.push(activityName);
  });

  // which type is preferred
  if (adventureTotal > luxuryTotal) {
    pefferedType = "Adventurous";
  } else {
    pefferedType = "luxurious";
  }

  // money saved
  var moneySaved = ukPriceTotal - saPriceTotal;

  //
  console.log("your picked activities were: ");
  for (var i = 0; i < pickedActivities.length; i++) {
    console.log("==  " + pickedActivities[i]);
  }
  console.log(" ");
  console.log("your preffered type of activity is = " + pefferedType);
  console.log(" ");
  console.log("you could save £" + moneySaved + " in south africa compared with UK" );
  console.log("heres a voucher for £50 off as well");
  console.log("Big Button = book an offer");
  console.log(" ");
  console.log("here are a few " + pefferedType + " recommendations");

});

// resets the selected checkboxes
$('.js-reset-game').on('click', function(e) {
  e.preventDefault();
  $('input[type="radio"]:checked').prop('checked', false);
});

///////////////////////////////////////////////////////////////////////////////
});})(jQuery, this); // on ready end