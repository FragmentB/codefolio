import { containsRepeats, getDiceArray, getFirstPair } from "./diceUtils";

export enum KlondikeBets{
    'Win',
    'Lose',
    'Beat 2 Aces'
}

export function beatAces(hand: number[])
{
    const handValue = getDiceArray(hand);
    const pentas = containsRepeats(handValue,5);
    const quads = containsRepeats(handValue,4);
    const triples = containsRepeats(handValue,3);
    const pairs = containsRepeats(handValue,2);

    const winning = pentas.count > 0 ||
    quads.count > 0 ||
    triples.count > 0 ||
    pairs.count > 1 
    
    return winning
}

export function translateHand(hand: number[]){
    const handValue = getDiceArray(hand);
    const pentas = containsRepeats(handValue,5);
        if(pentas.count > 0)
            return (`Five ${pentas.pos + 1}'s`)
    const quads = containsRepeats(handValue,4);
        if(quads.count > 0)
            return (`Four ${quads.pos + 1}'s`)
    const triples = containsRepeats(handValue,3);
    const pairs = containsRepeats(handValue,2);
        if(triples.count > 0 && pairs.count > 0)
            return (`${triples.pos + 1}'s full of ${pairs.pos + 1}'s`)
        if(pairs.count > 1)
        {
            const first = getFirstPair(handValue, 2)+1;
            return (`Two Pair ${pairs.pos + 1} and ${first}'s`)
        }
        if(triples.count > 0)
            return (`Three of a kind ${triples.pos + 1}'s`)
        if(pairs.count > 0)
            return (`Pair of ${pairs.pos + 1}'s`)

        if(hand.length === 0)
            return "No Hand Yet"
        return "Dead hand"
}

export function compareHands(playerValue: number[], dealerValue:number[], betType:KlondikeBets){
    let result = '';

    playerValue.forEach(function(item, i) { if (item === 1) playerValue[i] = 0; });
    dealerValue.forEach(function(item, i) { if (item === 1) dealerValue[i] = 0; });

    const is_same = (playerValue.length === dealerValue.length) && playerValue.every(function(element, index) {
        return element === dealerValue[index]; 
    });

    if(is_same)
        return 'losing'
    else{
        const dealerPentas = containsRepeats(dealerValue,5);
        const playerPentas = containsRepeats(playerValue,5);
        const dealerQuads = containsRepeats(dealerValue,4);
        const playerQuads = containsRepeats(playerValue,4);
        const dealerTriples = containsRepeats(dealerValue,3);
        const playerTriples = containsRepeats(playerValue,3);
        const dealerPairs = containsRepeats(dealerValue,2);
        const playerPairs = containsRepeats(playerValue,2);

        if(betType === KlondikeBets["Beat 2 Aces"])
        {
            const winning =
            playerPentas.count > 0 ||
            playerQuads.count > 0 ||
            playerTriples.count > 0 ||
            playerPairs.count > 1 

            return winning?'winning':'losing';
        }

        if(dealerPentas.pos >= 0 || playerPentas.pos >= 0)
        {
            if(dealerPentas.pos === 0)
                result='losing'
            else if( playerPentas.pos === 0)
                result='winning'
            else
                result = dealerPentas.pos < playerPentas.pos?'winning':'losing'
        }
        else if(dealerQuads.pos >= 0 || playerQuads.pos >= 0)
        {
            if(dealerQuads.pos === 0)
                result='losing'
            else if( playerQuads.pos === 0)
                result='winning'
            else
                result = dealerQuads.pos < playerQuads.pos?'winning':'losing'
        }
        else if((dealerTriples.pos >= 0 && dealerPairs.pos >= 0) || (playerTriples.pos >= 0 && playerPairs.pos >= 0))
        {
            if((dealerTriples.pos >= 0 && dealerPairs.pos >= 0) && (playerPairs.pos === -1 || playerTriples.pos === -1))
                result='losing'
            else if((dealerPairs.pos === -1 || dealerTriples.pos === 1) && (playerTriples.pos >= 0 && playerPairs.pos >= 0))
                result='winning'
            else if(dealerTriples.pos === 0)
                result='losing'
            else if(playerTriples.pos === 0)
                result='winning'
            else if (dealerTriples.pos === playerTriples.pos)
            {
                if(dealerPairs.pos === 0)
                    result='losing'
                else if(playerPairs.pos === 0)
                    result='winning'
                else
                    result = dealerPairs.pos < playerPairs.pos?'winning':'losing'
            }
            else
                result = dealerTriples.pos < playerTriples.pos?'winning':'losing'
        }
        else if(dealerTriples.pos >= 0 || playerTriples.pos >= 0)
        {
            if(dealerTriples.pos === 0)
                result='losing'
            else if( playerTriples.pos === 0)
                result='winning'
            else
                result = dealerTriples.pos < playerTriples.pos?'winning':'losing'
        }
        else if(dealerPairs.count > 1 || playerPairs.count > 1)
        {
            if(dealerPairs.count < playerPairs.count)
                result= 'winning'
            else if(dealerValue[0] === 2 && dealerPairs.count === 2)
                result= 'losing'
            else if(playerValue[0] === 2 && playerPairs.count === 2)
                result= 'winning'
            else if(playerPairs.pos === dealerPairs.pos)
            {
                const playerFirstPair = getFirstPair(playerValue,2);
                const dealerFirstPair = getFirstPair(dealerValue,2);

                result = dealerFirstPair < playerFirstPair?'winning':'losing'
            }
            else
                result = dealerPairs.pos < playerPairs.pos?'winning':'losing'
        }
        else if(dealerPairs.pos >= 0 || playerPairs.pos >= 0)
        {
            if(dealerPairs.pos === 0)
                result='losing'
            else if(playerPairs.pos === 0)
                result='winning'
            else
                result = dealerPairs.pos < playerPairs.pos?'winning':'losing'
        }
        else
            result = "losing"
    }

    if(betType === KlondikeBets.Lose)
        result = result==="losing"?"winning":"losing";

    return result
}