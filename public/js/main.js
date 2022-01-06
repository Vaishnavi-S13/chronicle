
(function ($) {
    "use strict";
    jQuery(window).on("load",function(){
        jQuery(".loader").fadeOut(1000);
    });
}(jQuery));


// home js


   const menuToggle = document.querySelector('.toggle');
   const showcase = document.querySelector('.showcase');

   menuToggle.addEventListener('click', () => { menuToggle.classList.toggle('active'); showcase.classList.toggle('active');})
