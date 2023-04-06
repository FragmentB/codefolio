import React from "react";
import './DealerSelectButton.scss'
import 'styles/global.scss';

export interface DealerButtonProps {
  name: string,
  image: string,
  onClick: ()=>void,
}

function DealerSelectButton (props:DealerButtonProps){
    return(
        <div className='dealerButton' onClick={()=>props.onClick()}>
            <img src={props.image} className='card' alt={`${props.name} wants to Deal`} />
            <div className="pixie">{props.name}</div>
        </div>  
    );
}

export default DealerSelectButton;