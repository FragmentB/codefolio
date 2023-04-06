import React, { useEffect } from "react";
import './DealerPanel.scss'
import 'styles/global.scss';
import PlayerStats from "Components/PlayerStats";
import { useDealer } from "hooks/DealerContext";
import { useCasino } from "hooks/casinoContext";

function DealerPanel() {
    const {dealer, getQuote} = useDealer();
    const {sendMessages, setLoaded} = useCasino();

    useEffect(()=>{

        const greeting = getQuote("greeting");
        sendMessages([greeting]);
    },[])

    return(
        <div className="dealerPanel">
            <div >
                <img className="dealerImage" onLoad={()=>setLoaded(true)} src={dealer.currentOutfit} alt='' />
            </div>
            <div className="dealerInfo">
                <div className="dealerName bubblegum center">
                    Dealer: {dealer.dealerName}
                </div>
                    <PlayerStats />
            </div>
        </div>
    )

}

export default DealerPanel