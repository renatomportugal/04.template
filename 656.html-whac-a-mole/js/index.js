const checkbox = document.querySelectorAll('input[type=checkbox]')

let score = 0;

function updateScore(type){
	if(type == '+'){
		score += 10;
	} else if (type == '-'){
		if(score > 0){
			score -=10;
		}
	}
	if(score == 0){
		document.querySelector('#score').innerText = '000'
	} else if(score.toString().length<3){
		document.querySelector('#score').innerText = '0' + score;
	} else {
		document.querySelector('#score').innerText = score;
	}
}

for(let i=0;i<checkbox.length;i++){
	checkbox[i].addEventListener('change',function(){
		console.log(!!this.getAttribute('isOutside'))
		if(!!this.getAttribute('isOutside')){
			this.removeAttribute('isOutside');
			this.checked = true;
			this.parentNode.classList.add('get')
			setTimeout(() => {
				this.parentNode.classList.remove('get')
			}, 150);
			updateScore('+')
		} else {
			this.checked = false;
			this.parentNode.classList.add('miss')
			setTimeout(() => {
				this.parentNode.classList.remove('miss')
			}, 150);
			// updateScore('-')
		}
		
	})
}

function getRandomCheckbox(){
	return Math.floor(Math.random() * Math.floor(checkbox.length));
}

function triggerCheckbox(i){
	if(checkbox[i].indeterminate == false && checkbox[i].checked == false){
			checkbox[i].checked = true;
			checkbox[i].setAttribute('isOutside','true');
		setTimeout(() => {
			if(checkbox[i].getAttribute('isOutside') == 'true'){
				updateScore('-');
				checkbox[i].parentNode.classList.add('miss');
				setTimeout(() => {
					checkbox[i].parentNode.classList.remove('miss')
				}, 150);
			}
			checkbox[i].removeAttribute('isOutside');
			checkbox[i].checked = false;
		}, 700);
	}
}

function startGame(){
	if(isGameStarted == true){
		score = 0;
		document.querySelector('#stop').style.display = "block";
		document.querySelector('#start').style.display = "none";
		timer(30)
	}else{
		document.querySelector('#start').style.display = "block";
		document.querySelector('#stop').style.display = "none";
		document.querySelector('#timer .seconds').innerText = '30';
		document.querySelector('#alert .score').innerText = document.querySelector('#score').innerText;
		document.querySelector('#score').innerText = '000';
		document.querySelector('#alert').classList.add('show');
	}
	let loop = setInterval(() => {
		if(isGameStarted == true){
			triggerCheckbox(getRandomCheckbox());
		} else {
			clearInterval(loop);
		}
	}, 1200);	
}

let isGameStarted = false;

document.querySelector('#start').addEventListener('click',function(){

	isGameStarted = true;
	startGame();
})

document.querySelector('#stop').addEventListener('click',function(){
	isGameStarted = false;
	startGame();
})

function timer(start){
	let loop = setInterval(() => {
		if(isGameStarted == true){
			if(start>0){
				start-=1;
				// console.log(start);
				if(start.toString().length<2){
					document.querySelector('#timer .seconds').innerText = '0' + start;
				} else {
					document.querySelector('#timer .seconds').innerText = start;
				}
			} else {
				isGameStarted = false;
				startGame();
			}	
		} else {
			clearInterval(loop);
		}
	}, 1000);	
}


document.querySelector('#alert button').addEventListener('click',function(){
	document.querySelector('#alert').classList.remove('show');
})