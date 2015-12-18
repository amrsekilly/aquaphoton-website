// preloader
$(window).load(function() { // makes sure the whole site is loaded
  $('#status').fadeOut(); // will first fade out the loading animation
  $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
  $('body').delay(350).css({
    overflow: 'visible',
  });

});


// doc ready
$(document).ready(function() {
  var currentScroll = 0;

  $('li a').on('click', function() {

    // console.log('section clicked');

    var scrollAnchor = $(this).attr('data-scroll');
    // console.log(scrollAnchor);
    var scrollPoint = $('section[data-anchor="' + scrollAnchor + '"]').offset().top - 28;

    $('body,html').animate({
      scrollTop: scrollPoint,
    }, 500);

    return false;

  });

  $(window).scroll(function() {
    var windscroll = $(window).scrollTop();
    if (windscroll >= 100) {
      $('section').each(function(i) {
          if ($(this).position().top <= windscroll + 30) {
            $('.nav li.active').removeClass('active');
            $('.nav > li').eq(i).addClass('active');
          }
        });

    } else {
      // check if the page contains any other sections
      if ($('section').length) {
          $('nav li.active').removeClass('active');
      }
    }
  }).scroll();

  if ($('#first-section').length) {
    $(document).scroll(function() {
      currentScroll = $(this).scrollTop();
      if (currentScroll + 10 > $('#first-section').offset().top) {
        $('.navbar-fixed-top').addClass('top-nav-collapse');
      } else {
        $('.navbar-fixed-top').removeClass('top-nav-collapse');
      }
    });
  }

  // handle modals for services
  $('.service-more-button').click(function() {

    var clickedServiceNum = $(this).data('id');

    var currentService = context.services[clickedServiceNum];

    // console.log(currentService);

    //use the modal template to generate html
    // and put it in the DOM
    var html    = modalTemplate(currentService);
    $('#service-modal-content').html(html);
    $('#serviceModal').modal('show');
  });

  // contact info
  if($("#contactform").length)
  {
    var contactform =  document.getElementById('contactform');
    contactform.setAttribute('action', '//formspree.io/' + 'moataztarek1991' + '@' + 'gmail' + '.' + 'com');
  }

  // map
  function init_map() {
    // company's location
   var var_location = new google.maps.LatLng(31.269181, 29.996385);

       var var_mapoptions = {
        scrollwheel: false,
        draggable: false,
        center: var_location,
        zoom: 14
       };

   var var_marker = new google.maps.Marker({
     position: var_location,
           map: var_map,
     title:"AquaPhoton Co."});

     if($("#map-container").length)
     {
       var var_map = new google.maps.Map(document.getElementById("map-container"),
           var_mapoptions);
           var_marker.setMap(var_map);
     }
     }

     google.maps.event.addDomListener(window, 'load', init_map);

     //  append copyright year to the footer
     $('#copyYear').html(new Date().getFullYear());

    //  check which button is clicked for ROV

    // $('.rov-btn').click(function() {
    //
    //   // get the index of clicked ROV
    //   // console.log($(this).data('id'));
    //   // console.log(context.products[$(this).data('id')].title.replace(/\s/g, '').toLowerCase());
    //
    //   var rov    = rovTemplate(context.products[$(this).data('id')]);
    //   console.log(context.products[$(this).data('id')]);
    //   // hide all sections
    //   $('section').hide();
    //
    //   // push state
    //   history.pushState(null, context.products[$(this).data('id')].title, context.products[$(this).data('id')].title.replace(/\s/g, '').toLowerCase());
    //
    //   // append rov
    //   $('.rov-page').html(rov);
    // });

    // activate wow.js
    new WOW().init();

});
