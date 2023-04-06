import { useState, createContext, FC, PropsWithChildren, useContext } from "react";
import dealers from 'data/dealers.json'

export type Dealer = {
    defaultCost: number,
    dealerName: string;
    outfitNumber: number;
    availableGames: string;
    nextOutfit: number;
    outfitList: string[];
    maxOutfits: number;
    quotes: {};
    currentOutfit: string;
    gameOverImg: string;
    deckImage: string;
    age: number;
    info: string;
    species: string;
}

const defaultDealer: Dealer ={
    defaultCost: 0,
    dealerName: '',
    outfitNumber: 0,
    nextOutfit: 1,
    outfitList: [],
    maxOutfits: 0,
    quotes: {},
    availableGames: '',
    currentOutfit: '',
    gameOverImg: '',
    deckImage: '',
    age: 18,
    info: '',
    species: 'Human'
}

export type DealerContextType = {
    dealer: Dealer,
    dealerSelected: boolean,
    changeOutfit:(outfitNum: number) => void;
    getQuote:(type:string) => string;
    loadDealer: (dealerName:string) => void;
    ListDealersByGame :(type:string) => string[];
    ListAllDealers :() => string[];
    GetRandomDealer: (type:string) => string;
    GetDealerImage: (dealer:string) => string;
    unloadDealer: () => void;
    getUnlockedOutfits: () => string[];
};

const defaultState: DealerContextType ={
    dealer: defaultDealer,
    dealerSelected: false,
    changeOutfit: () => {},
    getQuote:() => '',
    loadDealer: () => {},
    ListDealersByGame:() => [''],
    ListAllDealers:() => [''],
    GetRandomDealer: () => '',
    GetDealerImage: () => '',
    unloadDealer: () => {},
    getUnlockedOutfits: () => [''],
}

const getOutfits = (max:number, name:string) => {
    let outfits = [];
    for(var i = 1; i <= max; i++)
    {
        const imageName = `${name}/${name}${i.toString()}.jpg`;
        outfits.push(require(`assets/Images/Dealers/${imageName}`));
    }
    
    return outfits
}

const ListDealersByGame = (gameName:string ) => {
    const availableDealers = dealers.filter(dealer => dealer.availableGames.includes(gameName))
    return availableDealers.map(dealer =>{ return dealer.dealerName;});
}

const ListAllDealers = () => {
    return dealers.map(dealer => { return dealer.dealerName})
}

const GetRandomDealer =(gameName:string)=> {
    const dealers = ListDealersByGame(gameName);

    const dealer = dealers[Math.floor(Math.random()*dealers.length)];

    return dealer;
}

export const DealerContext = createContext(defaultState);
export const useDealer = () => useContext(DealerContext);

export const DealerProvider: FC<PropsWithChildren> = ({children}) => {
    const [dealer, setDealer] = useState(defaultState.dealer);
    const [dealerSelected, setDealerSelected] = useState(defaultState.dealerSelected)

    const loadDealer = (dealerName:string) => {
        const rawDealer = dealers.find(dealer => dealer.dealerName === dealerName)
        let newDealer : Dealer = defaultDealer;

        

        if(rawDealer)
        {
            newDealer.dealerName = rawDealer.dealerName;
            newDealer.outfitNumber = 0;
            newDealer.nextOutfit = 1;
            newDealer.defaultCost = parseInt(rawDealer.defaultCost);
            newDealer.maxOutfits = parseInt(rawDealer.maxOutfits);
            newDealer.quotes = rawDealer.quotes;
            newDealer.outfitList = getOutfits(newDealer.maxOutfits, newDealer.dealerName);
            newDealer.currentOutfit = newDealer.outfitList[0];
            newDealer.gameOverImg = require(`assets/Images/Dealers/${rawDealer.dealerName}/GameOver.jpg`);
            newDealer.deckImage = require(`assets/Images/Dealers/${rawDealer.dealerName}/Deck.jpg`);
            newDealer.availableGames = rawDealer.availableGames
            newDealer.age = rawDealer.age;
            newDealer.info = rawDealer.info;
            newDealer.species = rawDealer.species
        }
        setDealer(newDealer);
        setDealerSelected(true);
    }

    const getQuote = (type:string) => {
        const quoteList: { [key: string]: string[] } = dealer.quotes;
        let quotes: string[] = [];

         Object.keys(quoteList).forEach(
        (quoteType) => {
            if(quoteType === type)
            {
                quotes.push(...quoteList[quoteType]);
            }
        })

        const quote = quotes[Math.floor(Math.random()*quotes.length)];
        return quote;
    }

    const GetDealerImage =(dealer:string) =>{
        return require(`assets/Images/Dealers/${dealer}/Deck.jpg`);
    }

    const getUnlockedOutfits =()=>{
        const name = dealer.dealerName;

        let outfits = [];
        outfits.push(dealer.deckImage);
        outfits.push(dealer.gameOverImg)
        const max =dealer.maxOutfits;
        
        for(var i = 1; i <= max; i++)
        {
            const imageName = `${name}/${name}${i.toString()}.jpg`;
            outfits.push(require(`assets/Images/Dealers/${imageName}`));
        }

        return outfits
    }
    
    const unloadDealer = () =>
    {
        setDealer(defaultDealer);
        setDealerSelected(false);
    }

    const changeOutfit = (outfitNum:number) => {

        let newDealer = {...dealer}
        newDealer.outfitNumber = outfitNum;
        newDealer.currentOutfit = dealer.outfitList[outfitNum];
        outfitNum++;
        newDealer.nextOutfit = outfitNum <= dealer.maxOutfits ? outfitNum : 0

        setDealer(newDealer);

    }

    return(
        <DealerContext.Provider
        value={{
            dealer,
            dealerSelected,
            changeOutfit,
            getQuote,
            loadDealer,
            ListDealersByGame,
            ListAllDealers,
            GetRandomDealer,
            GetDealerImage,
            unloadDealer,
            getUnlockedOutfits,
        }}>
            { children }
        </DealerContext.Provider>
    )
}

