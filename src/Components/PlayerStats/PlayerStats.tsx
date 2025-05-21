import 'styles/global.scss';
import './PlayerStats.scss'
import { useCasino } from "hooks/casinoContext";
import { Link, Navigate  } from "react-router-dom";

function PlayerStats(){
    const {cash, gameOver} = useCasino();
        
    return(
        <div className="playerStats pixie center">
            <div>
                Current Cash: ${cash}

                <Link className="button" to={'/Casino'}> {'Leave Table'}</Link>
            </div>
            {
                gameOver && <Navigate to="/gameOver" replace={true} />
            }
        </div>
    )
}

export default PlayerStats;