import React, { useEffect } from "react";
import Hand from "Components/Hand";
import Deck from "Components/Deck";
import BlackjackControls from "./BlackjackControls";
import { useBlackjack } from "hooks/BlackjackContext";
import 'styles/global.scss';
import './Blackjack.scss';
  
function BlackjackPlayingArea() {
    const {playerHand, secondHand, dealerSum, playerSum,dealerHand,showdown,secondSum, shuffle} = useBlackjack();

    useEffect(()=>{
        shuffle();
    },[])

    const getCurrentScore =(sum:number, length: number)=>{

        if(sum>21)
            return "Bust!"
        if(sum===21 && length ===2)
            return "Blackjack!"
        else
            return sum;
    }
    
    return(
        <div className="playingTable pixie center">
            <div className="playingArea">
                <Deck/>
                { 
                    playerSum > 0 &&
                    <div className="standings">
                        <div>
                            Dealer: {getCurrentScore(dealerSum,dealerHand.length)}
                        </div>
                        <div>
                            Player: {getCurrentScore(playerSum,playerHand.length)}
                        </div>
                        {
                            secondSum > 0 &&
                            <div>
                                Second: {getCurrentScore(secondSum,secondHand.length)}
                            </div>
                        }
                    </div>
                }
                <div className="gameInfo">
                    <div className="gameTitle">
                        Pet Blackjack!
                    </div>
                    <div className="instructions">                     
                        How to play:<br/>
                        Add up card values<br/>
                        Try to get to 21<br/>
                        Hit to draw a card<br/>
                        Face cards equals 10<br/>
                        Ace equals 1 or 11.
                    </div>             
                </div>
                  
                <div className="cardDisplay">
                    <Hand hand={dealerHand} numToHide={showdown?0:1}></Hand>
                    <Hand hand={playerHand} numToHide={0}></Hand>
                    {
                        secondHand.length > 0 &&
                        <Hand hand={secondHand} numToHide={0}></Hand>
                    }
                </div>
            </div>
            <div className="controls">
                <BlackjackControls />
            </div>        
        </div>
    )
}

export default BlackjackPlayingArea;