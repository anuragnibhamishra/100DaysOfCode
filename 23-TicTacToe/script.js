const boxes = Array.from(document.querySelectorAll('.boxes'))
const status = document.getElementById('status')
const resetButton = document.getElementById('resetButton')

const humanPlayer = 'X'
const aiPlayer = 'O'
let board = Array(9).fill('')
let gameOver = false

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function renderBoard() {
  boxes.forEach((box, index) => {
    box.textContent = board[index]
    box.classList.toggle('cursor-not-allowed', board[index] !== '' || gameOver)
  })
}

function setStatus(message) {
  status.textContent = message
}

function resetGame() {
  board = Array(9).fill('')
  gameOver = false
  setStatus('Play as X. The computer is O and uses Minimax.')
  boxes.forEach((box) => box.classList.remove('bg-emerald-500', 'bg-red-500', 'text-white'))
  renderBoard()
}

function checkWinner(currentBoard) {
  for (const [a, b, c] of winningPatterns) {
    if (
      currentBoard[a] !== '' &&
      currentBoard[a] === currentBoard[b] &&
      currentBoard[b] === currentBoard[c]
    ) {
      return currentBoard[a]
    }
  }
  return currentBoard.includes('') ? null : 'tie'
}

function highlightWinningLine(currentBoard) {
  for (const [a, b, c] of winningPatterns) {
    if (
      currentBoard[a] !== '' &&
      currentBoard[a] === currentBoard[b] &&
      currentBoard[b] === currentBoard[c]
    ) {
      [a, b, c].forEach((index) => {
        boxes[index].classList.add('bg-emerald-500', 'text-white')
      })
      return
    }
  }
}

function minimax(newBoard, isMaximizing) {
  const winner = checkWinner(newBoard)
  if (winner === aiPlayer) return { score: 10 }
  if (winner === humanPlayer) return { score: -10 }
  if (winner === 'tie') return { score: 0 }

  const availableMoves = newBoard
    .map((value, index) => (value === '' ? index : null))
    .filter((index) => index !== null)

  const moves = []

  for (const index of availableMoves) {
    const move = { index }
    newBoard[index] = isMaximizing ? aiPlayer : humanPlayer

    const result = minimax(newBoard, !isMaximizing)
    move.score = result.score

    newBoard[index] = ''
    moves.push(move)
  }

  let bestMove = null
  if (isMaximizing) {
    let bestScore = -Infinity
    for (const move of moves) {
      if (move.score > bestScore) {
        bestScore = move.score
        bestMove = move
      }
    }
  } else {
    let bestScore = Infinity
    for (const move of moves) {
      if (move.score < bestScore) {
        bestScore = move.score
        bestMove = move
      }
    }
  }

  return bestMove
}

function getBestMove() {
  const move = minimax(board.slice(), true)
  return move ? move.index : null
}

function handleMove(index, player) {
  board[index] = player
  renderBoard()
  const winner = checkWinner(board)
  if (winner) {
    gameOver = true
    if (winner === 'tie') {
      setStatus('It’s a tie!')
    } else if (winner === humanPlayer) {
      setStatus('You win!')
      highlightWinningLine(board)
    } else {
      setStatus('Computer wins!')
      highlightWinningLine(board)
    }
  }
}

boxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    if (gameOver || board[index] !== '') return
    handleMove(index, humanPlayer)
    if (!gameOver) {
      const bestMove = getBestMove()
      if (bestMove !== null) {
        handleMove(bestMove, aiPlayer)
      }
    }
  })
})

resetButton.addEventListener('click', resetGame)
resetGame()
