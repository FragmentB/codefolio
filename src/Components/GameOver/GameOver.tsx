
import Message from "Components/Message";
import { useCasino } from "hooks/casinoContext";
import { useDealer } from "hooks/DealerContext";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import 'styles/global.scss';
import './GameOver.scss'

function GameOver(){
    const { dealer, getQuote } = useDealer();
    const { sendMessages, reset } = useCasino();

    useEffect(()=>{
        const message = getQuote("gameOver");
        sendMessages([message]);
    },[])

    const restart =()=>
    {
        reset();
    }

    return(
        <div className="gameOverPage">
            <img className="gameOverImage"
             src={dealer.gameOverImg} alt= "Game Over" />
            <div className="resetArea">
                <Link className="button" onClick={restart} to={'/Casino'}> {'Restart'}</Link>
            </div>
            <Message />
        </div>
    )
}


export default GameOver;