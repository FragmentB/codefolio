import { createContext, FC, PropsWithChildren, useContext, useState } from "react";
import { getDiceArray, roll } from "utils/diceUtils";
import { beatAces, compareHands, KlondikeBets, translateHand } from "utils/klondikeUtils";

export type KlondikeContextType = {
    betType: KlondikeBets;
    dealerDice: number[];
    playerDice: number[];
    hasBet: boolean;
    showDice: boolean;
    beatingAces: (player:boolean)=>boolean;
    getHand: (player:boolean)=>string;
    getDice: (player:boolean)=>number[];
    changeBet: (newBet: KlondikeBets)=>void;
    compare:()=>string;
    reset: ()=>void;
}

const defaultState: KlondikeContextType = {
    betType:  KlondikeBets.Win,
    dealerDice: [],
    playerDice: [],
    hasBet: false,
    showDice: true,
    beatingAces: () => false,
    getHand: ()=>'',
    getDice: ()=>[],
    changeBet:()=>{},
    compare: ()=>'',
    reset : ()=>{}
}

export const KlondikeContext = createContext(defaultState);
export const useKlondike = ()=> useContext(KlondikeContext);

export const KlondikeProvider: FC<PropsWithChildren> =({children}) => {
    const [betType, setBetType] = useState(defaultState.betType);
    const [dealerDice, setDealerDice] = useState(defaultState.dealerDice);
    const [playerDice, setPlayerDice] = useState(defaultState.playerDice);
    const [hasBet, setHasBet] = useState(defaultState.hasBet)
    const [showDice, setShowDice] = useState(defaultState.showDice)

    const getDice =(player = false)=>{ 
        const dice = roll(5);
        if(player)
            setPlayerDice([...dice]);
        else
        {
            
            setDealerDice([...dice]);
        }

        return dice;
    }
    
    const getHand =(player:boolean)=>{
        return translateHand(player === true? playerDice: dealerDice);
    }

    const beatingAces =(player:boolean)=>{
        return beatAces(player === true? playerDice: dealerDice)
    }
    
    const changeBet =(newBetType:KlondikeBets)=>{
        setBetType(newBetType);
        setHasBet(true);
        setShowDice(false)
    }

    const reset =()=>{
        setHasBet(false);
        setShowDice(false)
        
        setDealerDice(defaultState.dealerDice);
        setPlayerDice(defaultState.playerDice);
    }

    const compare =()=>{ 
        setShowDice(true);
        setHasBet(false);
        const playerValue = getDiceArray(playerDice);
        const dealerValue = getDiceArray(dealerDice);

        return compareHands(playerValue, dealerValue, betType);
    }

    return(
        <KlondikeContext.Provider
            value={{
                betType,
                dealerDice,
                playerDice,
                hasBet,
                showDice,
                beatingAces,
                getHand,
                getDice,
                changeBet,
                compare,
                reset,
            }}
            >
                { children }
            </KlondikeContext.Provider>
    )
}