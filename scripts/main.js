const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
const dealButton = document.getElementById("deal-button");
const hitButton = document.getElementById("hit-button");
const dealerPointBox = document.getElementById("dealer-points");
const playerPointBox = document.getElementById("player-points");
const deck = [];
let shuffledDeck = [];
let dealerDeck = [];
let playerDeck = [];
const suits = ["hearts", "spades", "clubs", "diamonds"];
const ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
const makeDeck = (rank, suit) => {
  const card = {
    rank: rank,
    suit: suit,
    pointValue: rank > 10 ? 10 : rank,
  };
  deck.push(card);
};

for (let suit of suits) {
  for (const rank of ranks) {
    makeDeck(rank, suit);
  }
};


const shuffleDeck = () => {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  shuffledDeck = deck;
};

const render = () => {
  dealerHand.innerHTML = '';
  playerHand.innerHTML = '';
  for (let i = 0; i < dealerDeck.length; i++) {
    let dealerCard = document.createElement("img")
    dealerCard.setAttribute('src', `./images/${dealerDeck[i].rank}_of_${dealerDeck[i].suit}.png`);
    dealerHand.append(dealerCard);
  }
  for (let j = 0; j < playerDeck.length; j++) {
    let playerCard = document.createElement("img")
    playerCard.setAttribute('src', `./images/${playerDeck[j].rank}_of_${playerDeck[j].suit}.png`);
    playerHand.append(playerCard);
  }
};

const deal = (cards, target) => {
  dealButton.setAttribute('disabled', true);
  const currentCard = cards.pop();
  target.push(currentCard);
};

const hit = () => {
  deal(shuffledDeck, playerDeck);
  render();
};

const calculateDealerPoints = (dealerCards) => {
  let playerScore = 0;
  console.log(dealerCards[1].pointValue);
  console.log(dealerCards[0].pointValue);
  if (dealerCards[0].pointValue == 'ace') {
    playerScore += 11
  }
  if (dealerCards[1].pointValue == 'ace') {
    playerScore += 11
  }
  if (dealerCards[0].pointValue == 'jack' || dealerCards[0].pointValue == 'king' || dealerCards[0].pointValue == 'queen') {
    playerScore += 10
  }
  if (dealerCards[1].pointValue == 'jack' || dealerCards[1].pointValue == 'king' || dealerCards[1].pointValue == 'queen') {
    playerScore += 10
  } else {
    playerScore += dealerCards[1].pointValue;
    playerScore += dealerCards[0].pointValue;
  }
  dealerPointBox.innerHTML = playerScore;
};

const calculatePlayerPoints = (playerCards) => {
  let playerScore = 0;
  console.log(playerCards[1].pointValue);
  console.log(playerCards[0].pointValue);
  if (playerCards[0].pointValue == 'ace') {
    playerScore += 11
  }
  if (playerCards[1].pointValue == 'ace') {
    playerScore += 11
  }
  if (playerCards[0].pointValue == 'jack' || playerCards[0].pointValue == 'king' || playerCards[0].pointValue == 'queen') {
    playerScore += 10
  }
  if (playerCards[1].pointValue == 'jack' || playerCards[1].pointValue == 'king' || playerCards[1].pointValue == 'queen') {
    playerScore += 10
  } else {
    playerScore += playerCards[1].pointValue;
    playerScore += playerCards[0].pointValue;
  }
  playerPointBox.innerHTML = playerScore;
};



window.addEventListener("DOMContentLoaded", () => {
  // Execute after page load
  dealButton.addEventListener('click', () => {
    shuffleDeck();
    deal(shuffledDeck, dealerDeck);
    deal(shuffledDeck, playerDeck);
    deal(shuffledDeck, dealerDeck);
    deal(shuffledDeck, playerDeck);
    calculateDealerPoints(dealerDeck);
    calculatePlayerPoints(playerDeck);
    render();
  })
  hitButton.addEventListener('click', () => {
    shuffleDeck();
    hit();
  })
});








