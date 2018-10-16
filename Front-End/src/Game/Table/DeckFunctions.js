// Flips a single card
export function flipCard(card) {
    card.flipped = true;
    return card;
}

// Takes an array of cards and lips all given Cards to show face value
export function flipCards(cards) { 
    cards.forEach(card => {
        card = flipCard(card);
    });
    // stage: 1 put this somewhere
    return cards;
}

// Takes two arrays, the deck and hand, pops the deck and pushes it to the hand
export function drawCard(deck, hand) {
    hand.push(flipCard(deck.pop()));
    return { deck, hand };
}

// Creates and returns a new shuffled deck
export function newDeck() {
    // Creates new Deck
    let newDeck = [];
    const suits = ['HEARTS', 'SPADES', 'CLUBS', 'DIAMONDS'];
    const names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    for (let s = 0; s < suits.length; s++) {
        for (let n = 0; n <= names.length - 1; n++) {
            if (n < 10) {
                newDeck.push({ suit: suits[s], value: n + 1, name: names[n], flipped: false });
            } else {
                newDeck.push({ suit: suits[s], value: 10, name: names[n], flipped: false });
            }
        }
    }
    // Shufffles the deck using Fisher-Yates algorithm
    for (let i = newDeck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let temp = newDeck[j];
        newDeck[j] = newDeck[i];
        newDeck[i] = temp;
    }
    return newDeck;
}

// Function creates the inital cards draws two cards each for player and dealer from deck
export function initaliseGame() {
    let cards = { deck: newDeck(), playerCards: [], dealerCards: [] }
    for (let i = 0; i < 2; i++) {
        cards.playerCards.push(flipCard(cards.deck.pop()));
        cards.dealerCards.push(cards.deck.pop());
    }
    while (evaluate(cards.dealerCards) <= 16) {
        cards.dealerCards.push(cards.deck.pop());
    }
    return cards;
}

// Takes a players hand as an array and evaluates the value of it
export function evaluate(hand) {
    let total = 0;
    let aces = 0;
    for (let i = 0; i < hand.length; i++) {
        if (hand[i].value !== 1) {
            total += hand[i].value;
        } else {
            aces++;
        }
    }
    if (aces !== 0) {
        total += (aces - 1);
        if (total <= 10) total += 11;
        else total++;
    };
    return total;
}


// Determines the overall result of the game taking in the parameters of the player and dealer
export function win(playerCards, dealerCards) {
    const playerPoints = evaluate(playerCards);
    const dealerPoints = evaluate(dealerCards);

    let message = "";
    let alert = false;
    let win = false //if win result is true;

    if (dealerPoints > 21) {
        message = "Dealer Bust, You Win!";
        alert = true;
        win = true;
    } else if (playerPoints > dealerPoints && dealerPoints < 21) {
        message = "Winner: " + playerPoints;
        alert = true;
        win = true;
    } else if (playerPoints === dealerPoints) {
        message = "Draw! No Winner!";
        alert = true;
        win = null;
    } else {
        message = "Loser! Your hand: " + playerPoints + ", Dealer hand: " + dealerPoints;
        alert = false;
        win = false;
    }
    return { message, alert, win }
}