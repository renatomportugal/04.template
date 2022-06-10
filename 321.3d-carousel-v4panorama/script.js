gsap.set('#container', {perspective:900});

const n = 20; //number of divs

for (let i=0; i<n; i++){  
  let b = document.createElement('div');  
  b.classList.add('box');
  document.getElementById('container').appendChild(b);
  
  gsap.set(b, {
    left:'50%',
  	top:'50%',
    xPercent:-50,
    yPercent:-50,
    color:'#fff',
    z:2000,
  	width:318, //adjust as needed to avoid space between divs
	  height:'110%',
    rotationY:i/n*360,
    transformOrigin:String("50% 50% -1000%"),
    backgroundImage:'url(https://assets.codepen.io/721952/pano.jpg)',
    backgroundPosition:i*-318+'px -220px'
  });  
}

window.onmousemove = (e)=>{
  gsap.to('.box', {duration:0.6, rotationY:(i)=>-180+i/n*360+360*(e.clientX/window.innerWidth) }); // TO DO: add vertical movement
}