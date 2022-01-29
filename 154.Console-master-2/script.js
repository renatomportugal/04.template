(function  () {

    /*
    Create the object with the info about me.
     */
        
    // A global. Like a badass
    window.Stefan = {};

    Stefan.presentation = function() {
        return 'Hi, I\'m Stefan. This is my site and I have no idea what to do with it.';
    };

    Stefan.age = 22;

    Stefan.location = {};
    Stefan.location.city = 'Arvika';
    Stefan.location.country = 'Sweden';

    Stefan.work = 'Web developer at Ord&Bild Reklambyrå';

    Stefan.interests = '["Web development", "Sports", "Apple"]';

    Stefan.skills = '["HTML", "CSS", "Javascript", "jQuery", "PHP", "MySQL", "CodeIgniter", "Laravel", "Wordpress", "Drupal", "Facebook API", "Twitter API", "LinkedIn API", "Google Maps API", "YouTube API", "Instagram API", "Responsive Web Design", "Regular Expressions", "jQuery Mobile", "Photoshop", "Illustrator", "InDesign", "Flash", "Git"]';

    Stefan.learning = '["Backbone.js", "Ruby", "Ruby On Rails", "Sinatra"]';

    //Stefan.contact.email

    Stefan.contact = {
        email : 'info@stefanledin.se',
        twitter : '@stefanledin',
        linkedin : 'http://www.linkedin.com/pub/stefan-ledin/34/973/6ba',
        github : 'https://github.com/stefanledin'
        // Facebook? Add me as a friend if you're a hot girl =)
    };

    /*
    All the functions
     */
    
    // Cache the elements
    var el = {
        $autocomplete : $('#autocomplete'),
        $console : $('#console'),
        $input : $('input')
    };

    // Valid commands to type in the console
    var commands = [
        'stefan.presentation()',
        'stefan.age',
        'stefan.location',
        'stefan.location.city',
        'stefan.location.country',
        'stefan.work',
        'stefan.interests',
        'stefan.skills',
        'stefan.learning',
        'stefan.contact',
        'stefan.contact.email',
        'stefan.contact.twitter',
        'stefan.contact.linkedin',
        'stefan.contact.github',
        'clear()',
        'stefan'
    ];



    /*
    Autocomplete
     */
    var arrowDownCount = 0;
    function autoComplete (value, e) {
        // Create a regexp with the value from the input
        var regexp = new RegExp('^'+value, 'g');
        
        // Remove all current <li> from the <ul>
        el.$autocomplete.html('');
        
        // Loop through the commands-array
        for (var i = 0; i < commands.length; i++) {
            if ( value.length != 0 && commands[i].search(regexp) != '-1' ) {
                el.$autocomplete.append('<li>'+commands[i]+'</li>');
            }
        };
        
        // Cache the suggestions
        var suggestions = el.$autocomplete.find('li');
        
        // If the user hits arrowdown
        if (e.keyCode === 40) {
            if (arrowDownCount === suggestions.length) {
                arrowDownCount = 0;
            }
            arrowDownCount = arrowDownCount+1;

            $('li.active-autocomplete').removeClass('active-autocomplete');
            $(suggestions[arrowDownCount-1]).addClass('active-autocomplete');
            
        }
        // If the user hits arrowup
        if (e.keyCode === 38) {
            if (arrowDownCount === 1) {
                arrowDownCount = suggestions.length;
            } else {
                arrowDownCount = arrowDownCount-1;
            }

            $('li.active-autocomplete').removeClass('active-autocomplete');
            $(suggestions[arrowDownCount-1]).addClass('active-autocomplete');

        }

        if (e.keyCode === 13 && arrowDownCount != 0) {
            return $(suggestions[arrowDownCount-1]).text();
        }
        
    }

    /*
    Write stuff on the site
     */
    var errors = 0;
    function executeCommand (value) {
        arrowDownCount = 0;
        var arrCheck = $.inArray( value, commands );
        
        switch (arrCheck) {
            // Stefan.presentation()
            case 0:
                el.$console.append('<li><span class="command">Stefan.presentation()</span><br>'+Stefan.presentation()+'</li>');                                    
            break;
            // Stefan.age
            case 1:
                el.$console.append('<li><span class="command">Stefan.age</span><br>'+Stefan.age+'</li>');
            break;
            // Stefan.location
            case 2:
                el.$console.append('<li><span class="command">Stefan.location</span><br><span class="object-name"><span class="object-icon icon-object-closed"></span>Object</span><br><span class="object-content"><span class="properties">city</span>: <span class="value">'+Stefan.location.city+'</span><br><span class="properties">country</span>: <span class="value">'+Stefan.location.country+'</span></span></li>');
                openObject();
            break;
            // Stefan.location.city
            case 3:
                el.$console.append('<li><span class="command">Stefan.location.city</span><br>'+Stefan.location.city+'</li>');
            break;
            // Stefan.location.country
            case 4:
                el.$console.append('<li><span class="command">Stefan.location.country</span><br>'+Stefan.location.country+'</li>');
            break;
            // Stefan.work
            case 5:
                el.$console.append('<li><span class="command">Stefan.work</span><br>'+Stefan.work+'</li>');
            break;
            // Stefan.interests
            case 6:
                el.$console.append('<li><span class="command">Stefan.interests</span><br><span class="array">'+Stefan.interests+'</span></li>');
            break;
            // Stefan.skills
            case 7:
                el.$console.append('<li><span class="command">Stefan.skills</span><br><span class="array">'+Stefan.skills+'</span></li>');
            break;
            // Stefan.learning
            case 8:
                el.$console.append('<li><span class="command">Stefan.learning</span><br><span class="array">'+Stefan.learning+'</span></li>');
            break;
            // stefan.contact
            case 9:
                el.$console.append('<li><span class="command">Stefan.contact</span><br><span class="object-name"><span class="object-icon icon-object-closed"></span>Object</span><br><span class="object-content"><span class="properties">email</span>: <span class="value">'+Stefan.contact.email+'</span><br><span class="properties">twitter</span>: <span class="value">'+Stefan.contact.twitter+'</span><br><span class="properties">linkedin</span>: <span class="value">'+Stefan.contact.linkedin+'</span><br><span class="properties">github</span>: <span class="value">'+Stefan.contact.github+'</span></span></li>');
                openObject();
            break;
            // Stefan.contact.email
            case 10:
                el.$console.append('<li><span class="command">Stefan.contact.email</span><br><span class="array">'+Stefan.contact.email+'</span></li>');
            break;
            // Stefan.contact.twitter
            case 11:
                el.$console.append('<li><span class="command">Stefan.contact.twitter</span><br><span class="array">'+Stefan.contact.twitter+'</span></li>');
            break;
            // Stefan.contact.linkedin
            case 12:
                el.$console.append('<li><span class="command">Stefan.contact.linkedin</span><br><span class="array">'+Stefan.contact.linkedin+'</span></li>');
            break;
            // Stefan.contact.github
            case 13:
                el.$console.append('<li><span class="command">Stefan.contact.github</span><br><span class="array">'+Stefan.contact.github+'</span></li>');
            break;
            // Clear()
            case 14:
                el.$console.html('');
            break;
            // Stefan
            case 15:
                el.$console.append('<li><span class="command">Stefan</span><br>That\'s me! Try to call the method "Stefan.presentation()"</li>');
            break;

            // Error
            default:
                el.$console.append('<li class="error">ReferenceError: '+value+' is not defined</li>');
                errors = errors +1;

        }
        if (errors === 1) {
            el.$console.append('<li>Hint: try with "Stefan"</li>');
            errors = 0;
        }
        el.$input.val('');
        el.$autocomplete.html('');
        el.$input.focus();
    }

    /*
    Bind functions to the keyup-event
     */

    el.$input.on('keyup', function(e) {
        // Store the value of the input
        var value = $(this).val().toLowerCase();
        

        // Run the autoComplete-function
        var ac = autoComplete(value, e);
        if (typeof(ac) == 'string') {
            value = ac;
            $(this).val(value); 
        }

        el.$autocomplete.find('li').on('click', function  () {
            executeCommand($(this).text());
        });
        
        
        if (e.keyCode === 13) {
            executeCommand(value);
        } 
    
    }); // on keyup

    // Must be wrapped in a function or jQuery won't find the element. .live would work, but it't deprecated and bad for performance...
    function openObject () {
        $('.object-icon').on('click', function  () {
            $(this).toggleClass('icon-object-open');
            $(this).parents('li').find('.object-content').toggle();
        });
    }

})();