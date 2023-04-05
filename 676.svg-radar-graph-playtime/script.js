$(".sld").on("input change", function() {
  var total = -1 * this.value;
  pol = "#" + this.id.slice(0, -3) + "pol";
  dot = "#" + this.id.slice(0, -3) + "dot";
  console.log(pol);
  //   var eq = (this.value * 3.5) + 150;
  $("#out").text(total);
  var top = "500," + total + " 833, 392 706, 783 294, 783 167, 392";
  $("#overlay").attr("points", top);
  $(dot).attr("cy", total);
});

var datas = [
  {
    security: {
      q1: 10,
      q2: 15,
      q2: 25,
      q2: 50
    },
    network: {
      q1: 0,
      q2: 0,
      q2: 0,
      q2: 0
    }
  }
];

$.each(datas, function(key, data) {
  $('#datas').html('<li>' + data.security.q1 + '</li>');
});