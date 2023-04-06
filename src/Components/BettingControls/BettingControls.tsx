import React from "react";
import { useCasino } from "hooks/casinoContext";
import 'styles/global.scss'
import { useAudio, sfxType } from "hooks/AudioContext";
export interface BettingProps {
    minBet:number;
    maxBet: number;
    interval: number;
    visible: boolean;
}

function BettingControls(props:BettingProps){
    const { playSound } = useAudio();
    const { bet,cash,updateBet,sendMessages} = useCasino();

    const changeBet =(increase:boolean)=>{
        const betChange = props.interval *  (increase? 1: -1);
        const newBet = bet + betChange
        if(newBet > 0 && newBet <= cash)
        {
            playSound(sfxType.Chips);
            updateBet(newBet);
        }
        else if(cash<newBet)
        {
            playSound(sfxType.Chips);
            updateBet(cash);
        }
        else
            sendMessages(['Nope!'])
    }

    return(
        <>
        Current Bet: ${bet} 
        {
            bet < cash && bet < props.maxBet && props.visible &&
            <button className="gameButton wideButton" onClick={()=>changeBet(true)}>Increase Bet!</button>
        }
        {
            bet > props.minBet && props.visible &&
            <button className="gameButton wideButton" onClick={()=>changeBet(false)}>Decrease Bet!</button>
        }
        </>
    )

}

export default BettingControls;