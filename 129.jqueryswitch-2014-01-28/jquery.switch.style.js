/*
*  Copyright (c) 2013, Sandro Alves Peres
*  All rights reserved.
*
*  Date: 21/11/2013
*  http://www.zend.com/en/yellow-pages#show-ClientCandidateID=ZEND022656
*/ 

(function($){

    var default_options = {
        label_on: 'ON',
        label_off: 'OFF',
        label_size: 12,
        width: 60,
        height: 22  
    };

    var settings = {};

    var methods = {
        
        _init: function( options ) 
        {    
            settings = default_options;            
            
            if( options ) // Merge options
            {
                $.extend(settings, options);
            }             
            
            this.each(function()
            {  
                if( !$(this).is(':checkbox') )
                {
                    return;
                }
                
                // Settings
                // ************************************************************* 
                
                if( !$(this).next().hasClass('switch-style-wrapper') ) // it wasn't built yet
                {
                    var disabled = ($(this).is(':disabled') ? ' switch-style-disabled' : '');
                    
                    $(this).after(
                        '<div class="switch-style-wrapper' + disabled + '" id="jQuerySwitchStyle' + $(this).attr('id') + '" onselectstart="return false;">' +
                        '   <div class="switch-style-slide">' +
                        '       <div class="switch-style-on">' + settings.label_on + '</div>' +                        
                        '       <div class="switch-style-button"></div>' +
                        '       <div class="switch-style-off">' + settings.label_off + '</div>' + 
                        '   </div>' +
                        '</div>'
                    );

                    $(this).hide();
                }
                    
                var obj = $('#jQuerySwitchStyle' + $(this).attr('id'));
                    
                obj.width( settings.width );
                obj.height( settings.height ); 

                obj.find('.switch-style-slide *').css('font-size', settings.label_size + 'px');
                obj.find('.switch-style-slide *').css('line-height', settings.height + 'px');  

                if( $(this).is(':disabled') )
                {
                    obj.addClass('switch-style-disabled');
                }

                // Click
                // ************************************************************* 
                
                obj.unbind('click');
                obj.click(function()
                {
                    if( $(this).prev().is(':disabled') )
                    {
                        return;
                    }
                    
                    if( $(this).prev().is(':checked') ) 
                    {
                        // Turn off
                           
                        $(this).children().first().animate({left: '-6%'}, 150, 'linear', function()
                        {
                            obj.prev().removeAttr('checked');
                        });                         
                    }
                    else
                    {
                        // Turn on                                      
                        
                        $(this).children().first().animate({left: '48%'}, 150, 'linear', function()
                        {
                            obj.prev().attr('checked', 'checked');
                        });   
                    }
                });

                // MouseDown
                // ************************************************************* 
                
                obj.unbind('mousedown');
                obj.mousedown(function(ev)
                {
                    if( typeof ev.preventDefault != undefined )
                    {
                        ev.preventDefault();
                    }   
                });
                
                // Check
                // ************************************************************* 
                
                if( $(this).is(':checked') )
                {
                    $(this).switchStyle('on');
                }               
            });           
        },       
         
        on: function()
        {
            this.each(function()
            {    
                if( !$(this).is(':checkbox') )
                {
                    return;
                }                 
                
                $(this).next().children().first().animate({left: '48%'}, 150, 'linear', function()
                {
                    $(this).parent().prev().attr('checked', 'checked');
                });
            });
        },          
         
        off: function()
        {
            this.each(function()
            {    
                if( !$(this).is(':checkbox') )
                {
                    return;
                }                 
                
                $(this).next().children().first().animate({left: '-6%'}, 150, 'linear', function()
                {
                    $(this).parent().prev().removeAttr('checked');
                }); 
            });
        },          
         
        enable: function()
        {
            this.each(function()
            {    
                if( !$(this).is(':checkbox') )
                {
                    return;
                }                 
                
                $(this).removeAttr('disabled');

                if( $(this).next().is('.switch-style-wrapper') )
                {
                    $(this).next().removeClass('switch-style-disabled');
                }
            });
        },        
        
        disable: function()
        {
            this.each(function()
            {    
                if( !$(this).is(':checkbox') )
                {
                    return;
                }                 
                
                $(this).attr('disabled', 'disabled');

                if( $(this).next().is('.switch-style-wrapper') )
                {
                    $(this).next().addClass('switch-style-disabled');
                }
            });
        }
        
    };

    $.fn.switchStyle = function( method ) 
    {        
        if( typeof method == 'string' )
        {
            if( methods[method] ) 
            {
                return methods[method].call(this);
            }
            else
            {
                $.error('Method ' + method + ' does not exist on jQuery.switchStyle!');
            }
        }
        else
        {
            return methods._init.apply(this, arguments);            
        }
    };

})(jQuery);