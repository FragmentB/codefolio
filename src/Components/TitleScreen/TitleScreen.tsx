import React, { useEffect } from 'react'
import './TitleScreen.scss';
import 'styles/global.scss'
import TitleScreenImage from "assets/Images/CasinoMainMenu.jpg"
import MainMenu from 'Components/MainMenu';
import { useDealer } from 'hooks/DealerContext';
import { musicType, useAudio } from 'hooks/AudioContext';
import { useCasino } from 'hooks/casinoContext';

function TitleScreen(){
    const { unloadDealer, dealerSelected }= useDealer()
    const { gameStarted, startGame } = useCasino();
    const { playMusic } = useAudio();

    useEffect(()=>{
        if(dealerSelected)
        unloadDealer();
    },[dealerSelected, unloadDealer])

    useEffect(()=>{
        if(gameStarted)
        {
            playMusic(musicType.Menu);        
        }
    } ,[])

    const playGame = ()=>{
        playMusic(musicType.Menu);
        startGame();
    }

    return (
        <div className="titlePage" >
            <img className="titleImage" src={TitleScreenImage} alt= "Pet Casino" /> 
            <div className="titleText risque">
                <div className='bigTitle'>Jessie Butler's</div>
                Pet Casino
            </div>
            {
                gameStarted && <MainMenu />
            }
            {
                !gameStarted && <button className="titleButton gameButton wideButton"  onClick={()=>playGame()}>
                Play!</button>
            }
        </div>
    )
}

export default TitleScreen;