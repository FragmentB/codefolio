import TitleScreenImage from "assets/Images/CasinoMainMenu.jpg"
import Joker from "assets/Images/Cards/red_joker.png"
import './GameLoading.scss';

function GameLoading() {
    return(

        <div className="loading">
            <img src={TitleScreenImage} alt='Loading Screen' className="loadingImg" />
            <img src={Joker} alt='spinner' className="loadingSpinner" />
        </div>
    )
}

export default GameLoading