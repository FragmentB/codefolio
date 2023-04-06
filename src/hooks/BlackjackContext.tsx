import { useState, createContext, FC, PropsWithChildren, useContext } from "react";
import { shuffleDecks, getCard } from "utils/cardUtils";

type dealtHand = { player:number ,dealer:number };

export type BlackjackContextType = {
    deck: string[];
    dealerHand: string[];
    playerHand: string[];
    playerSum: number;
    dealerSum: number;
    deckCount: number;
    showdown: boolean;
    handActive: boolean;
    secondHand: string[];
    secondSum: number;
    deal:()=>dealtHand;
    hit:(player:boolean, second:boolean)=>number
    compare:(double:boolean, split:boolean)=>string;
    shuffle:()=>void;
    split:()=>void;
}

const defaultDealtHand:dealtHand ={
    player:0,
    dealer:0
}

const defaultState: BlackjackContextType ={
    deck: [],
    dealerHand: [],
    playerHand: [],
    playerSum: 0, 
    dealerSum: 0,
    deckCount: 1,
    showdown:false,
    handActive:false,
    secondHand:[],
    secondSum: 0,
    deal:()=>defaultDealtHand,
    hit:()=>0,
    compare:()=>'',
    shuffle:()=>{},
    split:()=>{}
}

export const calculateHandValue =(hand:string[], dealer:boolean=false, showdown:boolean=false)=>{
    let value = 0;
    let aceCount = 0;

    if(dealer && !showdown)
    {
        hand.splice(0,1)
    }
    
    hand.forEach(card => {
        const cardPrefix = card.split('_')[0]; 
        switch(cardPrefix){
            case 'ace':
                aceCount += 1;
                value +=1;
                break;
            case 'jack':
            case 'queen':
            case 'king':
                value += 10
                break;
            default:
                value += parseInt(card);
                break;
        };
    });


    while(aceCount > 0)
    {
        if(dealer === true)
        {
            const compareValue = value + 10;
            if(compareValue < 16 || (compareValue>=17 && compareValue <=21))
            {
                value += 10;
            }
        }
        else if((value + 10) <= 21)
        {
            value += 10;
        }
        aceCount --;
    }

    return value;

}

export const BlackjackContext = createContext(defaultState);
export const useBlackjack = ()=> useContext(BlackjackContext);

export const BlackjackProvider: FC<PropsWithChildren> =({children}) => {
    const [deck, setDeck] = useState([] as string[]);
    const [dealerHand, setDealerHand] = useState([] as string[]);
    const [playerHand, setPlayerHand] = useState([] as string[]);
    const [dealerSum, setDealerSum] = useState(0);
    const [playerSum, setPlayerSum] = useState(0);
    const [deckCount,] = useState(2);
    const [secondHand, setSecondHand] = useState([] as string[]);
    const [secondSum, setSecondSum] = useState(0);
    const [showdown, setShowdown] = useState(defaultState.showdown);
    const [handActive, setHandActive] = useState(defaultState.handActive);

    const shuffle =()=>
    {
        const newDeck = shuffleDecks(deckCount);
        
        setShowdown(false);
        setPlayerHand([]);
        setPlayerSum(0);
        setDealerHand([]);
        setDealerSum(0);
        setDeck([...newDeck])
    }

    const deal =()=>{
        let newDeck = [...deck]
        
        let card:{ drawnCard:string, updatedDeck:string[] } = getCard(newDeck);
        const newPlayerHand = [card.drawnCard];
        newDeck = [...card.updatedDeck];
        
        card = getCard(newDeck);
        const newDealerHand = [card.drawnCard];
        newDeck = [...card.updatedDeck];
        
        card = getCard(newDeck);
        newPlayerHand.push(card.drawnCard);
        newDeck = [...card.updatedDeck];
        
        card = getCard(newDeck);
        newDealerHand.push(card.drawnCard);
        newDeck = [...card.updatedDeck];
        
        const dealerCheck = calculateHandValue([...newDealerHand], true, true)
        const playerValue = calculateHandValue(newPlayerHand);
        const dealerValue = calculateHandValue([...newDealerHand], true, playerValue === 21);

        setShowdown(playerValue === 21 || dealerCheck === 21);
        setPlayerHand([...newPlayerHand]);
        setPlayerSum(playerValue);
        setDealerHand([...newDealerHand]);
        setDealerSum(dealerCheck === 21? dealerCheck: dealerValue);
        setSecondHand([]);
        setSecondSum(0);
        setDeck([...newDeck])
        setHandActive(true);

        return { player:playerValue, dealer: dealerCheck }
    }

    const hit =(player:boolean, second:boolean)=>{
        const { drawnCard, updatedDeck } = getCard(deck);
        setDeck(updatedDeck);
        if(player)
        {
            if(second)
            {
                const newHand = [...secondHand, drawnCard];
                setSecondHand(newHand);
                const value = calculateHandValue(newHand);
                setSecondSum(value);
                setShowdown(value > 21 && playerSum > 21)
                return value;
            }
            else
            {
                const newHand = [...playerHand, drawnCard];
                setPlayerHand(newHand);
                const value = calculateHandValue(newHand);
                setPlayerSum(value);
                setShowdown(value > 21 && (secondSum === 0 || secondSum > 21))
                return value;
            }
        }
        else
        {
            const newHand = [...dealerHand, drawnCard];
            setDealerHand(newHand);
            const value = calculateHandValue( newHand, true, showdown);
            setDealerSum(value);
            return value;
        }
    }

    const split =()=>
    {
        const newPlayerHand = [...playerHand];
        const secondHand = []
        secondHand.push(newPlayerHand.pop()??'')
        let newDeck = [...deck]

        let card:{ drawnCard:string, updatedDeck:string[] }  = getCard(newDeck);
        newPlayerHand.push(card.drawnCard);
        newDeck = [...card.updatedDeck];
        
        card = getCard(newDeck);
        secondHand.push(card.drawnCard);
        newDeck = [...card.updatedDeck];

        const secondValue = calculateHandValue(secondHand);
        const playerValue = calculateHandValue(playerHand)

        setSecondHand([...secondHand]);
        setSecondSum(secondValue);    
        setPlayerHand([...newPlayerHand]);
        setPlayerSum(playerValue);
        setDeck([...newDeck])
    }

    const compare =(double:boolean, split:boolean)=>{
        const newShowdown = true;
        let newDeck = [...deck]
        let newDealerHand = [...dealerHand];
        let dealerValue = calculateHandValue(newDealerHand,true,newShowdown);

        let newPlayerHand = [...playerHand];
        let playerValue = playerSum;

        if(split)
        {
            newPlayerHand = [...secondHand];
            playerValue = secondSum;
        }

        if(double)
        {
            const { drawnCard, updatedDeck } = getCard(newDeck);
            newDeck = [...updatedDeck];
            newPlayerHand.push(drawnCard);
            playerValue = calculateHandValue(newPlayerHand);
        }

        while(dealerValue < 17)
        {
            const { drawnCard, updatedDeck } = getCard(newDeck);
            newDeck = [...updatedDeck];
            newDealerHand.push(drawnCard);
            dealerValue = calculateHandValue(newDealerHand,true,newShowdown);
        }

        setDealerHand([...newDealerHand]);
        setDealerSum(dealerValue);
        setDeck([...newDeck]);
        setShowdown(newShowdown);
        if(split)
        {
            setSecondHand([...newPlayerHand]);
            setSecondSum(playerValue);    
        }
        else{

            setPlayerHand([...newPlayerHand]);
            setPlayerSum(playerValue);
        }

        if (playerValue > 21)
            return 'losing'
        else if( dealerValue > 21)
            return 'winning';
        else if( dealerValue === playerValue)
            return 'tie'
        else if (dealerValue < playerValue)
            return 'winning'
        else
            return 'losing';
    }

    return(
        <BlackjackContext.Provider
        value={{
            deck,
            playerHand,
            dealerHand,
            playerSum,
            dealerSum,
            deckCount,
            showdown,
            handActive,
            secondHand,
            secondSum,
            deal,
            hit,
            compare,
            shuffle,
            split,
        }}    
        >
            { children }
        </BlackjackContext.Provider>
    )
}