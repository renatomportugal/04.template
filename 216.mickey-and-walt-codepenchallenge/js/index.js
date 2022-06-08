console.clear();

var paths = document.querySelectorAll('#Mouse path, mask path'); // select all mouse and mask paths
var time = 18000; // how long the drawing should last in milliseconds
var totalLength = 0; // length of all paths
paths.forEach(function(path) {
    totalLength += path.getTotalLength(); // add length of all paths
});
var offset = 0; // how far each path is from the start
paths.forEach(function(path){
    var length = path.getTotalLength(); // length of current path
    path.style.setProperty('--length',length); // set css var for path length
    var duration = length / totalLength * time; // how long the path should take to draw - percentage of total time equal to the percentage of the path's length in the total length
    path.style.setProperty('--duration',duration+'ms'); // set css var for duration
    var delay = offset / totalLength * time; // delay path drawing until previous finished
    path.style.setProperty('--delay',delay+'ms'); // set css var for offset
    offset += length; // increase offset by current path's length
})