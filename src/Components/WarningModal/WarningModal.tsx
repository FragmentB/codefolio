import 'styles/global.scss'
import './WarningModal.scss'

export interface WarningModalProps{
    show:boolean,
    handleClose: ()=>void,
    handleAccept: ()=>void,
    message:string
}

function WarningModal(props: WarningModalProps){
    return(
        <>
        {
            props.show && <div className='warningScreen'>
                <div className='warningModal'>
                    <div className='warningHeader'>Warning!</div>
                    <div className='warningMessage'>
                    { props.message }
                    </div>
                    <div className='warningButtons'>
                    <button className="gameButton wideButton" onClick={props.handleClose}>No Thanks!</button>
                    <button className="gameButton wideButton" onClick={props.handleAccept}>Just Do IT!</button>
                    </div>
                </div>
        </div>
        }</>
    )

}

export default WarningModal