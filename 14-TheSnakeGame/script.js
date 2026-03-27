let board = document.querySelector("#board")
console.dir(board)

let rows = Math.floor(board.clientHeight / 40)
let columns = Math.floor(board.clientWidth / 40)

// for (let i = 1; i <= rows * columns; i++) {
//     let block = document.createElement("div")
//     block.className = "w-[40px] h-[40px] bg-rose-400 border border-neutral-200 "
//     board.appendChild(block);
// }
let direction = "up";
let interval = null;
let blocks = [];
let snake = [{
    x: 3, y: 6
}, {
    x: 3, y: 7
}, {
    x: 3, y: 8
},]

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
        let block = document.createElement("div")
        block.className = "block"
        blocks[`${row}-${col}`] = block
        board.appendChild(block);
    }
}

function renderSnake() {
    snake.forEach(segment => {
        (blocks[`${segment.x}-${segment.y}`]).className = "block bg-red-500 rounded-lg"
    })
}
interval = setInterval(() => {
    let head = null;
    if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 }
    } else if (direction === "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 }
    } else if (direction === "down") {
        head = { x: snake[0].x + 1, y: snake[0].y }
    } else if (direction === "up") {
        head = { x: snake[0].x - 1, y: snake[0].y }
    }
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= columns) {
    clearInterval(interval)
    alert("Game Over")
}
    snake.forEach(segment => {
        (blocks[`${segment.x}-${segment.y}`]).className = "block"
    })
    snake.unshift(head);
    snake.pop()
    renderSnake()
}, 200);

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && direction !== "right") {
        direction = "left"
    } else if (event.key === "ArrowRight" && direction !== "left") {
        direction = "right"
    } else if (event.key === "ArrowDown" && direction !== "up") {
        direction = "down"
    } else if (event.key === "ArrowUp" && direction !== "down") {
        direction = "up"
    }
});