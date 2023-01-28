const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
const dealButton = document.getElementById("deal-button");
const hitButton = document.getElementById("hit-button");
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
  target.push(currentCard)
};

const hit = () => {
  deal(shuffledDeck, playerDeck);
  render();
};

const calculatePoints = (playerCard, dealerCard) => {
  
};



window.addEventListener("DOMContentLoaded", () => {
  // Execute after page load
  dealButton.addEventListener('click', () => {
    shuffleDeck();
    deal(shuffledDeck, dealerDeck);
    deal(shuffledDeck, playerDeck);
    deal(shuffledDeck, dealerDeck);
    deal(shuffledDeck, playerDeck);
    calculatePoints(playerDeck, dealerDeck)
    render();
  })
  hitButton.addEventListener('click', () => {
    shuffleDeck();
    hit()
  })
});








