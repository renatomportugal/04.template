var can_1, cc_1

const star_amount = 200

stars = new Array()

init = () => {
  can_1 = document.getElementById("stars")
  cc_1 = can_1.getContext("2d")
  can_1.width = dW
  can_1.height = dH
  genStars()
}

genStars = () => {
  for (i=0; i<star_amount; i++) {
    let b = [
      [Math.random() * can_1.height, Math.random() * -dW*2]
    ]
    stars.push([b[Math.floor(Math.random() * b.length)][1], b[Math.floor(Math.random() * b.length)][0], 1, 1, Math.floor(Math.random() * 15)+1])
    if (i == star_amount-1) {
      drawAll()
    } 
  }
}

drawAll = () => {
  can_1.width = dW
  can_1.height = dH
  cc_1.clearRect(0, 0, can_1.width, can_1.height)
  for (i=0; i<stars.length; i++) {
    if (stars[i][0] > dW) {
      stars[i][0] = -1
    }
    drawStars(stars[i][0]+= stars[i][4], stars[i][1], stars[i][2], "rgba(255,255,255,"+stars[i][3]+")")
  }
  window.requestAnimationFrame(drawAll)
}

drawStars = (sX, sY, rad, fC) => {
  cc_1.fillStyle = fC
  cc_1.beginPath()
  cc_1.arc(sX, sY, rad, 0, Math.PI*2, true)
  cc_1.fill()
}

$(document).ready(() => {
  init()
})
