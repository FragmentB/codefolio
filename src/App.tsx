import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Portfolio from 'Components/PortFolio';
import Gallery from 'Components/Gallery';
import TitleScreen from 'Components/TitleScreen';
import Blackjack from 'Components/Blackjack';
import GameOver from 'Components/GameOver';
import Klondike from 'Components/Klondike';
import Options from 'Components/Options';
import CasinoProvider from 'hooks/casinoContext';
import { DealerProvider } from 'hooks/DealerContext';
import { AudioProvider } from 'hooks/AudioContext';

function App() {


  return (
    <CasinoProvider>
      <DealerProvider>
        <AudioProvider>
          <div className="app">
            <Routes>
              <Route path='/' element={<Portfolio />}/>
              <Route path='/blackjack' element={<Blackjack />} />
              <Route path='/klondike' element={<Klondike />} />
              <Route path='/gallery' element={<Gallery />} />
              <Route path='/options' element={<Options />} />
              <Route path='/gameOver' element={<GameOver />} />
              <Route path='/Casino' element={<TitleScreen />}/>
              <Route path='*' element={<Portfolio />}/>
            </Routes>
          </div>
        </AudioProvider>
      </DealerProvider>
    </CasinoProvider>
  );
}

export default App;

