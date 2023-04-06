import React, { useState } from "react"
import './Gallery.scss'
import 'styles/global.scss'
import { useDealer } from "hooks/DealerContext";
import { Link } from "react-router-dom";
import gameInfo from 'data/games.json'
import GalleryPopup from "./GalleryPopup";

function GalleryPanel (){
    const {dealer, getUnlockedOutfits, unloadDealer} = useDealer();
    const [displayOufit, setDisplayOutfit] = useState(dealer.deckImage);
    const [popupVisible, setPopupVisible] = useState(false);
    const [oufitNum, setOutfitNum] = useState(0);

    const hidePopup = ()=>
    {
        setPopupVisible(false);
    }
    const outfitList = getUnlockedOutfits();

    const showPopup =(outfit:number)=>
    {
        setOutfitNum(outfit);
        setDisplayOutfit(outfitList[outfit])
        setPopupVisible(true);
    }

    const changeOufit =(outfit:number)=>
    {
        setOutfitNum(outfit);
        setDisplayOutfit(outfitList[outfit])
    }


    const availableGames =()=>{
        const dealerGames = dealer.availableGames.split(', ')
        const gameList = gameInfo.filter(game => dealerGames.includes(game.game))

        return gameList.map(game => {return game.label});
    }

    return(
        <div className="galleryPage">
            <div className="galleryInfo risque">
                <div className="galleryHeader center">
                    {dealer.dealerName}
                </div>
                <div className="gallerySubHeader">
                    Available Games: {availableGames().join(', ')}
                </div>
                <div className="gallerySubHeader">
                    Species: {dealer.species}
                </div>
                <div className="gallerySubHeader">
                    Age: {dealer.age}
                </div>
                <div className="center gallerySubHeader">
                    About
                    <div className="galleryText">
                        {dealer.info}
                    </div>
                </div>
                
                <div className="gallerySection">
                    <div className="gallerySubHeader center">
                        Cute Pictures
                    </div>
                    <div className="imageSelector">
                        {
                            outfitList.map((outfit, index) => {
                                return(
                                    <div key={index} className='galleryOutfit'
                                    onClick={()=>showPopup(index)} >
                                            <img className='galleryCard' alt='' src={outfit}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <GalleryPopup handleClose={hidePopup} show={popupVisible} imgMax={outfitList.length} imageNum={oufitNum} tempImage={displayOufit} changeImage={changeOufit}/>
                    <div className="galleryMenu center">
                        <Link className="wideButton button" to={'/'}> {'Back to Portfolio'}</Link>
                        <Link className="wideButton button" onClick={()=>unloadDealer()}to={'/gallery'}> {'Back to Gallery'}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GalleryPanel