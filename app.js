/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gameIsBeingPlayed

gameInitializer()

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gameIsBeingPlayed) {
    let diceOne = Math.floor(Math.random() * 6) + 1
    let diceTwo = Math.floor(Math.random() * 6) + 1

    document.getElementById('dice-1').style.display = 'block'
    document.getElementById('dice-2').style.display = 'block'
    document.getElementById('dice-1').src = 'dice-' + diceOne + '.png'
    document.getElementById('dice-2').src = 'dice-' + diceTwo + '.png'

    if (diceOne !== 1 && diceTwo !== 1) {
      roundScore += diceOne + diceTwo
      document.querySelector(
        '#current-' + activePlayer
      ).textContent = roundScore
    } else {
      nextPlayer()
    }
  }
})

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gameIsBeingPlayed) {
    scores[activePlayer] += roundScore

    document.querySelector('#score-' + activePlayer).textContent =
      scores[activePlayer]

    let input = document.querySelector('.final-score').value
    let winningScore = null

    if (input) {
      winningScore = input
    } else {
      winningScore = 100
    }

    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!'
      diceDisplayNone()
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner')
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.remove('active')
      gameIsBeingPlayed = false
    } else {
      nextPlayer()
    }
  }
})

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0)
  roundScore = 0
  document.getElementById('current-0').textContent = '0'
  document.getElementById('current-1').textContent = '0'

  document.querySelector('.player-0-panel').classList.toggle('active')
  document.querySelector('.player-1-panel').classList.toggle('active')

  diceDisplayNone()
}

document.querySelector('.btn-new').addEventListener('click', gameInitializer)

function gameInitializer() {
  scores = [0, 0]
  activePlayer = 0
  roundScore = 0
  gameIsBeingPlayed = true

  diceDisplayNone()

  document.getElementById('score-0').textContent = '0'
  document.getElementById('score-1').textContent = '0'
  document.getElementById('current-0').textContent = '0'
  document.getElementById('current-1').textContent = '0'
  document.getElementById('name-0').textContent = 'Player 1'
  document.getElementById('name-1').textContent = 'Player 2'
  document.querySelector('.player-0-panel').classList.remove('winner')
  document.querySelector('.player-1-panel').classList.remove('winner')
  document.querySelector('.player-0-panel').classList.remove('active')
  document.querySelector('.player-1-panel').classList.remove('active')
  document.querySelector('.player-0-panel').classList.add('active')
}

function diceDisplayNone() {
  document.getElementById('dice-1').style.display = 'none'
  document.getElementById('dice-2').style.display = 'none'
}
