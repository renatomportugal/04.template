// ES6 imports! via webpack!
import { getNodes } from "./helpers"; 

// IIFE for protection
(function() {
  
  // Table of contents for what this file does
  function init() {
    setUpPopUpVideo();
    setUpServiceWorker();
  }
  
  function setUpPopUpVideo() {
      
    let videoButton = document.querySelector("[data-popup]");
    videoButton.addEventListener("click", function(e) {
      e.preventDefault();
      
      // This is just convienent. Rather than document.createElement.
      let videoHTML = getNodes(`
        <div class="modal" id="modal">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/tzD9BkXGJ1M" frameborder="0" allowfullscreen></iframe>
        </div>
      `);

    	// This could be multiple nodes, but we know we only have one so we'll skip the loop.
      document.body.appendChild(videoHTML[0]);
      
      // WEIRD TRICK, there is already a global `modal`.
      // let modal = document.querySelector("#modal");
      modal.addEventListener("click", function() {
        document.body.removeChild(modal);
      });
      
    });
  }
  
  function setUpServiceWorker() {
    // ServiceWorker is a progressive technology. Ignore unsupported browsers
    if ('serviceWorker' in navigator) {
      console.log('CLIENT: service worker registration in progress.');
      navigator.serviceWorker.register('/service_worker.js').then(function(registration) {
        console.log('CLIENT: service worker registration complete with scope: ', registration.scope);
      }, function() {
        console.log('CLIENT: service worker registration failure.');
      });
    } else {
      console.log('CLIENT: service worker is not supported.');
    }
  }
  
  init();
  
}());