import React, { useState } from "react";
import { useDealer } from "hooks/DealerContext";
import DealerSelect from "Components/DealerSelect";
import './Gallery.scss'
import GalleryPanel from "./GalleryPanel";

function Gallery(){
    const { dealerSelected } = useDealer();
    
    if(!dealerSelected) 
    {
        return(
            <DealerSelect game="gallery" />
        )
    }
    else
    {
        return(
            <div className="mainGallery">
               <GalleryPanel />
            </div>
        )
    }
}

export default Gallery