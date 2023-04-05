window.chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(231,233,237)'
};

var now = moment();
var dataTime1 = moment("2016-12-18T14:58:54.026Z");
var dataTime2 = moment("2017-01-18T20:58:54.026Z");
var dataTime3 = moment("2017-02-15T08:58:54.026Z");
var label1 =moment.duration(dataTime1.diff(now)).humanize(true);
var label2 =moment.duration(dataTime2.diff(now)).humanize(true);
var label3 =moment.duration(dataTime3.diff(now)).humanize(true);

var color = Chart.helpers.color;
var config = {
  type: 'radar',
  data: {
    labels: [
      "Deep knowledge", "Deep understanding", "Problematic knowledge","Higher-order thinking", "Metalanguage", "Substantive communication"],
    datasets: [{
      label: "Average Coding",
      backgroundColor: color(window.chartColors.orange).alpha(0.2).rgbString(),
      borderColor: window.chartColors.red,
      pointBackgroundColor: window.chartColors.red,
      data: [3.7,3,1.6,2.6,2.5,2.9],
    }, {
      label: "My Coding",
      backgroundColor: color(window.chartColors.blue).alpha(0.2).rgbString(),
      borderColor: window.chartColors.blue,
      pointBackgroundColor: window.chartColors.blue,
      data: [4,4,3,2,4,5],
    } ]
  },
  options: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Intellectual Quality'
    },
    scale: {
      ticks: {
        display: false,
        beginAtZero: true
      },
    },
    tooltips:{
      enabled:true
    },
  }
};
window.onload = function() {
  window.myRadar = new Chart(document.getElementById("canvas"), config);
};
var colorNames = Object.keys(window.chartColors);