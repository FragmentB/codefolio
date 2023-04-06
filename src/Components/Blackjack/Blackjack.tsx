import React, { useEffect } from "react";
import DealerPanel from "Components/DealerPanel";
import Message from "Components/Message";
import BlackjackPlayingArea from "./BlackjackPlayingArea";
import { BlackjackProvider } from "hooks/BlackjackContext";
import { useCasino } from "hooks/casinoContext";
import { useDealer } from "hooks/DealerContext";
import DealerSelect from "Components/DealerSelect";
import GameLoading from "Components/GameLoading";
import 'styles/global.scss';
import { useAudio, musicType } from "hooks/AudioContext";
import { Navigate } from "react-router-dom";

function Blackjack() { 
    const { dealerLoaded, deckLoaded, gameStarted } = useCasino();
    const { dealerSelected } = useDealer();
    const { playMusic } = useAudio();

    useEffect(()=>{
        if(gameStarted)
        {
            playMusic(musicType.Table);        
        }           
    } ,[])

    if(!gameStarted){
        return( 
        <Navigate to="/" replace={true} />
        )
    }
    if(!dealerSelected)
    {
        return(
            <DealerSelect game="blackjack" />
        )
    }
    else{

        return(
            <div className="gameTable">
            {
                (!dealerLoaded || !deckLoaded) &&
                <GameLoading />

            }
            <DealerPanel />
                <BlackjackProvider>
                    <BlackjackPlayingArea />
                </BlackjackProvider>
            <Message />
            </div>
        )
    }
}

export default Blackjack