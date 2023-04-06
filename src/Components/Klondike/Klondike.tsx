import React, { useEffect } from "react";
import { useCasino } from "hooks/casinoContext";
import { useDealer } from "hooks/DealerContext";
import DealerSelect from "Components/DealerSelect";
import GameLoading from "Components/GameLoading";
import DealerPanel from "Components/DealerPanel";
import Message from "Components/Message";
import { KlondikeProvider } from "hooks/KlondikeContext";
import './Klondike.scss';
import 'styles/global.scss';
import KlondikePlayingArea from "./KlondikePlayingArea";
import { useAudio, musicType } from "hooks/AudioContext";
import { Navigate } from "react-router-dom";

function Klondike() {
    const { dealerLoaded, gameStarted } = useCasino();
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
            <DealerSelect game="klondike" />
        )
    }
    else
    return(
        <div className="gameTable">{
                !dealerLoaded && 
                <GameLoading />
            }
            <DealerPanel />
            <KlondikeProvider>
                <KlondikePlayingArea />
            </KlondikeProvider>
            <Message />
        </div>
    )
}

export default Klondike