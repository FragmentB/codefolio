import { createContext, FC, PropsWithChildren, useContext, useEffect, useRef, useState } from "react";

export enum sfxType{
    'Dice',
    'Cards',
    'Chips',
    'Shuffle',
}
export enum musicType{
    'Menu',
    'Table',
    'GameOver',
}
export type AudioContextType = {
    bgmVolume: number,
    sfxVolume: number,
    audioPlayer?: HTMLAudioElement,
    sfxPlayer?: HTMLAudioElement,
    setMusicVolume:(newVolume: number) => void;
    setSoundVolume:(newVolume: number) => void;
    playSound:(type:sfxType) =>void;
    playMusic: (type: musicType) => void;
    pauseMusic: ()=>void;
    saveVolume: ()=>void;
}

const defaultState: AudioContextType ={
    bgmVolume: 30,
    sfxVolume: 40,
    setMusicVolume:()=>{},
    setSoundVolume:()=>{},
    playSound:()=>{},
    playMusic:()=>{},
    pauseMusic:()=>{},
    saveVolume:()=>{},
}

export const AudioContext = createContext(defaultState);
export const useAudio = ()=> useContext(AudioContext);

const loadSounds = (max:number, name:string) => {
    let sounds = [];
    for(var i = 0; i <= max; i++)
    {
        sounds.push(require(`assets/audio/sounds/${name}/${1}.ogg`));
    }
    
    return sounds
}

export const AudioProvider: FC<PropsWithChildren> =({children}) => {
    if(window.localStorage.getItem('MusicVolume') === null)
    {
        window.localStorage.setItem('MusicVolume', JSON.stringify(defaultState.bgmVolume));
    }
    if(window.localStorage.getItem('SoundVolume') === null)
    {
        window.localStorage.setItem('SoundVolume', JSON.stringify(defaultState.sfxVolume));
    }
    const menuMusic = require('assets/audio/menu/swagger.mp3');
    const tableMusic = [
        require('assets/audio/table/DistantFellow.mp3'),
        require('assets/audio/table/MakingHistory.mp3'),
        require('assets/audio/table/OneStepAtATime.wav'),
    ];

    const shuffleSounds = loadSounds(2,'shuffle');
    const diceSounds = loadSounds(3,'dice');
    const cardSounds = loadSounds(4,'cards');
    const chipSounds = loadSounds(6,'chips');

    const localSoundVolume = Number(localStorage.getItem('SoundVolume'))??defaultState.sfxVolume
    const localMusicVolume = Number(localStorage.getItem('MusicVolume'))??defaultState.bgmVolume

    const [sfxVolume, setSFXVolume] = useState(localSoundVolume)
    const [bgmVolume, setBGMVolume] = useState(localMusicVolume)
    const [playing, setPlaying] = useState(false);

    const audioPlayer = new Audio('');
    const audioRef = useRef(audioPlayer);
    audioRef.current.volume = bgmVolume/100;  

    const sfxPlayer = new Audio('');
    const sfxRef = useRef(sfxPlayer);
    sfxRef.current.volume = sfxVolume/100;

    const setMusicVolume =(newVolume: number)=>{
        setBGMVolume(newVolume);
    }

    const setSoundVolume =(newVolume: number)=>{
        setSFXVolume(newVolume);
    }

    const saveVolume =()=>{
        window.localStorage.setItem('MusicVolume', JSON.stringify(bgmVolume));
        window.localStorage.setItem('SoundVolume', JSON.stringify(sfxVolume));
    }

    const playSound =(type:sfxType)=>{
        let sounds = []
        switch(type)
        {
            case(sfxType.Shuffle):
            sounds = shuffleSounds;
            break;
            case(sfxType.Dice):
            sounds = diceSounds;
            break;
            case(sfxType.Cards):
            sounds = cardSounds;
            break;
            case(sfxType.Chips):
            default:
            sounds = chipSounds;
            break;
        }

        const sfxNum = Math.floor(Math.random() * sounds.length)
        sfxRef.current.pause();
        sfxRef.current.src = sounds[sfxNum];
        sfxRef.current.loop = false;
        sfxRef.current.muted = false;
        sfxRef.current.volume = sfxVolume/100;
        sfxRef.current.play();
    }

    const playMusic =(type: musicType)=>{
        if(type === musicType.Menu)
        {
            console.log(audioRef.current.src)
            if(!audioRef.current.src.includes(menuMusic))
            {
                audioRef.current.pause();
                audioRef.current.src = menuMusic;
                audioRef.current.loop = true;
                audioRef.current.muted = false;
                audioRef.current.volume = bgmVolume/100;
                audioRef.current.play();
            }
        }
        if(type === musicType.Table)
        {
            audioRef.current.pause();
            const trackNum = Math.floor(Math.random() * tableMusic.length)
            audioRef.current.src = tableMusic[trackNum]
            audioRef.current.loop = true;
            audioRef.current.muted = false;
            audioRef.current.volume = bgmVolume/100;
            audioRef.current.play();
        }
    }

    const pauseMusic =()=>{
        audioRef.current.pause();
        setPlaying(false);
    }

    useEffect(() => {
        if (audioRef) {
          audioRef.current.volume = bgmVolume / 100;
        }
      }, [bgmVolume, audioRef]);

    useEffect(() => {
        if (sfxRef) {
            let sound = false;
            if(sfxRef.current.volume !== sfxVolume / 100)
            {
                sound = true;
            }
            sfxRef.current.volume = sfxVolume / 100;
            if(sound)
            {
                playSound(sfxType.Shuffle);
            }
        }
      }, [sfxVolume, sfxRef, playSound]);

    return(
        <AudioContext.Provider
            value={{
                bgmVolume,
                sfxVolume,
                audioPlayer,
                sfxPlayer,
                setMusicVolume,
                setSoundVolume,
                playSound,
                playMusic,
                pauseMusic,
                saveVolume,
            }}
            >
                { children }
            </AudioContext.Provider>
    )
}