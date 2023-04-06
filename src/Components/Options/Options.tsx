import React, { useState } from "react";
import { defaultCash, useCasino } from "hooks/casinoContext";
import { Link, Navigate } from "react-router-dom";
import 'styles/global.scss'
import './Options.scss'
import WarningModal from "Components/WarningModal";
import { useAudio } from "hooks/AudioContext";

function Options(){
    const defaultImg = require('assets/Images/Options.jpg');
    
    const [cashResetWarning,setCashResetWarning] = useState(false);
    const {reset, gameStarted} = useCasino();
    const { sfxVolume, bgmVolume, saveVolume, setMusicVolume, setSoundVolume} = useAudio()
    
    const resetCashWarning = `This will reset your cash to $${defaultCash}.`;
    
    const resetCash =()=>{
        reset();
        setCashResetWarning(false);
    }
    const hideCashReset = ()=>{
        setCashResetWarning(false);
    }

    const setBGMVolume = (e: { target: { value: string; }; }) =>{
       setMusicVolume(Number(e.target.value));
    }
    const setSFXVolume = (e: { target: { value: string; }; }) =>{
        setSoundVolume(Number(e.target.value));
     }

    if(!gameStarted){
        return( 
        <Navigate to="/" replace={true} />
        )
    }

    return(
        <div className="gameTable">
            <div className="optionPanel">
                <img className="optionImage" alt='' src={defaultImg} />
            </div>
            <div className="optionList center">
                <div className="soundControls"> 
                    Audio Options.
                    <div>
                        <div className="volumeLabel">
                            BGM Volume: {bgmVolume}%
                        </div>
                        <input type='range' className="volumeSlider"
                        onChange={setBGMVolume}
                        min={0} max={100} defaultValue={bgmVolume} step={5}></input>
                    </div>

                    <div>
                        <div className="volumeLabel">
                            SfX Volume: {sfxVolume}%
                        </div>
                        <input type='range' className="volumeSlider"
                        onChange={setSFXVolume}
                        min={0} max={100} defaultValue={sfxVolume} step={5}></input>
                    </div>

                    <button className="button wideButton" onClick={()=>saveVolume()}>Save Audio Options</button>
                </div>
                <div className="dangerBelow">
                    <div>
                        This is the Danger Zone!!
                    </div>
                    <button className="button wideButton" onClick={()=>setCashResetWarning(true)}>Reset Cash</button>
                    <WarningModal show={cashResetWarning} handleClose={hideCashReset} handleAccept={resetCash} message={resetCashWarning}/>
                    <br/>
                </div>
                <div>
                    <Link className="wideButton button" to={'/Casino'}> {'Back to Menu'}</Link>
                </div>
            </div>
        </div>
    )
}

export default Options