/*playing with CSS variables and animations using JavaScript*/
(function () {
  'use strict'
  /*first we create a function that a) generates a reusable css style sheet and
  permits us adding new keyframes to it*/
  let frameStyle = document.createElement('style'),
  addKeyFrames = null;
  document.head.appendChild( frameStyle );
  if (CSS && CSS.supports && CSS.supports('animation: name')){
    addKeyFrames = function(name, frames, num_ref){
      frameStyle.sheet.insertRule (
        "@keyframes " + name + "{" + frames + "}", num_ref
      );
    }
  } else {
    addKeyFrames = function(name, frames){
      const str = name + "{" + frames + "}";
      frameStyle.sheet.insertRule("@-webkit-keyframes " + str, num_ref);
      frameStyle.sheet.insertRule("@keyframes " + str, num_ref+1);
    }    
  }

  /*we will need a random persentage to specify X and Y coordinates of fireflies,
  so let's extract it as a standalone function. The coordinates refer to the
  percentage units*/

  function generate_random_percentage () {
    const random_percentage = ((Math.random()*100).toFixed(2)).toString() + "%";
    return random_percentage;
  }
  
  /*here we set a new direction for a firefly at the end of each cycle of
  normal (i.e., not triggered by a hover) animation*/

  function set_new_direction (firefly_num_ref) {
    /*first let's get the direction point value for the current animation cycle*/
    let new_starting_point_top = getComputedStyle(document.documentElement).getPropertyValue("--firefly_end_top_position_" + firefly_num_ref);
    let new_starting_point_left = getComputedStyle(document.documentElement).getPropertyValue("--firefly_end_left_position_" + firefly_num_ref);
    /*then we set the starting point for the new animation cycle equal to
    the end poing of the previous cycle*/
    document.documentElement.style.setProperty("--firefly_starting_top_position_" + firefly_num_ref, new_starting_point_top);
    document.documentElement.style.setProperty("--firefly_starting_left_position_" + firefly_num_ref, new_starting_point_left);
    /*and finally we set a new random destination point*/
    document.documentElement.style.setProperty("--firefly_end_top_position_" + firefly_num_ref, generate_random_percentage());
    document.documentElement.style.setProperty("--firefly_end_left_position_" + firefly_num_ref, generate_random_percentage());
  }
  
  /*for animations to run smoothly we need to replace starting points for 
  fireflies a couple of times, so let's extract this block as a standalone
  function*/

  function set_new_starting_point (firefly_object_ref, firefly_num_ref) {
    const firefly_position = get_position(firefly_object_ref);
    document.documentElement.style.setProperty("--firefly_starting_top_position_" + firefly_num_ref, firefly_position.top + "px");
    document.documentElement.style.setProperty("--firefly_starting_left_position_" + firefly_num_ref, firefly_position.left + "px");
  }

  /*normal animation is the animation run while the fireflies are not called
  elsewhere by a hover event. It will be set and removed a number of times, so
  let's extract it as a separate function*/

  function set_normal_animation (firefly_object_ref, firefly_num_ref) {
    firefly_object_ref.style.animationName = 'move_animation_' + firefly_num_ref;
    firefly_object_ref.style.animationIterationCount = "infinite";
    firefly_object_ref.style.animationDuration = (Math.ceil((Math.random()*10)) + 8).toString() + "s";
  }

  /*we will be replacing animations on objects. In order to keep things clean we 
  will also be removing the existing animation prior to applying a new one*/

  function remove_animation (firefly_object_ref) {
    firefly_object_ref.style.animationName = null;
    firefly_object_ref.style.animationIterationCount = null;
    firefly_object_ref.style.animationDuration = null;
  }

  /*we need to get the objects' coordinates on the screen to stick them together
  during the animations*/

  function get_position(object_ref) {
    var rect = object_ref.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    /*here we need the objects' centers' coordinates, so a bit of math*/
    return { top: ((rect.top + scrollTop + rect.bottom)/2).toFixed(0), 
    left: ((rect.left + scrollLeft + rect.right)/2).toFixed(0) }
  }

  /*here we replace normal animation by the animation triggered by hover*/

  function set_hover_animation (hoverable_object_ref, firefly_object_ref, firefly_num_ref) {
    /*we need the hovered object position to get the new coordinates for the fireflies'
    direction*/
    const object_position = get_position(hoverable_object_ref);
    /*each firefly has 4 assigned css variables to control its potision - 2 for starting point
    and 2 for destination point. Here we set the css variables responsible for a firefly's 
    destination point equal to the potision of the hovered object that was obtained in the 
    previous step*/
    document.documentElement.style.setProperty("--firefly_end_top_position_" + firefly_num_ref, object_position.top + "px");
    document.documentElement.style.setProperty("--firefly_end_left_position_" + firefly_num_ref, object_position.left + "px");
    /*now we add the reference to the hover animation to a firefly object*/
    firefly_object_ref.style.animationName = 'hover_animation_' + firefly_num_ref;
    firefly_object_ref.style.animationIterationCount = "1";
    firefly_object_ref.style.animationDuration = "3s";
    /*when the animation ends the object will return to its initial position.
    Therefore we replace the values of css variables responsible for a firefly's initial
    position by the coordinates of the hovered object before the animation ends. 
    So a firefly will not appear outside of the button when the hover animation ends*/
    setTimeout(function() { set_new_starting_point(firefly_object_ref, firefly_num_ref); }, 2900);
  }  
  /*finally, we will stick this all together*/
  (function create_fireflies() {
    /*first we set up a random number of fireflies (the addition
    increases the minimum number of fireflies)*/
    const fireflies_number = Math.ceil((Math.random()*10)) + 6;
    for (let i = 0; i < fireflies_number; i++) {
      /*now we generate firsr set of random starting points and 
      target points for each firefly*/
      const starting_top_point = generate_random_percentage();
      const starting_left_point = generate_random_percentage();
      const end_top_point = generate_random_percentage();
      const end_left_point = generate_random_percentage();
      /*let's create css variables responsible for each firefly's starting
      and target coordinates*/
      const start_top_var_reference = ('--firefly_starting_top_position_'+i).toString();
      const start_left_var_reference = ('--firefly_starting_left_position_'+i).toString();
      const end_top_var_reference = ('--firefly_end_top_position_'+i).toString();
      const end_left_var_reference = ('--firefly_end_left_position_'+i).toString();
      /*and assing our random values to the newly created variables*/
      document.documentElement.style.setProperty(start_top_var_reference, starting_top_point);
      document.documentElement.style.setProperty(start_left_var_reference, starting_left_point);
      document.documentElement.style.setProperty(end_top_var_reference, end_top_point);
      document.documentElement.style.setProperty(end_left_var_reference, end_left_point);
      /*then we create keyframes for normal (not hover-triggered) animation for each firefly.
      A firefly's position will change from the value provided by starting point variables to the
      value provided by destination variables from frames 0 to 100 and in the meantime the firefly
      should twinkle twice. We also add z-index equal to 10 so that the fireflies fly over all
      other objects*/
      addKeyFrames(
        "move_animation_" + i,
        "0%{top: var(--firefly_starting_top_position_" + i + ") ; left: var(--firefly_starting_left_position_" +i + ") ; opacity: 1.0; z-index: 1}" +
        "15%{opacity: 1.0; z-index: 10}" +
        "25%{opacity: 0}" +
        "35%{opacity: 1.0}" +
        "50%{opacity: 1.0}" +
        "65%{opacity: 1.0}" +
        "75%{opacity: 0}" + 
        "85%{opacity: 1.0}" +
        "100%{top: var(--firefly_end_top_position_" + i+ ") ; left: var(--firefly_end_left_position_" + i + "); opacity: 1.0; z-index: 10}",
        i
      );
      /*now we add css keyframes that perform the fireflies' hover animation to the 
      reusable stylesheet. Keyframes affect a firefly's a) position; b) z-index (for 
      a firefly to 'dive under' the hovered element). A standalone keyframe is created 
      for each firefly*/
      addKeyFrames(
        "hover_animation_" + i,
        "0%{top: var(--firefly_starting_top_position_" + i + ") ; left: var(--firefly_starting_left_position_" + i + "); z-index: 10}" +
        "10%{z-index: 0}" +
        "100%{top: var(--firefly_end_top_position_" + i + ") ; left: var(--firefly_end_left_position_" + i + "); z-index: 0}",
        i
      );
      /*now we create elements serving as fireflies and assign them class, position and normal 
      animation pattern. Thereafter we append the fireflies to the container*/
      let firefly = document.createElement('SPAN');
      firefly.classList.add("firefly");
      firefly.style.top = "var(--firefly_starting_top_position_"+i +")";
      firefly.style.left = "var(--firefly_starting_left_position_"+i +")";
      set_normal_animation(firefly, i)
      document.getElementById("root").appendChild(firefly);
      /*as discussed, we want each firefly to change direction after an animation
      cycle ends*/
      firefly.addEventListener("animationiteration", function() {
        set_new_direction(i);
      });    
    }

  })();
  /*now we assign hover events to the buttons*/
  const buttons = document.querySelectorAll(".button");
  const j = buttons.length;
  const fireflies = document.querySelectorAll(".firefly");
  const l = fireflies.length;
  for (let i = 0; i < j; i++) {
    buttons[i].addEventListener("mouseenter", function() {
      for (let k = 0; k < l; k++) {
        set_new_starting_point(fireflies[k], k);
        remove_animation(fireflies[k]);      
        set_hover_animation(buttons[i], fireflies[k], k);
      }
    });
    buttons[i].addEventListener("mouseleave", function() {
      for (let m = 0; m < l; m++) {
        set_new_starting_point(fireflies[m], m);
        remove_animation(fireflies[m]);
        set_new_direction(m);      
        set_normal_animation(fireflies[m], m);
      }
    });
  }  
})();