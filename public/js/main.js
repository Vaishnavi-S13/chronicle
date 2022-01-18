(function ($) {
    "use strict";


    $(document).ready(function($){
        $(".logo-carousel-inner").owlCarousel({
            items: 4,
            loop: true,
            autoPlay: true,
            autoPlaySpeed: 5000,
            autoPlayTimeout: 5000,
            autoPlayHoverPause: true,
            margin: 30,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:2,
                    nav:false
                },
                1000:{
                    items:4,
                    nav:false,
                    loop:true
                }
            }
        });


    });

    jQuery(window).on("load",function(){
        jQuery(".loader").fadeOut(300);
    });

}(jQuery));
