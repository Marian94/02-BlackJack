const deck = [
  { Value: "A", Suit: "spades" },
  { Value: "2", Suit: "spades" },
  { Value: "3", Suit: "spades" },
  { Value: "4", Suit: "spades" },
  { Value: "5", Suit: "spades" },
  { Value: "6", Suit: "spades" },
  { Value: "7", Suit: "spades" },
  { Value: "8", Suit: "spades" },
  { Value: "9", Suit: "spades" },
  { Value: "10", Suit: "spades" },
  { Value: "J", Suit: "spades" },
  { Value: "Q", Suit: "spades" },
  { Value: "K", Suit: "spades" },
  { Value: "A", Suit: "diamonds" },
  { Value: "2", Suit: "diamonds" },
  { Value: "3", Suit: "diamonds" },
  { Value: "4", Suit: "diamonds" },
  { Value: "5", Suit: "diamonds" },
  { Value: "6", Suit: "diamonds" },
  { Value: "7", Suit: "diamonds" },
  { Value: "8", Suit: "diamonds" },
  { Value: "9", Suit: "diamonds" },
  { Value: "10", Suit: "diamonds" },
  { Value: "J", Suit: "diamonds" },
  { Value: "Q", Suit: "diamonds" },
  { Value: "K", Suit: "diamonds" },
  { Value: "A", Suit: "clubs" },
  { Value: "2", Suit: "clubs" },
  { Value: "3", Suit: "clubs" },
  { Value: "4", Suit: "clubs" },
  { Value: "5", Suit: "clubs" },
  { Value: "6", Suit: "clubs" },
  { Value: "7", Suit: "clubs" },
  { Value: "8", Suit: "clubs" },
  { Value: "9", Suit: "clubs" },
  { Value: "10", Suit: "clubs" },
  { Value: "J", Suit: "clubs" },
  { Value: "Q", Suit: "clubs" },
  { Value: "K", Suit: "clubs" },
  { Value: "A", Suit: "hearts" },
  { Value: "2", Suit: "hearts" },
  { Value: "3", Suit: "hearts" },
  { Value: "4", Suit: "hearts" },
  { Value: "5", Suit: "hearts" },
  { Value: "6", Suit: "hearts" },
  { Value: "7", Suit: "hearts" },
  { Value: "8", Suit: "hearts" },
  { Value: "9", Suit: "hearts" },
  { Value: "10", Suit: "hearts" },
  { Value: "J", Suit: "hearts" },
  { Value: "Q", Suit: "hearts" },
  { Value: "K", Suit: "hearts" },
];
let dealerCards = [];
let myCards = [];
let deckTemp = [...deck];
let myScore = 0;
let dealerScore = 0;

//Draw one more card
function hitCard() {
  pullCards(myCards, 1);
  if (myScore > 21) {
    stand();
  }
}

//Stop drawing card
function stand() {
  document.getElementById("deckDealerStart").innerHTML = "";
  document.getElementById("dealerScore").style.visibility = "visible";
  document.getElementById("deckDealer").style.visibility = "visible";
  document.getElementById("playAgainButton").style.visibility = "visible";
  document.getElementById("buttons").style.visibility = "hidden";
  document.getElementById(
    "dealerScore"
  ).innerText = `Dealer Score: ${dealerScore}`;

  if (myScore > 21) {
    alert("YOU BUSTED!");
  } else if (dealerScore > 21 || myScore > dealerScore) {
    alert("YOU WIN!");
  } else if (dealerScore === myScore) {
    alert("PUSH");
  } else {
    alert("DEALER WINS!");
  }
}

//Check the score of each player
function getScore(cards) {
  let aces = 0;
  let score = 0;
  //Count cards and check for ace
  for (i = 0; i < cards.length; i++) {
    if (isNaN(+cards[i].Value)) {
      if (cards[i].Value === "A" && aces === 0) {
        aces++;
      } else {
        score += 10;
      }
    } else {
      score += +cards[i].Value;
    }
  }
  //Check if in the hand is an Ace, if have one then check if the ace is going to be
  // be a value of one or 10
  if (aces) {
    if (score + 11 > 21) {
      score++;
    } else {
      score += 11;
    }
  }
  return score;
}

//Render the cards
function renderCards({ Suit, Value }) {
  let card = document.createElement("div");
  let value = document.createElement("div");
  let suit = document.createElement("div");
  card.className = "card";
  value.className = "value";
  suit.className = "suit " + Suit;

  value.innerHTML = Value;
  card.appendChild(value);
  card.appendChild(suit);

  return card;
}

//Pull cards to each player
function pullCards(deckPlayer, player = 1) {
  const card = deckTemp.splice((deckTemp.length * Math.random()) | 0, 1)[0];
  deckPlayer.push(card);
  if (player) {
    myScore = getScore(deckPlayer);
    document.getElementById("myDeck").appendChild(renderCards(card));
    document.getElementById("myScore").innerText = `My Score: ${myScore}`;
  } else {
    dealerScore = getScore(deckPlayer);
    document.getElementById("deckDealer").appendChild(renderCards(card));
  }
}

//Dealers play movements
function dealersPlay() {
  while (dealerScore < 17) {
    pullCards(dealerCards, 0);
  }
  let card = document.createElement("div");
  card.className = "cardHidden";
  document.getElementById("deckDealerStart").appendChild(card);
  document
    .getElementById("deckDealerStart")
    .appendChild(renderCards(dealerCards[dealerCards.length - 1]));
  document.getElementById("deckDealerStart").style.visibility = "visible";
}
//Reset the game
function playAgain() {
  deckTemp = deck;
  dealerCards = [];
  myCards = [];
  myScore = 0;
  dealerScore = 0;
  document.getElementById("myDeck").innerHTML = "";
  document.getElementById("deckDealer").innerHTML = "";
  document.getElementById("deckDealerStart").innerHTML = "";
  document.getElementById("buttons").style.visibility = "visible";

  renderGame();
}

function renderGame() {
  pullCards(dealerCards, 0);
  pullCards(dealerCards, 0);
  pullCards(myCards, 1);
  pullCards(myCards, 1);
  dealersPlay();
  document.getElementById("deckDealer").style.visibility = "hidden";
  document.getElementById("dealerScore").style.visibility = "hidden";
  document.getElementById("playAgainButton").style.visibility = "hidden";
}

renderGame();
