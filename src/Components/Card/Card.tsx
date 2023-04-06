import React from "react";
import 'styles/global.scss';
import './Card.scss'

export interface CardProps {
    image:string;
    cardName:string;
}

function Card(props:CardProps){
    return(
        <div className="cardHolder">
            <img className="card" src={props.image} alt={props.cardName} />
        </div>
    )
}

export default Card;