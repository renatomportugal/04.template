class Maze {
    constructor(width = 10, height = 10, scalar = 20) {
        this.nodes = new Array(width * height);
        this.width = width;
        this.height = height;
        this.scalar = scalar;

        this.overlay = [];
    }

    init() {
        this.nodes = this.create();
        // this.nodes = this.empty();

    }


   empty() {
        const maze = new Array(this.width * this.height); // I want to keep the function pure.
        const nb = (idx) => {
            return {  
                position: new Vector(idx%this.width, Math.floor(idx/this.width)),
                neighbours: []                
            }
        };
        maze[0] = {
            position: 0,
            neighbours: [],
        }
        let count = 0;
        for(let index = 0; index < maze.length; index++) {

        // }
        // maze.forEach((node, index) => {

            const x = index%this.width;
            const y = Math.floor(index/this.width);
            maze[index].position = new Vector(x, y);

            if(x + 1 < this.width) { 
                maze[index].neighbours.push(index + 1);
                if(maze[index + 1] === undefined) maze[index + 1] = nb(index + 1);
                maze[index + 1].neighbours.push(index);
            }
            // center right
            
            // if below is not out of bounds
            if(y + 1 < this.height) {
                count++;
                maze[index].neighbours.push(index + this.width);
                if(maze[index + this.width] === undefined) maze[index + this.width] = nb(index + this.width + 1);
                maze[index + this.width].neighbours.push(index);
            }
        };
        return maze;
    }

    create(x = 0, y = 0) {
        const initial = { 
            position: new Vector(x, y),
            neighbours: []
        };

        const stack = [];
        const maze = new Array(this.width * this.height); // I want to keep the function pure.
        const visited = new Array(maze.length).fill(false);

        const getNeighbours = (index) => {
            // This returns four neighbours
    
            // Set to visited
            visited[index] = true;
    
            // Array to hold return values
            const neighbours = [];
    
            const nb = (idx) => {
                return {  
                    position: new Vector(idx%this.width, Math.floor(idx/this.width)),
                    neighbours: []                
                }
            };
    
            // Check if neighbours are valid
    
            const x = index%this.width;
            const y = Math.floor(index/this.width);
    
            // if above is not out of bounds
            if(y > 0) {
                if(!visited[index - this.width]) neighbours.push(nb(index - this.width)); // above
            }
    
            // center row
            if(x  > 0 && !visited[index - 1]) neighbours.push(nb(index - 1)); // center left
            // center center is current location
            if(x + 1 < this.width && !visited[index + 1]) neighbours.push(nb(index + 1)); // center right
            
            // if below is not out of bounds
            if(y + 1 < this.height) {
                if(!visited[index + this.width]) neighbours.push(nb(index + this.width)); // above
            } 
            return neighbours;
        }

        stack.push(initial);

        while(stack.length > 0) {

            const currentNode = stack[stack.length - 1];

            // get valid neighbours
            const neighbours = getNeighbours(currentNode.position.x + currentNode.position.y * this.width);

            // if there are no neighbours, then this node is completed, add it to the maze
            if(neighbours.length <= 0) {
                const index = currentNode.position.x + currentNode.position.y * this.width;
                maze[index] = stack.pop();

                const parent = stack[stack.length - 1];
                if(parent !== undefined) {
                    const parentIndex = parent.position.x + parent.position.y * this.width;
                    parent.neighbours.push(index);    
                    maze[index].neighbours.push(parentIndex);              
                }
            }
            // otherwise add next node to the stack.
            else {
                const randomIndex = Math.floor(Math.random() * neighbours.length);
                stack.push(neighbours[randomIndex]);
            }
        }
        return maze;
    }

    render(renderer) {

        renderer.beginPath();
        renderer.strokeStyle = "black";
        renderer.lineWidth = 1;

        this.nodes.forEach(node => {
            const index = node.position.x + node.position.y * this.width;

            // above
            if(node.position.y <= 0 || !node.neighbours.includes(index - this.width)) {
                renderer.moveTo(node.position.x * this.scalar, node.position.y * this.scalar);
                renderer.lineTo(node.position.x * this.scalar + this.scalar, node.position.y * this.scalar);
            }

            // left
            if(node.position.x <= 0 || !node.neighbours.includes(index - 1)){
                renderer.moveTo(node.position.x * this.scalar, node.position.y * this.scalar);
                renderer.lineTo(node.position.x * this.scalar, node.position.y * this.scalar + this.scalar);
            };
            
            // right
            if(node.position.x + 1 >= this.width || !node.neighbours.includes(index + 1)) {
                renderer.moveTo(node.position.x * this.scalar + this.scalar, node.position.y * this.scalar);
                renderer.lineTo(node.position.x * this.scalar + this.scalar, node.position.y * this.scalar + this.scalar);
            }; 
            
            // below
            if(node.position.y + 1 >= this.height || !node.neighbours.includes(index + this.width)) {
                renderer.moveTo(node.position.x * this.scalar, node.position.y * this.scalar + this.scalar);
                renderer.lineTo(node.position.x * this.scalar + this.scalar, node.position.y * this.scalar + this.scalar);
            }; 
        })
        renderer.stroke();
    }

    renderSolution(renderer, solution, color) {

        renderer.beginPath();
        renderer.lineWidth = this.scalar/3;
        renderer.strokeStyle = color;
        renderer.moveTo(solution[0].position.x * this.scalar + this.scalar/2, solution[0].position.y * this.scalar+ this.scalar/2);
        solution.forEach((node) => {
            renderer.lineTo(node.position.x * this.scalar + this.scalar/2, node.position.y * this.scalar+ this.scalar/2)
        })
        renderer.stroke();
    }
    renderOverlay(renderer) {
        renderer.beginPath();
        renderer.fillStyle = "pink";
        this.overlay.forEach((o, index) => {
            if(o) {
                const x = index%this.width * this.scalar;
                const y = Math.floor(index/this.width) * this.scalar;
                renderer.rect(x, y, this.scalar, this.scalar);
            }
        })
            renderer.fill();
    }

    getIndex(vector) {
        return vector.x + vector.y * this.width;
    }

    getPosition(index) {
        return new Vector(index%this.width, Math.floor(index/this.width));
    }

    depthFirstSearch(start = new Vector(0, 0), goal = new Vector(this.width-1, this.height-1)) {
        // returns an array

        const startIndex = this.getIndex(start);
        const solution = [];
        const visited = new Array(this.nodes.length).fill(false);

        this.overlay = visited;
        let counter = 0;

        let found = false;

        const recurse = (node, index) => {
            counter++;
            visited[index] = true;    
            if(node.position.equals(goal)) {
                found = true;
                solution.push(node);
                text.innerHTML = "Nodes explored: " + counter;
                return;
            }    
            
            for(let i = 0; i < node.neighbours.length; i++) {
                const neighbour = node.neighbours[i];
                if (!visited[neighbour]) {
                    recurse(this.nodes[neighbour], neighbour);
                    if(found) {
                        solution.push(node);
                        return true;
                    }
                }
            }
            return false;
        }
        return recurse(this.nodes[startIndex], startIndex) ? solution : "not found";
    }


    breadthFirstSearch(start = new Vector(0, 0), goal = new Vector(this.width-1, this.height-1)) {
        // returns an array
        // fifo

        const startIndex = this.getIndex(start);

        const solution = [];

        const visited = new Array(this.nodes.length).fill(false);
        const parentOf = new Array(this.nodes.length);

        this.overlay = visited;

        let found = false;
        let counter = 0;

        const queue = [];

        queue.push(this.nodes[startIndex]);

        while(queue.length > 0 && !found) {
            counter++;
            const currentNode = queue[0];
            const index = this.getIndex(currentNode.position);
            visited[index] = true;

            if(currentNode.position.equals(goal)) {
                found = true;
            }
            else {
                currentNode.neighbours.forEach(idx => {
                    if(!visited[idx]) {
                        if(!parentOf[idx]) {
                            const node = this.nodes[idx];
                            parentOf[idx] = this.getIndex(currentNode.position);
                            queue.push(node);
                        } 
                    }
                });
                queue.shift();
            } 
        }

        text.innerHTML = "Nodes explored: " + counter;

        if(found) {
            let current = queue[0];
            let currentIndex = current.position.x + current.position.y * this.width;
            solution.push(current);
            while(parentOf[currentIndex] !== undefined) {
                        currentIndex = parentOf[currentIndex];
                        current = this.nodes[currentIndex];
                        solution.push(current);
            }
            return solution;
        }
        return "not found";
    }

    // CHECK SORTING!!!
    astarSearch(start = new Vector(0, 0), goal = new Vector(this.width-1, this.height-1)) {
        const DISTANCEBETWEEN = 1;

        const data = new Array(this.width * this.height);
        let counter = 0;
        
        for(let i = 0; i < data.length; i++) {
            data[i] = {
                visited: false,
                distanceGoal: Infinity,
                distanceStart: Infinity,
                parent: null
            }
        };
        const manhattan = (pos1, pos2) => {
            const x = pos1.x - pos2.x;
            const y = pos1.y - pos2.y;
            return Math.abs(x) + Math.abs(y);
        }

        const h = manhattan;

        let found = false;
        const queue = [];

        let currentNode;
        
        data[this.getIndex(start)].distanceStart = 0;

        data[this.getIndex(start)].distanceGoal = h(start, goal);

        queue.push(this.nodes[this.getIndex(start)]);

        while(queue.length > 0 && !found) {
            counter++;

            queue.sort((a, b) => {
                data[this.getIndex(a.position)].distanceGoal 
                + data[this.getIndex(a.position)].distanceStart 
                > data[this.getIndex(b.position)].distanceGoal 
                + data[this.getIndex(b.position)].distanceStart;
            })

            currentNode = queue.pop();

            data[this.getIndex(currentNode.position)].visited = true;

            if(currentNode.position.equals(goal)) {
                found = true;
            }
            else {
                currentNode.neighbours.forEach(index => {
                    const info = data[index];
                    if(!info.visited) {
                        const neighbour = this.nodes[index];
                        const newDistance = data[this.getIndex(currentNode.position)].distanceStart + DISTANCEBETWEEN
                        if(newDistance < info.distanceStart) {
                            info.distanceGoal = h(neighbour.position, goal);
                            info.distanceStart = newDistance;
                            info.parent = currentNode;
                        }
                        queue.push(neighbour);
                    }
                });
            }
        }

        text.innerHTML = "Nodes explored: " + counter;

        this.overlay = [];
        data.forEach(d => this.overlay.push(d.visited));

        if(found) {
            const solution = [];
            let current = currentNode;
            let currentIndex = current.position.x + current.position.y * this.width;
            solution.push(current);
            while(data[currentIndex].parent !== null) {
                
                current = data[currentIndex].parent;
                currentIndex = this.getIndex(current.position);
                solution.push(current);
            }
            return solution;
        }
        return "not found";
    }

    testSpeed(algorithm) {
        const initialTime = window.performance.timing.navigationStart + window.performance.now();
        const solution = () => algorithm();
        const finishTime = window.performance.timing.navigationStart + window.performance.now();
        console.log("in milliseconds: " + (finishTime -  initialTime));
        return solution;
    }
}

const viewport = new Viewport(600, 350);
const renderer = viewport.context;
const maze = new Maze(120, 70, 5);

maze.init();

const bfs = document.querySelector(".bfs");
const dfs = document.querySelector(".dfs");
const astar = document.querySelector(".astar");

const newMaze = document.querySelector(".newMaze");
let solution;
const text = document.querySelector(".text");

bfs.addEventListener("click", () => {
    solution = maze.breadthFirstSearch();
    redraw(solution);
});

dfs.addEventListener("click", () => {
    solution = maze.depthFirstSearch();
    redraw(solution);
});

astar.addEventListener("click", () => {
    solution = maze.astarSearch();
    redraw(solution);
});

newMaze.addEventListener("click", () => {
    maze.init();
  viewport.clear();
  text.innerHTML = "";
    maze.render(renderer);
});

const redraw = (search) => {
    viewport.clear();
    maze.renderOverlay(renderer);
    maze.renderSolution(renderer, search, "blue");
    maze.render(renderer);
}

maze.render(renderer);