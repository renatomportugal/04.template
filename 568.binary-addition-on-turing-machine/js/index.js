Vue.filter('binary', function (value) {
  if (!value) return ''
  return (value >>> 0).toString(2)
})

Vue.filter('decimal', function (value) {
  if (!value) return ''
  return parseInt(value, 2)
})

var Automa = {
  template: "#automa-template",
	props: ['nodes', 'order', 'currentStatus', 'currentChar'],
	computed: {
		current () {
			return this.arcs.find(arc => this.currentStatus === arc.kfrom && this.currentChar === arc.read)
			
		},
		arcs () {
			var lst = []
			this.order.forEach((o) => {
				var from = this.nodes[o]
				for (var k in from) {
					var link = from[k]
					var e = from[k].state
					var to = this.nodes[e]
					lst.push({
						kfrom: o,
						kto: e,
						read: k,
						write: link.write,
						from, to
					})
				}
			})
			lst.sort((a,b) => {
				if (a.kfrom === b.kfrom) {
					return a.read > b.read ? 1 : -1
				}
				return a.kfrom > b.kfrom ? 1 : -1
			})
			return lst
		}
	},
	watch: {
		current () {
			this.$nextTick(() => {
				var el = this.$el.querySelector('.current')
				if (el)
					el.scrollIntoView()
			})
		}
	}
}

Vue.component('automa', Automa)







// 'B': blank, undefined
// 'c': number separator
/*var addAutoma = {
	q0: {
		direction: 'right',
		'0': {
			write: 'X',
			state: 'q1',
			direction: 'right'
		},
		'C': {
			write: 'C',
			state: 'end',
			direction: undefined
		}
	},
	q1: {
		direction: 'right',
		'0': {
			write: '0',
			state: 'q1',
			direction: 'right'
		},
		'C': {
			write: 'C',
			state: 'q2',
			direction: 'right'
		}
	},
	q2: {
			direction: 'right',
		'0': {
			write: '0',
			state: 'q2',
			direction: 'right'
		},
		'B': {
			write: '0',
			state: 'q3',
			direction: 'left'
		}
	},
	q3: {
		direction: 'left',
		'0': {
			write: '0',
			state: 'q3',
			direction: 'left'
		},
		'C': {
			write: 'C',
			state: 'q4',
			direction: 'left'
		}
	},
	q4: {
		direction: 'left',
		'0': {
			write: '0',
			state: 'q4',
			direction: 'left'
		},
		'X': {
			write: 'X',
			state: 'q0',
			direction: 'right'
		}
	},
	end: {}
}*/
var addAutomaBinary = {
	q0: {
		'#': {
			write: '#',
			state: 'q0',
			direction: 'right'
		},
		'0': {
			write: '0',
			state: 'q1',
			direction: 'right'
		},
		'1': {
			write: '1',
			state: 'q1',
			direction: 'right'
		}
	},
	q1: {
		'#': {
			write: '#',
			state: 'q2',
			direction: 'right'
		},
		'0': {
			write: '0',
			state: 'q1',
			direction: 'right'
		},
		'1': {
			write: '1',
			state: 'q1',
			direction: 'right'
		},
		'A': {
			write: 'A',
			state: 'q1',
			direction: 'right'
		},
		'B': {
			write: 'B',
			state: 'q1',
			direction: 'right'
		}
	},
	q2: {
		'#': {
			write: '#',
			state: 'q3',
			direction: 'left'
		},
		'0': {
			write: '0',
			state: 'q2',
			direction: 'right'
		},
		'1': {
			write: '1',
			state: 'q2',
			direction: 'right'
		}
	},
	q3: {
		'#': {
			write: '#',
			state: 'q9',
			direction: 'left'
		},
		'0': {
			write: '#',
			state: 'q4',
			direction: 'left'
		},
		'1': {
			write: '#',
			state: 'q6',
			direction: 'left'
		}
	},
	q4: {
		'#': {
			write: '#',
			state: 'q5',
			direction: 'left'
		},
		'0': {
			write: '0',
			state: 'q4',
			direction: 'left'
		},
		'1': {
			write: '1',
			state: 'q4',
			direction: 'left'
		}
	},
	q5: {
		'A': {
			write: 'A',
			state: 'q5',
			direction: 'left'
		},
		'B': {
			write: 'B',
			state: 'q5',
			direction: 'left'
		},
		'0': {
			write: 'A',
			state: 'q1',
			direction: 'right'
		},
		'1': {
			write: 'B',
			state: 'q1',
			direction: 'right'
		}
	},
	q6: {
		'0': {
			write: '0',
			state: 'q6',
			direction: 'left'
		},
		'1': {
			write: '1',
			state: 'q6',
			direction: 'left'
		},
		'#': {
			write: '#',
			state: 'q7',
			direction: 'left'
		}
	},
	q7: {
		'A': {
			write: 'A',
			state: 'q7',
			direction: 'left'
		},
		'B': {
			write: 'B',
			state: 'q7',
			direction: 'left'
		},
		'0': {
			write: 'B',
			state: 'q1',
			direction: 'right'
		},
		'1': {
			write: 'A',
			state: 'q8',
			direction: 'left'
		}
	},
	q8: {
		'1': {
			write: '0',
			state: 'q8',
			direction: 'left'
		},
		'0': {
			write: '1',
			state: 'q1',
			direction: 'right'
		},
		'#': {
			write: '1',
			state: 'q1',
			direction: 'right'
		}
	},
	q9: {
		'A': {
			write: '0',
			state: 'q9',
			direction: 'left'
		},
		'B': {
			write: '1',
			state: 'q9',
			direction: 'left'
		},
		'#': {
			write: '#',
			state: 'end',
			direction: 'right'
		},
		'0': {
			write: '0',
			state: 'end',
			direction: 'right'
		},
		'1': {
			write: '1',
			state: 'end',
			direction: 'right'
		}
	},
	end: {}
}

var app = new Vue({
	el: "#app",
	data () {
		return {
			a: 3,
			b: 8,
			cursor_offset: 90,
			cursor: 90,
			tape: [],
			status: null,
			automa: addAutomaBinary,
			clock: 0,
			computed: null,
			running: false,
			ticks_per_sec: 8,
			// UI stuff
			tapecellsize: 0
		}
	},
	computed: {
		tick_ms () {
			return 1000/this.ticks_per_sec
		},
		result () {
			if (this.computed === true) {
				return this.tape.map(x =>  x === '#' ? '' : x).join('')
			}
			return '-'
		},
		asize () {
			return this.toBinary(this.a).length
		},
		bsize () {
			return this.toBinary(this.b).length
		},
		addendSize () {
			// return Math.max(this.asize, this.bsize)
			return 8
		},
		tapePreview () {
			if (!(this.a > 0))
				return '-'
			if (!(this.b > 0))
				return '-'
			var abinary = this.toBinary(this.a, this.addendSize)
			var bbinary = this.toBinary(this.b, this.addendSize)
			var resbinary = this.toBinary(this.a + this.b)
			var i
			var emptyspaces = resbinary.length - abinary.length - bbinary.length
			var tape = Array.from('#'.repeat(Math.max(this.cursor_offset, emptyspaces)))
			/*for(i = 0; i < this.a; i++) { tape.push('0'); }
			tape.push('C')
			for(i = 0; i < this.b; i++) { tape.push('0'); }*/
			tape = tape.concat(Array.from(abinary))
			tape.push('#')
			tape = tape.concat(Array.from(bbinary))
			return tape.concat(Array.from('#'.repeat(this.cursor_offset)))
		},
		statusName () {
			for(var k in this.automa) {
				if (this.automa[k] === this.status)
					return k
			}
		}
	},
	methods: {
		slowDown () {
			this.ticks_per_sec = Math.max(1, parseInt(this.ticks_per_sec)-1)
		},
		speedUp () {
			this.ticks_per_sec = Math.min(100, parseInt(this.ticks_per_sec)+1)
		},
		classTapeCell (cell, index) {
			var classes = []
			if (index === this.cursor_offset) {
				classes.push('zero')
			}
			if (cell === '#') {
				classes.push('empty')
			}
			return classes.join(' ')
		},
		toBinary (value, padded) {
  		if (!value) return ''
  		var binary = (value >>> 0).toString(2)
			if (padded) {
				binary = '0'.repeat(padded - binary.length) + binary
			}
			return binary
		},
		toDecimal (value) {
  		if (!value) return ''
  		return parseInt(value, 2)
		},
		moveCursorUntil (char, dir) {
			var counter = 0
			dir = dir == 'right' ? 1 : -1
			while(counter < 1000 && this.tape[this.cursor] !== char) {
				counter++
				this.cursor += dir
			}
		},
		moveCursorUntilNot (char, dir) {
			var counter = 0
			dir = dir == 'right' ? 1 : -1
			while(counter < 1000 && this.tape[this.cursor+dir] !== char) {
				counter++
				this.cursor += dir
			}
		},
		clockTick (noloop) {
			if (!this.running && !noloop) {
				this.running = false
				return
			}
			if (this.clock++ > 1000) {
				this.computed = false
				return
			}
			var op = this.status[this.tape[this.cursor] || '#']
			console.log(this.statusName, this.status, op, this.cursor, this.tape[this.cursor])
			this.tape[this.cursor] = op.write
			if (op.direction === 'right') {
				this.cursor += 1
			} else if (op.direction === 'left') {
				this.cursor -= 1
			}
			this.status = this.automa[op.state]
			if (this.status === this.automa['end']) {
				this.computed = true
			}
			else if (!noloop) {
				setTimeout(this.clockTick, this.tick_ms)
			}
		},
		reset () {
			this.running = false
			this.clock = 0
			this.cursor = this.cursor_offset
			this.status = this.automa['q0']
			this.computed = null
			this.tape = JSON.parse(JSON.stringify(this.tapePreview))
		},
		startStop () {
			if (this.running) {
				this.running = false
			} else {
				this.running = true
				this.clockTick()
			}
		}
	},
	mounted () {
		// this.tape = JSON.parse(JSON.stringify(this.tapePreview))
		this.reset()
		setTimeout(this.startStop, 500)
		setTimeout(() => {
			this.tapecellsize = document.body.querySelector('#rule').getBoundingClientRect().width
		}, 500)
	},
	watch: {}
})

// https://www.geeksforgeeks.org/turing-machine-addition/
// https://www.quora.com/How-do-I-make-a-turing-machine-simulator-to-perform-binary-addition
// https://math.stackexchange.com/questions/587265/turing-machine-for-comparing-copying-and-operating
// http://scanftree.com/automata/turing_machine_as_comparator