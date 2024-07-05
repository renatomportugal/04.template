let ph = document.getElementById('picHandler');
let video = document.getElementById('video');
var ua = navigator.userAgent.toLowerCase();
var isSafari = ((ua.indexOf('safari')!=-1) && (ua.indexOf('chrome')  == -1));

  ph.addEventListener('click', async function() {
    ph.disabled = true;
  
    if(isSafari){
  
      video.webkitSetPresentationMode("picture-in-picture")
      
    } 
    
    await video.requestPictureInPicture();

    ph.disabled = false;
  });