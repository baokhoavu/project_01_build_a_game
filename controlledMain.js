
var $playerA = jQuery('.playerA')
var $playerB = jQuery('.playerB')
var $handA = jQuery('.handA')
var $handB = jQuery('.handB')
var $scoreA = jQuery('.scoreA')
var $scoreB = jQuery('.scoreB')

var arena1 = [];
var arena2 = [];
var deckA = [];
var deckB = [];
var handA;
var handB;


/** this function creates and shuffles the deck parameter
  * var deck is created as an array containing 52 numbers
  * current Index takes array and shuffles
  * deck is returned
*/
var shuffle = function(deck) {
var deck = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11]
  var currentIndex = deck.length, tempCard, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex); //2
    currentIndex -= 1 // 3

    tempCard = deck[currentIndex];
    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = tempCard;
  }
  return deck;
}
/** this function shuffles the deck and splits into two
 * parameter is a deck
 * shuffle function is applied to deck
 * pushes deck in deckA and deckB
 * data type of deckA and deckB are arrays
*/
var shuffleandSetup = function(deck) {
  deck = shuffle(deck);
  for (var i = 0; i < deck.length; i++) {
    if ( i % 2 === 0){
      deckA.push(deck[i]);
  } else {
      deckB.push(deck[i]);
    }
  } console.log(deckA);
    console.log(deckB);
    console.log("Captain Morgan's Deck: " + deckA.length);
    console.log("Jack Daniel's Deck: " + deckB.length);
};
/** this function takes a card from each deck and places them on the board
  * this function has no parameter
  * one card is removed from top of deckA and set to arena1
  * one card is removed from top of deckB and set to arena2
  * console displays what value belongs to Captain Morgan/arena1
  * console displays what value belongs to Jack Daniel/arena2
  * calls compareCards
*/
var addCardsToArena = function() {
  arena1 = deckA.shift();
  arena2 = deckB.shift();
  $handA.innerHTML = arena1;
  $handB.innerHTML = arena2;
  console.log('CM card => ', arena1);
  console.log('JD card => ', arena2);
  compareCards();
}
/**
  * this function compares two cards on the board and does according action based on values
  * this function has no parameter
  *   if arena1 is greater, return cards to deckA
  * console displays 'Captain Morgan Wins!'
  * console displays deckA amount
  * console displays deckB amount
  *   if arena2 is greater, return cards to deckB
  * console displays 'Jack Daniel Wins!'
  * console displays deckA amount
  * console displays deckB amount
  *   if arena1 has the same value as arena2
  * calls war function
  * console displays 'war!'
*/
var compareCards = function() {
  if (arena1 > arena2) {
    deckA = deckA.concat(arena1, arena2)
    console.log('Captain Morgan Wins!');
    console.log('CM deck => ', deckA.length);
    console.log('JD deck => ', deckB.length);
  } else if (arena2 > arena1) {
    deckB = deckB.concat(arena2, arena1)
    console.log('Jack Daniel Wins!');
    console.log('CM deck => ', deckA.length);
    console.log('JD deck => ', deckB.length);
  } else if (arena1 === arena2 || arena2 === arena1) {
      war();
      console.log('War is declared!!!');
  } else if (deckA > 51 || deckB < 1) {
      console.log('Winner is one and only Captain Morgan of the Sea!!');
      $handA.innerHTML = 'Winner!'
      $handB.innerHTML = 'Loser!'
  } else if (deckB > 51 || deckA < 1) {
      console.log('Winner is Jack Daniels the bootlicker!!')
      $handB.innerHTML = 'Win!'
      $handA.innerHTML = 'Lose!'
  } else {
    console.log('Gewd Luck..')
  }
    $scoreA.innerHTML = deckA.length;
    $scoreB.innerHTML = deckB.length;
}
/** this function expression is for war
  * sets up 2 empty Arrays as Holders for Repeat-Wars
  * sets up while statement to set up round
  * sets up while statement to set up repeat round
  * if statement to return for Captain Morgan if he wins
  * if statement to return for Jack Daniels if he wins
  * else if statement to repeat if conditions are the same=same
*/
function war(wararenaA, wararenaB) {
    var wararenaA = [];
    var wararenaB = [];
    while (wararenaA.length < 2 || wararenaB.length < 2) {
      var wararenaC = [];
      var wararenaD = [];
      wararenaA = deckA.splice(0, 3);
      wararenaB = deckB.splice(0, 3);
      wararenaA.unshift(arena1)
      wararenaB.unshift(arena2)
  }
    while (wararenaA.length === 0 || wararenaB.length === 0) {
      wararenaA = deckA.splice(0, 4);
      wararenaB = deckB.splice(0, 4);
    }
    if (wararenaA[3] > wararenaB[3]) {
      deckA = deckA.concat(wararenaA, wararenaB, wararenaC, wararenaD)
      console.log('Captain Morgan Wins!');
      console.log('CM deck => ', deckA);
      console.log('JD deck => ', deckB);
    } else if (wararenaB[3] > wararenaA[3]) {
      deckB = deckB.concat(wararenaB, wararenaA, wararenaC, wararenaD)
      console.log('Jack Daniel Wins!');
      console.log('CM deck => ', deckA);
      console.log('JD deck => ', deckB);
    } else if (wararenaA[3] === wararenaB[3]) {
      deckA = deckA.concat(wararenaA);
      deckB = deckB.concat(wararenaB);
      wararenaC = wararenaC.concat(wararenaA); // this is the problem
      wararenaD = wararenaD.concat(wararenaB); // this is the problem
      war();
      // console.log('War Again Mateys!!!');
  }
}


var buttonHit = document.querySelector('.hit');
var buttonStart = document.querySelector('.start')

buttonStart.addEventListener('click', shuffle)
buttonStart.addEventListener('click', shuffleandSetup)

buttonHit.addEventListener('click', addCardsToArena)
