export function shuffleDecks(numDecks = 1) {
    const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
    const cards = ['2','3','4','5','6','7','8','9','10','jack','queen','king','ace'];
    const deck:string[] = [];

    for(let i = numDecks; i>0; i--)
    {
        suits.forEach(suit => {
            cards.forEach(card => {
                deck.push(`${card}_of_${suit}`)
            });
        });
    }

    return deck;
}

export function getCard(deck:string[]) {
    const updatedDeck = deck;
    const randomIndex = Math.floor(Math.random() * updatedDeck.length);

    const drawnCard = updatedDeck[randomIndex];

    updatedDeck.splice(randomIndex,1);

    return {drawnCard, updatedDeck};
}