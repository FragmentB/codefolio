import './Die.scss'

export interface DieProps{
    image:string;
    dieValue: number;
}

const diceFaces =
['',
 'one', 
 'two', 
 'three', 
 'four', 
 'five', 
 'six'];

function Die(props: DieProps){
    return(
        <div className='dieHolder'>
            <img className='die' src={ props.image } alt={ diceFaces[props.dieValue]} />
        </div>
    )
}

export default Die