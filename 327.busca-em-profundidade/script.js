console.clear();
let grafo = [];

for (let i = 0, btns = document.querySelectorAll("button"); i < btns.length; i++) {
	btns[i].addEventListener("click", btnEvent);
}
function btnEvent() {
	mudaExemplo(this.getAttribute("data-ex-n"));
}
function mudaExemplo(n) {
	switch(Number(n)) {
		case 1:
			nodes.clear();
			nodes.add([
				{id: 0, label: 0},
				{id: 1, label: 1},
				{id: 2, label: 2},
				{id: 3, label: 3},
				{id: 4, label: 4},
				{id: 5, label: 5},
				{id: 6, label: 6},
				{id: 7, label: 7}
			]);
			
			edges.clear();
			edges.add([
				{from: 0, to: 1},
				{from: 0, to: 2},
				{from: 1, to: 3},
				{from: 2, to: 4},
				{from: 3, to: 5},
				{from: 4, to: 6},
				{from: 5, to: 7},
				{from: 6, to: 7},
			])
			break;
			
		case 2:
			nodes.clear();
			nodes.add([
				{id: 0, label: 0},
				{id: 1, label: 1},
				{id: 2, label: 2},
				{id: 3, label: 3},
				{id: 4, label: 4},
				{id: 5, label: 5},
				{id: 6, label: 6},
				{id: 7, label: 7},
				{id: 8, label: 8},
				{id: 9, label: 9},
				{id: 10, label: 10},
				{id: 11, label: 11},
			]);
			
			edges.clear();
			edges.add([
				{from: 0, to: 1},
				{from: 0, to: 2},
				{from: 0, to: 3},
				{from: 1, to: 3},
				{from: 2, to: 3},
				{from: 3, to: 11},
				{from: 4, to: 5},
				{from: 4, to: 9},
				{from: 4, to: 11},
				{from: 5, to: 6},
				{from: 5, to: 8},
				{from: 6, to: 7},
				{from: 7, to: 8},
				{from: 7, to: 10},
				{from: 8, to: 9},
				{from: 9, to: 10},
				{from: 10, to: 11}
			]);
			break;
			
		case 3:
			nodes.clear();
			nodes.add([
				{id: 0, label: 0},
				{id: 1, label: 1},
				{id: 2, label: 2},
				{id: 3, label: 3},
				{id: 4, label: 4},
				{id: 5, label: 5},
				{id: 6, label: 6},
				{id: 7, label: 7},
				{id: 8, label: 8},
				{id: 9, label: 9},
				{id: 10, label: 10},
			])
			
			edges.clear();
			edges.add([
				{from: 0, to: 1},
				{from: 0, to: 2},
				{from: 1, to: 2},
				{from: 1, to: 3},
				{from: 1, to: 4},
				{from: 2, to: 3},
				{from: 3, to: 4},
				{from: 3, to: 5},
				{from: 4, to: 6},
				{from: 5, to: 6},
				{from: 5, to: 7},
				{from: 6, to: 7},
				{from: 6, to: 8},
				{from: 6, to: 9},
				{from: 8, to: 9},
				{from: 8, to: 10},
				{from: 9, to: 10}
			]);
	}
	geraTabela();
}


// VISUALIZAÇÃO DO GRAFO
var nodes = new vis.DataSet();

// create an array with edges
var edges = new vis.DataSet();

// create a network
var container = document.getElementById('mynetwork');

// provide the data in the vis format
var data = {
	nodes: nodes,
	edges: edges
};
var options = {
	"edges": {
		"smooth": {
		  "forceDirection": "none"
		}
	},
	"physics": {
		"minVelocity": 0.75
	},
	locale: 'pt-br'
}

// initialize your network!
var network = new vis.Network(container, data, options);


// FIM DA VISUALIZAÇÃO DO GRAFO

mudaExemplo(1);

function geraTabela() {
	let nos = nodes.get(),
		ligacoes = edges.get();
	
	grafo = new Array(nos.length);
	for (let i = 0; i < grafo.length; i++)
		grafo[i] = new Array(nos.length);
	
	for (let i = 0; i < ligacoes.length; i++) {
		let from = ligacoes[i].from,
			to = ligacoes[i].to;
		
		let index_from = nos.map((ele) => ele.id).indexOf(from),
			index_to = nos.map((ele) => ele.id).indexOf(to);
		
		grafo[index_from][index_to] = 1;
		grafo[index_to][index_from] = 1;
	}
	
	tbody = document.querySelector("main section table tbody");
	tbody.innerHTML = "";
	for (let i = -1; i < grafo.length; i++) {
		let tr = document.createElement("tr");
		for (let j = -1; j < grafo.length; j++) {
			let td = document.createElement("td");
			if (i == -1 && j > -1)
				td.innerHTML = j;
			else if (i > -1 && j == -1)
				td.innerHTML = i;
			else if (i > -1 && j > -1) {
				let checkbox = document.createElement("input");
				checkbox.setAttribute("type", "checkbox");
				checkbox.setAttribute("disabled", "")
				
				if (grafo[i][j])
					checkbox.setAttribute("checked", "");
				
				td.appendChild(checkbox);
			}
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
}

let percorridos = [];
function f(n, x)  {
	if (percorridos.indexOf(n) >= 0) return false; // Já foi percorrido
	else { // Não foi percorrido
		let achou = false;
		
		grupo(n, n == x ? "⟺" : "⇎", x); // Gera a vizualização do caminho percorrido
		
		percorridos.push(n); // Registra que passou pelo nó
		if (n == x) return true; // O valor foi encontrado
		
		for (let i = 0; i < grafo[n].length && !achou; i++) {
			if (i != n && grafo[n][i] == 1) {
				achou = f(i, x); // Procurar no próximo nó
			}
		}
		
		fimGrupo();
		
		return achou;
	}
}

let grupo_alvo = document.querySelector("main section details");
function grupo() {
	let detalhe = document.createElement("details");
	detalhe.setAttribute("open", "");
	let sumario = document.createElement("summary");
	for (let i = 0; i < arguments.length; i++) {
		if (i) sumario.innerHTML += " ";
		sumario.innerHTML += arguments[i];
	}
	detalhe.appendChild(sumario);
	
	grupo_alvo.appendChild(detalhe);
	grupo_alvo = detalhe;
}
function registro() {
	for (let i = 0; i < arguments.length; i++) {
		if (i) grupo_alvo.innerHTML += " ";
		grupo_alvo.innerHTML += arguments[i];
	}
}
function fimGrupo() {
	if (grupo_alvo.parentElement.nodeName == "DETAILS")
		grupo_alvo = grupo_alvo.parentElement;
}

function calcule() {
	percorridos = [];
	grupo_alvo = document.querySelector("main section details");
	grupo_alvo.setAttribute("open", "");
	grupo_alvo.innerHTML = "<summary>Resultado</summary>";
	
	let partida = Number(document.querySelector("input[name='partida']").value);
	let valor = Number(document.querySelector("input[name='valor']").value);
	
	registro(f(partida, valor));
};

document.querySelector("main section pre code").innerHTML = ("let percorridos = [];\n"+f).replace(" {if (window.CP.shouldStopExecution(1)){break;}", "").replace("\nwindow.CP.exitedLoop(1);\n", "");