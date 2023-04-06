import DiceHand from "Components/DiceHand";
import { useKlondike } from "hooks/KlondikeContext"
import "./Klondike.scss";
import "styles/global.scss";
import KlondikeControls from "./KlondikeControls";
import { KlondikeBets } from "utils/klondikeUtils";

function KlondikePlayingArea(){
    const { betType, hasBet, playerDice, dealerDice, showDice, getHand } = useKlondike();

    

    const getCurrentScore =(player:boolean)=>{
        return getHand(player);
    }

    return(
        <div className="playingTable pixie center">
            <div className="playingArea">
                
                <div className="gameInfo">
                    <div className="gameTitle">
                        Pet Klondike!
                    </div>
                    <div className="instructions">                     
                        How to play:<br/>
                        Pick your bet type<br/>
                        Dealer Rolls their dice<br/>
                        Choose to double down<br/>
                        Roll your dice<br/>
                        1 is the highest value then 6.
                    </div>
                    <div className="klondikeStandings">
                        <div>
                            Dealer: { getCurrentScore(false) }
                        </div>
                        {
                            showDice &&
                            <div>
                                Player: { getCurrentScore(true) }
                            </div>
                        }
                        {
                            hasBet &&
                            <div className="betTypeDisplay">
                                Bet Type: {KlondikeBets[betType]}
                            </div>
                        }
                    </div>

                </div>
                <div className="diceDisplay">
                    <DiceHand hand={dealerDice} />
                    {
                        showDice &&
                        <DiceHand hand={playerDice} />
                    }
                </div>
            </div>
            <div className="controls">
                <KlondikeControls />
            </div>
        </div>
    )
}

export default KlondikePlayingArea