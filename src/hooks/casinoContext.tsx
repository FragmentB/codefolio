import { useState, createContext, FC, PropsWithChildren, useContext } from "react";

export type CasinoContextType = {
    cash: number;
    messages: string[];
    bet: number;
    dealerLoaded: boolean;
    deckLoaded: boolean;
    gameOver: boolean;
    gameStarted: boolean;
    updateCash: (newCash: number) => void;
    sendMessages: (newMessages: string[]) => void;
    clearMessages: ()=>void;
    reset: ()=>void;
    updateBet: (newBet: number)=> void;
    setLoaded: (dealer:boolean)=> void;
    updateGameOver: (newValue: boolean, dealerName: string)=> void
    getWinnings:(result:string, double:boolean)=> number
    startGame: ()=>void,
};
export const defaultCash = 150;
const defaultState: CasinoContextType ={
    cash: defaultCash,
    messages: [] as string[],
    bet:15,
    dealerLoaded: false,
    deckLoaded: false,
    gameOver: false,
    gameStarted: false,
    updateCash: ()=>{},
    sendMessages: ()=>{},
    clearMessages: ()=>{},
    reset: ()=>{},
    updateBet: ()=>{},
    setLoaded: ()=>{},
    updateGameOver: ()=>{},
    getWinnings: ()=>0,
    startGame: ()=>{},
}

export const cashMax = 999999999;

export const CasinoContext = createContext(defaultState);
export const useCasino = () => useContext(CasinoContext);

export const CasinoProvider: FC<PropsWithChildren> = ({children}) => {
    const localCash = localStorage.getItem('Cash')??defaultState.cash
    const defaultCash = localCash === 0? defaultState.cash: localCash;
    const [cash, setCash] = useState(+defaultCash);
    const [messages, setMessages] = useState(defaultState.messages);
    const [bet, setBet] = useState(defaultState.bet);
    const [dealerLoaded, setDealerLoaded] = useState(defaultState.dealerLoaded);
    const [deckLoaded, setDeckLoaded] = useState(defaultState.deckLoaded);
    const [gameOver, setGameOver] = useState(defaultState.gameOver);
    const [gameStarted, setGameStarted] = useState(defaultState.gameStarted);
    const setLoaded =(dealer:boolean) =>
    {
        if(localStorage.getItem('Cash') === null)
        {
            localStorage.setItem('Cash', JSON.stringify(defaultState.cash));
        }

        if(dealer)
            setDealerLoaded(true);
        else
            setDeckLoaded(true);
    }

    const sendMessages = (newMessages:string[]) =>
    {
        setMessages([...newMessages]);
    }

    const clearMessages = () =>
    {
        setMessages([]);
    }

    const reset = () =>{
        setGameOver(false);
        setCash(defaultState.cash);
        setBet(defaultState.bet);
        localStorage.setItem('Cash', JSON.stringify(defaultState.cash));
    }

    const updateCash = (newCash:number) => {
        
        if (newCash > cashMax)
            newCash = cashMax;            
        
        if(newCash < 0)
            newCash=0;
        
        setCash(newCash);
        localStorage.setItem('Cash', JSON.stringify(newCash));
    };

    const updateBet =(newBet: number)=>{
        if(newBet > 0 && newBet <= cash)
            setBet(newBet);
    }

    const updateGameOver = async(newValue:boolean, dealerName:string)=>
    {
        if(newValue !== true)
            localStorage.removeItem('Cash');

        const delay = (ms:number) => new Promise(res => setTimeout(res, ms));
        await delay(2000)
        setGameOver(newValue);

    }

    const startGame =()=>
    {
        setGameStarted(true);
    }

    const getWinnings =(result:string, double:boolean)=>{
        if(result === 'tie')
        {
            return bet;
        }
        else if(result === 'winning')
        {
            return bet * (double?4:2)
        }
        else 
        {
            return 0;
        }
    }

    return(
        <CasinoContext.Provider 
        value={{
            cash,
            messages,
            bet,
            dealerLoaded,
            deckLoaded,
            gameOver,
            gameStarted,
            updateCash,
            sendMessages,
            clearMessages,
            reset,
            updateBet,
            setLoaded,
            updateGameOver,
            getWinnings,
            startGame
        }}>
            { children }
        </CasinoContext.Provider>
    )
}

export default CasinoProvider