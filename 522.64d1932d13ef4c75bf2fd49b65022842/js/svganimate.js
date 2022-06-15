"use strict";

$(document).ready(function() {
    // config
    var burger = $(".burger"),
        vape = $(".vape"),
        offSet1 = 3100,               //offset from top of the page for vape SVG
        offSet = 1300,                //offset from top of the page for burger SVG
        documentEl = $(document);

        svgAnimate(burger, offSet);
        svgAnimate(vape, offSet1);


        function svgAnimate(svg, offset) {

            //displays SVG on scroll when page reaches a certain point

            documentEl.on("scroll", function() {
                if (documentEl.scrollTop() > offset) {
                    svg.css("display", "inline-block");

                }

            });

        }
})
