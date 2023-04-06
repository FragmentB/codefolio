import React, { useMemo } from "react";
import 'styles/global.scss';
import './PlayerStats.scss'
import { useCasino } from "hooks/casinoContext";
import { Link, Navigate  } from "react-router-dom";
import { useDealer } from "hooks/DealerContext";

function PlayerStats(){
    const {cash, updateCash, sendMessages, gameOver} = useCasino();
    const {dealer, changeOutfit,getQuote} = useDealer();
    const cost = useMemo(()=> ((dealer.nextOutfit) * dealer.defaultCost), [dealer.nextOutfit, dealer.defaultCost])
    
    return(
        <div className="playerStats pixie center">
            <div>
                Current Cash: ${cash}

                <Link className="button" to={'/Casino'}> {'Leave Table'}</Link>
            </div>
            {
                gameOver && <Navigate to="/gameOver" replace={true} />
            }
        </div>
    )
}

export default PlayerStats;