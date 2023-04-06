import Die from 'Components/Die'
import './DiceHand.scss'

export interface DiceHandProps {
    hand: number[]
}

function DiceHand(props:DiceHandProps){
    return (
        <div className='hand'>
            {
                props.hand.map((die,i) => {
                    const dieFace = require(`assets/Images/Dice/${die}.png`)

                    return <Die key={i} dieValue={die} image={dieFace} />

                })
            }
        </div>
    )
}

export default DiceHand;