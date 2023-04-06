export function roll(numDice = 1) {
    const result: number[] = [];

    for(let i = numDice; i>0; i--)
    {
        result.push(Math.floor(Math.random() * (6 - 1 + 1) +1))
    }

    return result;
}

export function countOccurance(dice:number[], face:number){

    let total = 0;
    dice.forEach(die=>{
        if(die === face)
            total++;
    })
    return total;
}

export function getDiceArray(dice:number[])
{
    let values = []
    
    for(let i = 1; i<7; i++)
    {
        values.push(countOccurance(dice,i));
    }

    return values
}

export function containsRepeats(hand:number[], value:number){
    let pos = -1;
    let count = 0;

    for (var i = 0; i < hand.length; i++){
        if(hand[i] === value)
        {
            count ++;
            pos = i;
        }
    }

    return {pos, count};
}

export function getFirstPair(hand:number[], value:number)
{
    for (var i = 0; i < hand.length; i++){
        if(hand[i] === value)
        {
            return i;
        }
    }
    return -1;
}