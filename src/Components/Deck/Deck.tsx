import { useCasino } from "hooks/casinoContext";
import { useDealer } from "hooks/DealerContext";
import React from "react";
import './Deck.scss';

function Deck(){
    const { dealer } = useDealer();
    const { setLoaded } = useCasino();
    return(
        <div className="deckPanel">
            <img src={dealer.deckImage} onLoad={()=>setLoaded(false)} className='card deck' alt='deck' />
        </div>
    )
}

export default Deck;