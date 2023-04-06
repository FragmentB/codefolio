import React, { useEffect } from "react";
import { useCasino } from "hooks/casinoContext";
import { useDealer } from "hooks/DealerContext";
import { useBlackjack } from "hooks/BlackjackContext";
import BettingControls from "Components/BettingControls";
import 'styles/global.scss'
import './Blackjack.scss';
import gameInfo from 'data/games.json'
import { useAudio, sfxType } from "hooks/AudioContext";

function BlackjackControls(){
    const {deal, split, hit, compare, shuffle, secondHand, showdown, deck, playerHand, playerSum, secondSum} = useBlackjack();
    const {getQuote, dealer} = useDealer();
    const {sendMessages, updateGameOver, updateCash, getWinnings, updateBet, bet, cash, messages} = useCasino();
    const { playSound } = useAudio();

    useEffect(()=>{
        playSound(sfxType.Shuffle);        
    } ,[])

    const blakjackInfo = gameInfo.find(x=>x.game === 'blackjack');
    const minDeck = blakjackInfo? blakjackInfo.minDeck : 15;
    const maxBet = blakjackInfo? blakjackInfo.maxBet :100;
    const minBet = blakjackInfo? blakjackInfo.minBet :15;

    useEffect(()=>{
        updateBet(minBet);
    },[])

    const newHand =()=>
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
                playSound(sfxType.Cards);
                let newCash = cash-bet;
                const newMessages =[...messages]
                const quote = getQuote('dealing');
                const {player, dealer} = deal()
                newMessages.push(quote);
                if(player === 21)
                {
                    if(dealer !== 21 )
                    {
                        const quote = getQuote('winning');
                        newMessages.push(quote);
                        newCash += (bet * 4)
                        playSound(sfxType.Chips);
                    }
                    else
                    {
                        const quote = getQuote('tie');
                        newMessages.push(quote);
                        newCash += bet;
                        playSound(sfxType.Chips);
                    }
                }
                else if(dealer === 21)
                {
                    const quote = getQuote('losing');
                    newMessages.push(quote);
                }
                updateCash(newCash);
                sendMessages(newMessages)
            }
        }
    }

    const newDeck =()=>
    {
        playSound(sfxType.Shuffle);
        const quotes = [getQuote('shuffle')];
        shuffle();
        sendMessages(quotes);
    }

    const draw =(second:boolean = false)=>
    {
        playSound(sfxType.Cards);
        const newMessages = [...messages]
        const value = hit(true, second);
        newMessages.push(getQuote('risk'));
        
        if(value > 21)
        {
            newMessages.push(getQuote('losing'));
            if(cash <= 0)
                 updateGameOver(true, dealer.dealerName);
        }

        sendMessages(newMessages);
    }

    const stand =(double:boolean = false)=>
    {
        let newCash = cash;
        const newMessages = [...messages]
        if(double)
        {
            playSound(sfxType.Cards);
            newCash-=bet;
            newMessages.push(getQuote('tense'));
        }
        const result = compare(double,false);

        if(secondHand.length > 0)
        {
            newCash += getWinnings(result, false);
            newMessages.push(`First Hand: ${getQuote(result)}`);
            const secondResult = compare(false,true);
            newCash += getWinnings(secondResult, false);
            newMessages.push(`Second Hand: ${getQuote(secondResult)}`)
        }
        else
        {
            newMessages.push(getQuote(result));
            newCash += getWinnings(result, double);
        }
        
        updateCash(newCash);
        sendMessages(newMessages)
        if(newCash <= 0)
             updateGameOver(true, dealer.dealerName);;
    }

    const splitHand =()=>
    {
        playSound(sfxType.Cards);
        sendMessages([getQuote('tense')]);
        updateCash(cash-bet);
        split();
    }

    return(
        <div>
            <div className="buttonRow">
                {
                    deck.length < minDeck && showdown &&
                    <button className="gameButton" onClick={()=>newDeck()}>Shuffle!</button>
                }
                {
                    (playerHand.length === 0 || showdown) && deck.length >= minDeck &&
                    <button className="gameButton" onClick={()=>newHand()}>Deal!</button>
                }
                {
                    playerHand.length > 0 && playerSum < 22 && !showdown &&
                    <button className="gameButton" onClick={()=>draw()}>Hit!</button>
                }
                {
                    secondHand.length > 0 && secondSum < 22 && !showdown &&
                    <button className="gameButton wideButton" onClick={()=>draw(true)}>Hit Hand 2!</button>
                }            
                {
                    playerHand.length > 0 && !showdown &&
                    <button className="gameButton" onClick={()=>stand()}>Stand!</button>
                }
                {
                    playerHand.length===2 && cash >= bet && !showdown &&  (playerSum >= 9 && playerSum <= 11) && secondHand.length === 0 &&
                    <button className="gameButton wideButton" onClick={()=>stand(true)}>Double Down!</button>
                    
                }
                {
                    playerHand.length===2 && cash >= bet &&  !showdown && (playerHand[0].split('_')[0] === playerHand[1].split('_')[0]) && secondHand.length === 0 &&
                    <button className="gameButton" onClick={()=>splitHand()}>Split!</button>
                }
            </div>
            <div className="buttonRow">
                <BettingControls maxBet={maxBet} minBet={minBet} interval={5} visible={(playerHand.length === 0 || showdown)} />
            </div> 
        </div>
    )

}

export default BlackjackControls;