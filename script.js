let score = JSON.parse(localStorage.getItem('score')) ||

{
  Wins: 0,
  losses: 0,
  Ties: 0
};

updateScoreElement();

//let computerMove = ''; //global variable
function pickComputerMove() {
  const random = Math.random()
  let computerMove = '';

  if (random <= 1 / 3 && random > 0) {
    computerMove = 'Rock';
  }
  else if (random <= 2 / 3 && random > 1 / 3) {
    computerMove = 'Scissors';
  }
  else if (random >= 2 / 3 && random < 1) {
    computerMove = 'Paper';
  }
  return computerMove;
}


document.querySelector('.js-rock-button').addEventListener('click', () => { playGame('Rock') })


document.querySelector('.js-paper-button').addEventListener('click', () => { playGame('Paper') })


document.querySelector('.js-scissors-button').addEventListener('click', () => { playGame('Scissors') })


document.querySelector('.js-reset-button').addEventListener('click', () => {
  score.Wins = 0;
  score.losses = 0;
  score.Ties = 0;
  localStorage.removeItem('score');
  updateScoreElement()
})


document.querySelector('.js-auto-button').addEventListener('click', () => autoPlay())

let isAutoPlaying = false;
let intervalID;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalID = setInterval(() => {
      const playerMove = pickComputerMove()
      playGame(playerMove);
    }, 2000);
    isAutoPlaying = true;

  }
  else {
    clearInterval(intervalID);
    isAutoPlaying = false;
  }

}
//after each interval a ID is generated

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('Rock')
  }
  else if (event.key === 's') {
    playGame('Scissors')
  }
  else if (event.key === 'p') {
    playGame('Paper')
  }
})

function playGame(playerMove) {
  let result = '';

  const computerMove = pickComputerMove();

  if (playerMove === 'Scissors') {
    if (computerMove === 'Rock') {
      result = 'You Lose.';
    }
    else if (computerMove === 'Paper') {
      result = 'You Win.';
    }
    else if (computerMove === 'Scissors') {
      result = 'Tie';
    }
  }
  else if (playerMove === 'Rock') {


    if (computerMove === 'Rock') {
      result = 'Tie';
    }
    else if (computerMove === 'Paper') {
      result = 'You Lose.';
    }
    else if (computerMove === 'Scissors') {
      result = 'You Win.';
    }
  }

  else if (playerMove === 'Paper') {


    if (computerMove === 'Rock') {
      result = 'You Win.';
    }
    else if (computerMove === 'Paper') {
      result = 'Tie';
    }
    else if (computerMove === 'Scissors') {
      result = 'You Lose.';
    }
  }

  document.querySelector('.js-result')
    .innerHTML = `${result}`

  document.querySelector('.js-moves')
    .innerHTML = ` You <img src="images/${playerMove}-emoji.png" class="move-icon"> 
   <img src="images/${computerMove}-emoji.png"class="move-icon" >
  Computer`


  if (result === 'You Win.') {
    score.Wins += 1;
  }
  else if (result === 'You Lose.') {
    score.losses += 1
  }
  else if (result === 'Tie') {
    score.Ties += 1
  }

  localStorage.setItem('score', JSON.stringify(score))
  updateScoreElement();


}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins:${score.Wins},losses:${score.losses},Ties:${score.Ties}`
}






