var upcomingSlider = function(){
    var that = this;
    this.el = $('.cards-upcoming');
    this.container = $('.cards-upcoming-wrapper');
    this.item = $('.cards-upcoming-wrapper .calendar-sm');
    this.items = [];
    this.endScrollLeft = true;
    this.endScrollRight = false;
    this.maxItemOnView = 0;

    this.init = function(){
        that.el.find($(".upcoming-button[data-direction='previous']")).prop('disabled', that.endScrollLeft);
        that.el.find($(".upcoming-button[data-direction='next']")).prop('disabled', that.endScrollRight);

        that.item.each(function(index){
            that.items.push({
                index: index,
                id: $(this).data("id"),
                posX: $(this).position().left,
                active: $(this).attr("is-active") == 'true' ? true : false,
            });
        });

        var maxh = that.container.width();
        that.maxItemOnView = that.item.filter(function () {
            return $(this).position().left + $(this).width() < maxh;
        }).length;

        console.table(that.items);
    }
    
    this.endScroll = function () {
        that.container.scroll(function(){
            var $width = that.container.outerWidth()
            var $scrollWidth = that.container[0].scrollWidth;	
            var $scrollLeft = that.container.scrollLeft();

            if($scrollWidth - $width === $scrollLeft){
                that.el.find($(".upcoming-button[data-direction='previous']")).prop('disabled', true);
            }

            if($scrollLeft===0){
                that.el.find($(".upcoming-button[data-direction='next']")).prop('disabled', true);
            }

            that.el.find($(".upcoming-button[data-direction='previous']")).prop('disabled', false);
            that.el.find($(".upcoming-button[data-direction='next']")).prop('disabled', false);
        });
    }

    this.activeDate = function (el) {
        if(el.data('id') != '1'){
            this.posX = el.position().left + 31;
        } else {
            this.posX = el.position().left + 19;
        }

        $('.cards-upcoming-wrapper .calendar-sm').each(function(){
            $(this).attr("is-active", el.data("id") === $(this).data("id"));
        });

        $(".selected-date").css("transform", "translateX("+this.posX+"px) rotate(-45deg)");
    }

    this.moveToActive = function () {
        var that = this;
        this.posX = undefined;
        this.id = undefined;
        this.maxWidth = 0;

        this.item.each(function(){
            if($(this).attr("is-active") == 'true'){
                that.posX = $(this).position().left;
                that.id = $(this).data("id");
            }
        });

        if(this.id != '1'){
            this.posX += 31;
        } else {
            this.posX += 19;
        }

        var index = that.items[that.maxItemOnView].posX;

        console.log(this.posX +"-"+ index);

        if(this.posX >= 83){
            $(".selected-date").css("transform", "translateX("+this.posX+"px) rotate(-45deg)");
            $(".selected-date").animate({
                opacity: 1,
            });
        } else {
            $(".selected-date").animate({
                opacity: 0,
            });
        }
    }

    // calculo para mover a setinha é:
    // Posição do calendario = 126
    // width do calendario + 2px das bordas / 2 == 26
    // tamanho da setinha divido por 2 10/2 == 5
    // 126 + 26 + 5 = 157px

    this.moveSlider = function (direction) {
        this.endScroll();
        this.container.animate({
            scrollLeft: direction == 'previous' ? "-=74px" : "+=74px"
        }, 400, "swing", function(){
            that.moveToActive();
        });
    }
}

var upcomingSlider = new upcomingSlider();

$(document).ready(function(){
	upcomingSlider.init();
	
	$(".upcoming-button").on("click", function(){
        upcomingSlider.moveSlider($(this).data("direction"));
    });

    $('.cards-upcoming-wrapper .calendar-sm').on("click", function(){
        upcomingSlider.activeDate($(this));
    });
});