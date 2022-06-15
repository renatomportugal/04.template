"use strict";

$(document).ready(function(){
    $(".navbar li a, .booking a").click(function(){
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
        && location.hostname == this.hostname) {
            var $hash = this.hash;
            var $target = $(this.hash);
            if ($target.length) {
                var targetOffset = $target.offset().top - 90;
                $('html,body').animate({scrollTop: targetOffset}, 1000);
                return false;
            }
        }
    });
});
