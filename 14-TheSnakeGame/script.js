let board = document.querySelector("#board")
console.dir(board)

let rows = Math.floor(board.clientHeight / 40)
let columns = Math.floor(board.clientWidth / 40)

let direction = "up";
let interval = null;
let blocks = [];
let snake = [{
    x: 3, y: 6
}, {
    x: 3, y: 7
}, {
    x: 3, y: 8
}, {
    x: 3, y: 9
}, {
    x: 3, y: 10
}, {
    x: 3, y: 11
}, {
    x: 3, y: 12
},]

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
        let block = document.createElement("div")
        block.className = "block"
        blocks[`${row}-${col}`] = block
        board.appendChild(block);
    }
}

function clearSnake() {
    snake.forEach(segment => {
        const square = blocks[`${segment.x}-${segment.y}`]
        if (square) square.className = "block"
    })
}

function renderSnake() {
    snake.forEach(segment => {
        const square = blocks[`${segment.x}-${segment.y}`]
        if (square) square.className = "block bg-red-500 rounded-lg"
    })
}

function isGameOver(head) {
    const hitWall = head.x < 0 || head.x >= rows || head.y < 0 || head.y >= columns
    const hitSelf = snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    return hitWall || hitSelf
}

renderSnake()

interval = setInterval(() => {
    let head
    if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 }
    } else if (direction === "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 }
    } else if (direction === "down") {
        head = { x: snake[0].x + 1, y: snake[0].y }
    } else if (direction === "up") {
        head = { x: snake[0].x - 1, y: snake[0].y }
    }

    if (isGameOver(head)) {
        clearInterval(interval)
        alert("Game Over")
        return
    }

    clearSnake()
    snake.unshift(head)
    snake.pop()
    renderSnake()
}, 200)

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