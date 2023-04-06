import React, { useState, useEffect } from "react";
import { useKlondike } from 'hooks/KlondikeContext'
import { useCasino } from "hooks/casinoContext";
import { useDealer } from "hooks/DealerContext";
import 'styles/global.scss'
import { KlondikeBets } from 'utils/klondikeUtils';
import BettingControls from "Components/BettingControls";
import gameInfo from 'data/games.json'
import { useAudio, sfxType } from "hooks/AudioContext";

function KlondikeControls(){
    const { betType, hasBet, getDice, changeBet, compare, beatingAces, reset } = useKlondike();
    const { getQuote, dealer } = useDealer();
    const { playSound } = useAudio();
    const { sendMessages, updateGameOver, updateCash, getWinnings, bet, cash, messages, updateBet} = useCasino();
    const [ canDouble, setCanDouble ] = useState(false);
    const [ handOver, setHandOver ] = useState(false);

    const klondikeInfo = gameInfo.find(x=>x.game === 'klondike');
    const maxBet = klondikeInfo? klondikeInfo.maxBet :100;
    const minBet = klondikeInfo? klondikeInfo.minBet :15;

    useEffect(()=>{
        updateBet(minBet);
    },[])

    const newHand =(type:KlondikeBets = KlondikeBets.Win)=>
    {
        if(cash <= 0)
             updateGameOver(true, dealer.dealerName);
        else{
            if(bet>cash)
            {
                sendMessages([getQuote('deny')]);
            }
            else
            {
                playSound(sfxType.Dice);
                let newCash = cash-bet;
                const newMessages =[...messages];
                const quote = getQuote('dealing');
                newMessages.push(quote);
                getDice(false);
                setCanDouble(beatingAces(false) && betType !== KlondikeBets["Beat 2 Aces"])
                changeBet(type);
                updateCash(newCash);
                sendMessages(newMessages);      
                getDice(true);
            }
        }
    }

    const startOver =()=>{
        setHandOver(false)
        reset();
    }

    const showdown =(double: boolean = false)=>{
  
        playSound(sfxType.Dice);
        let newCash = cash;
        const newMessages = [...messages]
        if(double)
        {
            playSound(sfxType.Chips);
            newCash-=bet;
            newMessages.push(getQuote('tense'));
        }
        const result = compare();
        newMessages.push(getQuote(result));
        newCash += getWinnings(result, false);
        setHandOver(true);
        updateCash(newCash);
        sendMessages(newMessages)
        if(newCash <= 0)
             updateGameOver(true, dealer.dealerName);
    }

    return (
    <div>
        <div className="buttonRow">
            {
                !hasBet && !handOver &&
                <button className="gameButton wideButton" onClick={()=>newHand(KlondikeBets["Beat 2 Aces"])}>Beat Two Aces</button>
            }
            {
                !hasBet && !handOver &&
                <button className="gameButton wideButton" onClick={()=>newHand(KlondikeBets.Lose)}>Play to Lose</button>
            }
            {
                !hasBet && !handOver &&
                <button className="gameButton wideButton" onClick={()=>newHand(KlondikeBets.Win)}>Play to Win</button>
            }
            {
                hasBet && 
                <button className="gameButton wideButton" onClick={()=>showdown(false)}>Roll</button>
            }
            {   
                canDouble && hasBet &&
                <button className="gameButton wideButton" onClick={()=>showdown(true)}>Double Down</button>
            }
            {
                handOver &&
                <button className="gameButton wideButton" onClick={()=>startOver()}>Play Again</button>
            }
        </div>
        <div className="buttonRow">
            <BettingControls maxBet={maxBet} minBet={minBet} interval={5} visible={!hasBet && !handOver } />
        </div> 
    </div>
    )
}


export default KlondikeControls