import React from "react";
import Card from "Components/Card";
import { useDealer } from "hooks/DealerContext";
import './Hand.scss'

export interface HandProps {
    numToHide:number;
    hand: string[];
}

function Hand(props:HandProps){
    const { dealer } = useDealer()
    return (
        <div className="hand">
            {
                props.hand.map((card, i) => {
                    const cardFace = require(`assets/Images/Cards/${card}.png`);
                    const cardImg = (props.numToHide-1) >= i? dealer.deckImage: cardFace;

                    return <Card key={i} cardName={card} image={cardImg} />
                })
            }
        </div>
    )
}

export default Hand;