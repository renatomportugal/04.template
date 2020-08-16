app_init('#eaeaea', [255,225,125], '.interp-block');

function app_init(color1, color2, element){
  linear_interp_init($(element), 0, 0, $(element).outerWidth(), color1, color2, 0);
  $(element).mousemove(function(e) {
    var x = e.pageX - $(this).offset().left + 1;
    linear_interp_init($(this), x, 0, $(this).outerWidth(), color1, color2, e.pageX);
  });
}

function linear_interp_init(element, xn, x0, x1, color1, color2, global_x){
  if(typeof(color1) === 'string'){
    color1 = [hexToRgb(color1).r, hexToRgb(color1).g, hexToRgb(color1).b];
  }
  if(typeof(color2) === 'string'){
    color2 = [hexToRgb(color2).r, hexToRgb(color2).g, hexToRgb(color2).b];
  }
  
  var interp_color1 = get_interp_val(x0, x1, xn, color1[0], color2[0]),
      interp_color2 = get_interp_val(x0, x1, xn, color1[1], color2[1]),
      interp_color3 = get_interp_val(x0, x1, xn, color1[2], color2[2]),
      final_color = rgbToHex(interp_color1, interp_color2, interp_color3);
      element.css('background-color', final_color);
      //element.css('box-shadow', '0 0 200px rgba(' + interp_color1 + ', ' + interp_color2 + ', ' + interp_color3 + ', 1)');
  
      $('#log').html('<b>interp-color-hex:</b> ' + final_color +'<br/><b>interp-color-rgb:</b> rgb('+interp_color1+','+interp_color2+', '+interp_color3+')<br/><b>relative-mouse-coord-x:</b> ' + xn + 'px<br/><b>global-mouse-coord-x:</b> ' + global_x + 'px');
}
  
function get_interp_val(x0, x1, xn, fx0, fx1){
  return fx0 > fx1 ? Math.floor(fx1 + (((fx0 - fx1)/(x0 - x1))*(xn-x1))) : Math.floor(fx0 + ((xn-x0)/(x1-x0))*((fx1-fx0)));
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    if(hex.length == 7){
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    }else if(hex.length == 4){
      var result = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex);
      result[1] = result[1] + result[1];
      result[2] = result[2] + result[2];
      result[3] = result[3] + result[3];
    }else{
      $('#log').html('Invalid hex variable <b>' + hex + '</b>');
    }
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}