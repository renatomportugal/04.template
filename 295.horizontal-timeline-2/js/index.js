$.getJSON('http://www.matterhornparadise.ch/newsfeed/get/baucamjson?id=61507&year=2016&month=05&day=25', function(data) {
  console.log(data);
});

var images = {
  '9': 'http://cdn.grumpycats.com/wp-content/uploads/2016/02/12654647_974282002607537_7798179861389974677_n-758x758.jpg',
  '11': 'https://pbs.twimg.com/profile_images/616542814319415296/McCTpH_E.jpg',
  '18': 'https://i.telegraph.co.uk/multimedia/archive/03481/Grumpy_Cat__3481823b.jpg',
  '23': 'http://static2.businessinsider.com/image/511d104a69bedd1f7c000012/grumpy-cat-still-hates-everyone-at-south-by-southwest.jpg',
  '13': 'http://www.littlethings.com/wp-content/uploads/2014/07/post-10220-Smiling-Grumpy-Cat-o0aJ.jpeg',
  '8': 'https://i.telegraph.co.uk/multimedia/archive/03481/Grumpy_Cat__3481823b.jpg',
};

function formatTime(time) {
  time = time + '';
  if (time.length === 2) {
    return time + ':00';
  } else {
    return '0' + time + ':00';
  }
}

function initBaucam(imgJson, baucamLength) {
  var numberImgs = Object.keys(imgJson).length;
  var timeLineLength = 600;
  var timeLineDistance = timeLineLength / numberImgs;

  var timePoints = [];
  for (var time in imgJson) {
    timePoints.push({
      time: parseInt(time),
      imgPath: imgJson[time],
    });
  }

  timePoints.sort(function(a, b) {
    return a.time > b.time;
  });

  timePoints.map(function(point, index, arr) {
    if (arr[index - 1]) {
      var distanceFromPrev = point.time - arr[index - 1].time;
      if (arr[index - 1].distFromPrev) {
        distanceFromPrev += arr[index - 1].distFromPrev;
      }
      point.distFromPrev = distanceFromPrev;
      return point;
    } else {
      point.distFromPrev = 0;
      return point;
    }
  });

  var lastPoint = timePoints[timePoints.length - 1];
  timeLineDistance = timeLineLength / lastPoint.distFromPrev;

  timePoints.map(function(point) {
    point.distance = point.distFromPrev * timeLineDistance;
    return point;
  });

  var timeLine = $('.baucam__time-points');

  timePoints.forEach(function(point, index) {
    var pointMarkup = $('<li><a href="#0" data-index="' + index + '" data-time="' + point.time + '">' + formatTime(point.time) + '</a></li>');
    
    if (index === 0) {
      pointMarkup.find('a').addClass('selected');
    }
    
    pointMarkup.find('a').css('left', point.distance + 'px');
    timeLine.append(pointMarkup);
  });

  return timePoints;
}

var timePoints = initBaucam(images, 600);
var images = [];

function preloadImgs(index) {
  for (var i = 0; i < 3; i++) {
    if (timePoints[index + i]) {
      images[i] = new Image();
      images[i].src = timePoints[index + i].imgPath;
      appendImg(index + i);
    }
  }
}

function updateVisibleContent(event, timeline) {
  
  var contentPoints = timeline.find('.baucam-content li');
  
  var eventTime = event.data('time');
  contentPoints.removeClass('selected');
  var selectedContent = $('.baucam-content').find('[data-time="' + eventTime + '"]');
  selectedContent.addClass('selected');
}

function appendImg(idx) {
  var img = timePoints[idx];
  
  if (!img.appended) {
    var imgTag = $('<li data-time="' + img.time + '"><img src="' + img.imgPath + '"/></li>');
    if (idx === 0) {
      imgTag.addClass('selected');
    }
    $('.baucam-content ol').append(imgTag);
    img.appended = true;
  }
}

jQuery(document).ready(function($) {
  var timeline = $('.horizontal-timeline');
  var timeLineComponents = {};

  timeLineComponents['timePointsList'] = timeline.find('.baucam__time-points');
  timeLineComponents['timePoints'] = timeLineComponents['timePointsList'].find('a');
  timeLineComponents['contentPoints'] = timeline.find('.baucam-content li');
  
  preloadImgs(0);

  timeLineComponents['timePointsList'].on('click', 'a', function(event) {
    event.preventDefault();
    timeLineComponents['timePoints'].removeClass('selected');
    $(this).addClass('selected');
    updateVisibleContent($(this), timeline);
    preloadImgs(parseInt($(this).data('index')));
  });
});