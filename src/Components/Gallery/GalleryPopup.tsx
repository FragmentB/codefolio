import React from "react";

export interface GalleryPopupProps{
    show:boolean,
    imgMax: number,
    imageNum: number,
    tempImage: string,
    changeImage:(imgNum: number)=>void,
    handleClose:()=>void
}

function GalleryPopup(props: GalleryPopupProps){
    
    const changeOutfit =(outfitNum: number) =>
    {
        props.changeImage(outfitNum)
    }

    return(
        <>
        {
            props.show && <div className="galleryPopupFader">
                <div className="galleryPopup">
                <div className="popupImageHolder">
                    <img className="galleryImage" src={props.tempImage} alt='' />
                </div>
                <div className="galleryControls">
                    <button className={props.imageNum < 1? 'disabledButton': 'gameButton'} 
                    onClick={()=>changeOutfit(props.imageNum-1)} 
                    disabled={props.imageNum < 1}>
                        Prev
                    </button>
                    <button className="gameButton" onClick={props.handleClose}>Close</button>
                    <button className={props.imageNum >= props.imgMax-1? 'disabledButton': 'gameButton'} 
                    onClick={()=>changeOutfit(props.imageNum+1)} 
                    disabled={props.imageNum >= props.imgMax-1}>
                        Next
                        </button>
                </div>
                </div>

            </div>
        }
        </>
    )
}

export default GalleryPopup