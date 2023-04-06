import React, { useState } from "react";
import { useCasino } from "hooks/casinoContext";
import './Message.scss'

function Message(){
    const {messages, clearMessages} = useCasino();
    const [currentMessage, setCurrentMessage] = useState(0);
    const handleClick = () =>{
        if (currentMessage < messages.length - 1) {
            setCurrentMessage(currentMessage + 1);
          } else {
            setCurrentMessage(0);
            clearMessages();
          }
    }
    return(
        <>
            {messages.length>0 && <div className="message" onClick={handleClick}>
                <span className="closer">x</span>
                {messages[currentMessage]}
            </div>
            }
        </>
    )
}

export default Message;