/*
This is The Great Morse Translator

* Translate Morse both ways!
* copy the code!
* Great UI to learn Morse!

*/

//this is the encoding function
function encode() {
// Here are the original values of every letter
	let A = ('.-');
	let B = ('-...');
	let C = ('-.-.');
	let D = ('-..');
	let E = ('.');
	let F = ('..-.');
	let G = ('--.');
	let H = ('....');
	let I = ('..');
	let J = ('.---');
	let K = ('-.-');
	let L = ('.-..');
	let M = ('--');
	let N = ('-.');
	let O = ('---');
	let P = ('.--.');
	let Q = ('--.-');
	let R = ('.-.');
	let S = ('...');
	let T = ('-');
	let U = ('..-');
	let V = ('...-');
	let W = ('.--');
	let X = ('-..-');
	let Y = ('-.--');
	let Z = ('--..');

	//this is the list which will be displayed
	let lis = [];
	let A1;

	//here we take input
	const inp = document.getElementById('text').value;
 
	// so this loop will go through the input and produce our morse
	for (let i = 0; i < inp.length; i++) {
		if (inp[i] == 'A' || inp[i] == 'a') {
			A1 = A;
		}
		else if(inp[i] == 'B' || inp[i] == 'b'){
			A1 = B;
		}
		else if(inp[i] == 'C' || inp[i] == 'c'){
			A1 = C;
		}
		else if(inp[i] == 'D' || inp[i] == 'd'){
			A1 = D;
		}
		else if(inp[i] == 'E' || inp[i] == 'e'){
			A1 = E;
		}
		else if(inp[i] == 'F' || inp[i] == 'f'){
			A1 = F;
		}
		else if(inp[i] == 'G' || inp[i] == 'g'){
			A1 = G;
		}
		else if(inp[i] == 'H' || inp[i] == 'h'){
			A1 = H;
		}
		else if(inp[i] == 'I' || inp[i] == 'i'){
			A1 = I;
		}
		else if(inp[i] == 'J' || inp[i] == 'j'){
			A1 = J;
		}
		else if(inp[i] == 'K' || inp[i] == 'k'){
			A1 = K;
		}
		else if(inp[i] == 'L' || inp[i] == 'l'){
			A1 = L;
		}
		else if(inp[i] == 'M' || inp[i] == 'm'){
			A1 = M;
		}
		else if(inp[i] == 'N' || inp[i] == 'n'){
			A1 = N;
		}
		else if(inp[i] == 'O' || inp[i] == 'o'){
			A1 = O;
		}
		else if(inp[i] == 'P' || inp[i] == 'p'){
			A1 = P;
		}
		else if(inp[i] == 'Q' || inp[i] == 'q'){
			A1 = Q;
		}
		else if(inp[i] == 'R' || inp[i] == 'r'){
			A1 = R;
		}
		else if(inp[i] == 'S' || inp[i] == 's'){
			A1 = S;
		}
		else if(inp[i] == 'T' || inp[i] == 't'){
			A1 = T;
		}
		else if(inp[i] == 'U' || inp[i] == 'u'){
			A1 = U;
		}
		else if(inp[i] == 'V' || inp[i] == 'v'){
			A1 = V;
		}
		else if(inp[i] == 'W' || inp[i] == 'w'){
			A1 = W;
		}
		else if(inp[i] == 'X' || inp[i] == 'x'){
			A1 = X;
		}
		else if(inp[i] == 'Y' || inp[i] == 'y'){
			A1 = Y;
		}
		else if(inp[i] == 'Z' || inp[i] == 'z'){
			A1 = Z;
		}
		// '/' means a space in morse
		else if(inp[i] == ' ' || inp[i] == '_'){
			A1 = '/';
		}
		else if(inp[i] == '\n'){
			A1 = '/';
		}
		else if(inp[i] == '.'){
			A1 = '/';
		}
		else if(inp[i] == '~'){
			A1 = '~';
		}
		else if(inp[i] == '-'){
			A1 = '-';
		}
		else if(inp[i] == ')'){
			A1 = ')';
		}
		else if (inp[i] == '/') {
			A1 = '/';
		}
		else if(inp[i] == ':'){
			A1 = ':';
		}
		lis.push(A1);	
	}
	
	//here we create the output from the list
	let output = '';
	for (let io = 0; io < lis.length; io++) {
		const ele = lis[io];
		output = output + " " + ele;
	}

	//here we display the output
	document.getElementById('out').innerHTML = output;
}

//this is the decoding function
function decode() {
	//this is the object containing original values of letters
	let arr = { '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y', '--..': 'Z', '/': ' '} 
	
	//this is input
	const inp = document.getElementById('text').value;
	let lst = inp.split(' ');

	//this will be our output
	let output = '';

	//this loop converts and do most of the job
	for (let i = 0; i < lst.length; i++) {
		const ele = lst[i];
		if (arr[ele] !== undefined) {
			output = output + arr[ele];
		}
		else{}
	}	

	//here we display our output
	document.getElementById('out').innerHTML = output;

}

// functioning buttons to switch b/w encoding and decoding
function enc() {
	document.getElementById('text').setAttribute('oninput', 'encode()');
	document.getElementById('text').setAttribute('placeholder', 'Enter your text');
	document.getElementById('text').value = '';
	document.getElementById('enc').style.background = 'white';
	document.getElementById('enc').style.color = 'black';
	document.getElementById('dec').style.background = 'black';
	document.getElementById('dec').style.color = 'white';
	document.getElementById('dec').style.border = '2px solid white';
	document.getElementById('scop').innerHTML = 'Copy Code';

}
function dec() {
	document.getElementById('text').setAttribute('oninput', 'decode()');
	document.getElementById('text').setAttribute('placeholder', 'Enter your morse');
	document.getElementById('text').value = '';
	document.getElementById('dec').style.background = 'white';
	document.getElementById('dec').style.color = 'black';
	document.getElementById('enc').style.background = 'black';
	document.getElementById('enc').style.color = 'white';
	document.getElementById('enc').style.border = '2px solid white';
	document.getElementById('scop').innerHTML = 'Copy Text';

}

//this is for copying the output
function copyToClipboard(element) {
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val($(element).text()).select();
	document.execCommand("copy");
	$temp.remove();
}