/*  
 *  This jquery plugin is based on this blogpost - http://www.switchonthecode.com/tutorials/creating-a-roulette-wheel-using-html5-canvas
 *  If you want to know more how it works, please refer to the above tutorial. 
 *  
 *  @author Roy Yu | iroy2000 [at] gmail.com ( modify, repackage and add new features )
 *  @description: This jquery plugin will create a spin wheel and let you to add players at run time. 
 *  Please go to my blog for demo - http://iroylabs.blogspot.com/2011/06/latest-jquery-plugin.html
 */


(function($){
    $.fn.spinwheel = function(options, callback){
        
        var params = $.extend({},$.fn.spinwheel.default_options, options), $that = $(this), ctx = null, colorCache = [],
        startAngle = 0, arc = Math.PI / 6, spinTimeout = null, spinArcStart = 10, spinTime = 0, spinTimeTotal = 0, spinAngleStart = 0, pplLength = 12, pplArray = params.pplArray;

        if($.isFunction(options)){
            callback = options;
            options = {};
        } 
        
        var methods = {
            init: function() {
                methods.getContext();
                methods.setup();
                drawWheel();                
            },       
            setup: function() {
                $(params.spinTrigger).bind('click', function(e){
                    e.preventDefault();
                    methods.spin();
                });
                                              
                $(params.addPplTrigger).bind('click', function(e){
                    e.preventDefault();
                    var item = $('<li />').append($(params.joiner).val());
                    $(params.paricipants).append(item);
                    methods.updatePanel();
                });
                
                
            },            
            getContext: function() {         
                if(ctx !== null)
                    return ctx;

                var canvas = $that[0];
                ctx = canvas.getContext("2d");          
            },
            spin: function() {
                spinAngleStart = Math.random() * 10 + 10;
                spinTime = 0;
                spinTimeTotal = Math.random() * 3 + 4 * 1000;
                rotateWheel();                
            },
            updatePanel: function() {
                var $ppl = $(params.paricipants).children();  
                pplArray = [];
                $ppl.each(function(key, value){
                    pplArray.push(value.innerHTML);
                });
                arc = 2 * Math.PI / $ppl.length;
                pplLength = $ppl.length;
                drawWheel();
            }
        }
                                     
        function genHex(){
            var colors=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"], color = "", digit = [], i;

            for (i=0;i<6;i++){
                digit[i]=colors[Math.round(Math.random()*14)];             
                color = color+digit[i];     
            }   
            
            if($.inArray(color, colorCache) > -1){
                genHex();
            } else {
                colorCache.push('#'+color);
                return '#'+color;
            }
        }
        
       var rotateWheel = function rotateWheel() {
                spinTime += 30;
                if(spinTime >= spinTimeTotal) {
                    stopRotateWheel();
                    return;
                }

                var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
                startAngle += (spinAngle * Math.PI / 180);
                drawWheel();
                spinTimeout = setTimeout(rotateWheel, 30);
        }
        
        function stopRotateWheel () {
                clearTimeout(spinTimeout);
                var degrees = startAngle * 180 / Math.PI + 90;
                var arcd = arc * 180 / Math.PI;
                var index = Math.floor((360 - degrees % 360) / arcd);
                ctx.save();
                ctx.font = params.resultTextFont;
                var text = pplArray[index];
                $(params.winnerDiv).html(text).show();
                //ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
                ctx.restore();
            }         
        
        function drawArrow() {
            ctx.fillStyle = params.arrowColor;
            ctx.beginPath();
            ctx.moveTo(250 - 4, 250 - (params.outterRadius + 15));
            ctx.lineTo(250 + 4, 250 - (params.outterRadius + 15));
            ctx.lineTo(250 + 4, 250 - (params.outterRadius - 15));
            ctx.lineTo(250 + 9, 250 - (params.outterRadius - 15));
            ctx.lineTo(250 + 0, 250 - (params.outterRadius - 23));
            ctx.lineTo(250 - 9, 250 - (params.outterRadius - 15));
            ctx.lineTo(250 - 4, 250 - (params.outterRadius - 15));
            ctx.lineTo(250 - 4, 250 - (params.outterRadius + 15));
            ctx.fill();               
        }
        
        function drawWheel() {
            ctx.strokeStyle = params.wheelBorderColor;
            ctx.lineWidth = params.wheelBorderWidth;
            ctx.font = params.wheelTextFont;            
            ctx.clearRect(0,0,500,500);
            var text = null, i = 0, totalJoiner = pplLength;
            for(i = 0; i < totalJoiner; i++) {
                text = pplArray[i];           
                var angle = startAngle + i * arc;                
                ctx.fillStyle = colorCache.length > totalJoiner ? colorCache[i] : genHex();
                
                ctx.beginPath();
                // ** arc(centerX, centerY, radius, startingAngle, endingAngle, antiClockwise);
                ctx.arc(250, 250, params.outterRadius, angle, angle + arc, false);
                ctx.arc(250, 250, params.innerRadius, angle + arc, angle, true);
                ctx.stroke();
                ctx.fill();
        
                ctx.save();
                ctx.shadowOffsetX = -1;
                ctx.shadowOffsetY = -1;
                ctx.shadowBlur    = 1;
                ctx.shadowColor   = params.wheelTextShadowColor;
                ctx.fillStyle = params.wheelTextColor;
                ctx.translate(250 + Math.cos(angle + arc / 2) * params.textRadius, 250 + Math.sin(angle + arc / 2) * params.textRadius);
                ctx.rotate(angle + arc / 2 + Math.PI / 2);
                
                ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                ctx.restore();
                ctx.closePath();
            }       
            drawArrow();
        }          
  
        function easeOut(t, b, c, d) {
            var ts = (t/=d)*t;
            var tc = ts*t;
            return b+c*(tc + -3*ts + 3*t);
        } 
                
        methods.init.apply(this,[]);
    }
    
    /*  ---  please look at the index.html source in order to understand what they do ---
     *  outterRadius : the big circle border
     *  innerRadius  : the inner circle border
     *  textRadius   : How far the the text on the wheel locate from the center point
     *  spinTrigger  : the element that trigger the spin action 
     *  wheelBorderColor : what is the wheel border color
     *  wheelBorderWidth : what is the "thickness" of the border of the wheel
     *  wheelTextFont : what is the style of the text on the wheel
     *  wheelTextColor : what is the color of the tet on the wheel
     *  wheelTextShadow : what is the shadow for the text on the wheel
     *  resultTextFont : it is not being used currently
     *  arrowColor : what is the color of the arrow on the top
     *  participants : what is the container for participants for the wheel
     *  joiner : usually a form input where user can put in their name
     *  addPplTrigger : what element will trigger the add participant
     *  winDiv : the element you want to display the winner
     */
    $.fn.spinwheel.default_options = {
        outterRadius:200, innerRadius:3, textRadius: 160, spinTrigger: '.spin-trigger', 
        wheelBorderColor: 'black',wheelBorderWidth : 3, wheelTextFont : 'bold 15px sans-serif', wheelTextColor: 'black', wheelTextShadowColor : 'rgb(220,220,220)',
        resultTextFont : 'bold 30px sans-serif', arrowColor :'black', paricipants:'.participants', addPplTrigger:'.add', joiner:'.joiner', winnerDiv:'.winner'
    }
})(jQuery);

