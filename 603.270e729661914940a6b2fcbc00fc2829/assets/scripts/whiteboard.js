var can_2, cc_2

const w = $("#whiteboard")

paint = new Array()

init_2 = () => {
  can_2 = document.getElementById("whiteboard")
  cc_2 = can_2.getContext("2d")
  can_2.width = w.width()
  can_2.height = w.height()
  m_fps = 0
  old_fps = 0
  fps = setInterval(rFPS, 1000)
  pageX = -3
  pageY = -3
  draw = false
  int_draw()
  int_fall()
}

$(".frame").dblclick(function() {
  if (whiteboard == false) {
    $(".wall:nth-child(3)").toggleClass("revert")
    $(".frame").animate({
      width: "90%"
    }, 1000)
    $(".pic").each(function(i) {
      $(this).fadeOut(1000)
    })
    whiteboard = true
  } else if (whiteboard == true) {
    $(".wall:nth-child(3)").toggleClass("revert")
    $(".frame").css({
      width: "40vh",
    })
    $(".pic").each(function(i) {
      $(this).fadeIn(1000, function() {
        $(".paint").remove()
      })
    })
    whiteboard = false
  }
})

int_draw = () => {
  can_2.width = w.width()
  can_2.height = w.height()
  if (draw == true && whiteboard == true) {
    cc_2.clearRect(0, 0, can_2.width, can_2.height)
    var pX = pageX
    var pY = pageY
    paint.push([pX, pY, 1, "cyan", "cyan", Math.floor(Math.random() * 15)+5])
    for (i=0; i<paint.length; i++) {
      drawPaint(paint[i][0], paint[i][1], paint[i][2]+Math.floor(Math.random() * 2)+1, paint[i][3], paint[i][4])
    }
    drawText()
  }
  window.requestAnimationFrame(int_draw)
}

int_fall = () => {
  m_fps++
  if (draw == false && whiteboard == true) {
    cc_2.clearRect(0, 0, can_2.width, can_2.height)
    for (i=0; i<paint.length; i++) {
      drawPaint(paint[i][0], paint[i][1]+= paint[i][5], paint[i][2]+Math.floor(Math.random() * 2)+1, paint[i][3], paint[i][4])
    }
    drawText()
  }
  window.requestAnimationFrame(int_fall)
}

drawPaint = (sX, sY, rad, fC, sC) => {
  cc_2.fillStyle = fC
  cc_2.beginPath()
  cc_2.arc(sX, sY, rad, 0, Math.PI*2, true)
  cc_2.shadowBlur = 50
  cc_2.shadowColor = sC
  cc_2.fill()
}

rFPS = () => {
  old_fps = 0
  old_fps = m_fps
  if (old_fps < 29) {
    paint = []
  } else if(paint.length > 1000) {
    paint = []
  }
  if (old_fps > 60) {
    old_fps = 60+"+"
  }
  m_fps = 0
}

drawText = () => {
  cc_2.font = "20px Arial"
  cc_2.fillStyle = "cyan"
  cc_2.shadowBlur = 0
  cc_2.fillText(old_fps,can_2.width - 38,30)
}

w.mousedown(() => {
  w.mousemove((e) => {
    pageX = e.pageX - w.offset().left
    pageY = e.pageY - w.offset().top
  })
  paint = []
  draw = true
})

w.mouseup(() => {
  draw = false
})

$(document).ready(() => {
  init_2()
})
