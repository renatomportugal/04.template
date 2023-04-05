var ctx = document.getElementById("myRadar");
var data = [22006299, 15834918, 14919501, 14797756, 14433147, 13524139, 11877109, 11862073, 11779606, 10452000];
var labels = ["Tokyo", "Mumbai", "Mexico City", "Shanghai", "Sao Paulo", "New York", "Karachi", "Buenos Aires", "Delhi", "Moscow"];
var options = {
    responsive:true,
    maintainAspectRatio:false,
};

var myRader = new Chart(ctx,{
    type:"radar",
    data:{
      labels: labels,
      datasets:[{
        label:"Radar Graph",
        data:data,
        fill:false,
        borderWidth:1
      }]
    },
  options:options,
});