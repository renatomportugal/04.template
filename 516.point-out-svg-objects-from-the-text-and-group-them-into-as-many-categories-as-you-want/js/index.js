function mobileDevice (){ 
	return typeof window.orientation !== "undefined"
}

window.addEventListener('DOMContentLoaded',function(){
 	mobileDevice() ? initializeForMobile() : initializeForDesktop() 
	
})

function initializeForMobile(){
	var allElements=document.querySelectorAll("[pointTo],[indicated_by] ,[indicated_by] *")
	allElements.forEach(function(element) {
		element.setAttribute("mobile",true)
	})
	document.body.addEventListener('mouseup',function(){
 		allElements.forEach(function(element){
			element.removeAttribute("style")
			element.removeAttribute("textOver")
		}) 
	
	})

	document.querySelectorAll("[indicated_by]").forEach(function(element) {
		element.pointing = element.getAttribute("indicated_by").replace(/ /g, "").split(",")
		element.onclick=function(){			
			allElements.forEach(function(element){element.removeAttribute("style")})
			this.setAttribute("style","stroke-width:4px;stroke:black;stroke-dasharray:5px 5px")
			this.pointing.forEach(function(element) {
				document.querySelectorAll("[pointTo="+element+"]").forEach(function(element){
					element.setAttribute("style","background-color:green;color:white")
				})
			})			
		}
	})
	document.querySelectorAll("[pointTo]").forEach(function(element) {
		element.onclick=function(){
			allElements.forEach(function(element){element.removeAttribute("style");element.removeAttribute("textOver")})
			this.setAttribute("textOver",true)
			var searchItem= this.getAttribute("pointTo")
			document.querySelectorAll("[indicated_by]").forEach(function(element) {
					if (!element.pointing.includes(searchItem)) {
						element.setAttribute("style","fill:transparent;stroke-width:1px;stroke:black;stroke-dasharray:5px 2px")
						element.querySelectorAll("*").forEach(function(element) {
							element.setAttribute("style","fill:transparent;stroke-width:1px;stroke:black;stroke-dasharray:5px 2px")
						})
					}
			})			
		}
	})
}
function initializeForDesktop(){

	document.querySelectorAll("[indicated_by]").forEach(function(element) {	
		element.pointing = element.getAttribute("indicated_by").replace(/ /g, "").split(",")
		
		element.onmouseover = function(){
			this.setAttribute("style","stroke-width:4px;stroke:black;stroke-dasharray:5px 5px")
			this.pointing.forEach(function(element) {
				document.querySelectorAll("[pointTo="+element+"]").forEach(function(element){
					element.setAttribute("style","background-color:green;color:white")
				})
			})			
		}
		
		element.onmouseout=function(){
			this.removeAttribute("style")
			this.pointing.forEach(function(element) {			
				document.querySelectorAll("[pointTo="+element+"]").forEach(function(element){
					element.setAttribute("style","")
				})  				
			})			
		}
		
	})
	
	document.querySelectorAll("[pointTo]").forEach(function(element) {
		
		element.onmouseover = function(){
			this.setAttribute("textOver",true)
			var searchItem = this.getAttribute("pointTo")
			document.querySelectorAll("[indicated_by]").forEach(function(element) {
				if (!element.pointing.includes(searchItem)) {
					element.setAttribute("style","fill:transparent;stroke-width:1px;stroke:black;stroke-dasharray:5px 2px")
					element.querySelectorAll("*").forEach(function(element) {
						element.setAttribute("style","fill:transparent;stroke-width:1px;stroke:black;stroke-dasharray:5px 2px")
					})
				}
			})
		}
		
		element.onmouseout = function(){
			this.removeAttribute("textOver")
			document.querySelectorAll("[indicated_by]").forEach(function(element) {
				 element.removeAttribute("style")				 
				 element.querySelectorAll("*").forEach(function(element) {
						element.removeAttribute("style")
					})
			})
		}
		
	})	
}