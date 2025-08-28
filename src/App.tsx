import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider } from './state/GameContext';
import CaseSelect from './routes/CaseSelect';
import AvatarBuilder from './routes/AvatarBuilder';
import MapView from './routes/MapView';
import PlaceCharacters from './routes/PlaceCharacters';
import DialogRunner from './routes/DialogRunner';
import LinkingBoard from './routes/LinkingBoard';
import ScorePanel from './routes/ScorePanel';
import Footer from './components/Footer';

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
          <Routes>
            <Route path="/" element={<CaseSelect />} />
            <Route path="/avatar" element={<AvatarBuilder />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/place/:placeId" element={<PlaceCharacters />} />
            <Route path="/dialog/:characterId" element={<DialogRunner />} />
            <Route path="/linking" element={<LinkingBoard />} />
            <Route path="/score" element={<ScorePanel />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;