import React, { useEffect } from "react";
import { useDealer } from "hooks/DealerContext";
import DealerSelectButton from "Components/DealerSelectButton";
import { Link } from "react-router-dom";
import './DealerSelect.scss'
import 'styles/global.scss';

export interface DealerSelectProps{
    game:string,
}

function DealerSelect(props:DealerSelectProps){
    const { ListAllDealers, GetRandomDealer, ListDealersByGame, loadDealer, GetDealerImage } = useDealer();

    const dealerlist = props.game !== 'gallery'? ListDealersByGame(props.game): ListAllDealers()

    useEffect(()=>{
        if(dealerlist.length === 1)
        {
            loadDealer(dealerlist[0]);
        }
    },[dealerlist])

    const randomImg = require('assets/Images/SourcapsIcon.png')
    const dealerSelectImage = require('assets/Images/DealerSelect.jpg')
    const gallerySelectImage = require('assets/Images/GallerySelect.jpg')

    const displayImage =  props.game !== 'gallery'? dealerSelectImage : gallerySelectImage;
    const displayText =  props.game !== 'gallery' ? "Select Your Dealer!" : "Select A Pet"
    return(
        <div className="dealerSelect gameTable">
            <img className="dealerSelectImage" src={displayImage} alt= "" />
            <div className="dealerSelectPanel">
                <div className="dealerSelectTitle spicy">
                    {
                        displayText
                    }
                </div>
                <div className="dealerList">                
                    {
                        dealerlist.map((dealer,i) => {
                            return <DealerSelectButton key={i} name={dealer} onClick={()=>loadDealer(dealer)} image={GetDealerImage(dealer)} />
                        })
                    }
                    {
                        props.game !== 'gallery' &&
                        <DealerSelectButton name={"Random"} onClick={()=>loadDealer(GetRandomDealer(props.game))} image={randomImg} />
                    }                                        
                </div>

                <div className="center">
                    {
                        props.game !== 'gallery' &&
                        <Link className="relative wideButton button" to={'/Casino'}> {'Back to Menu'}</Link>
                    }  
                    {
                        props.game === 'gallery' &&
                        <Link className="relative wideButton button" to={'/'}> {'Back to Portfolio'}</Link>
                    }  
                    
                </div>
            </div>
        </div>
    )
}

export default DealerSelect;