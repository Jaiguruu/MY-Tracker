import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardScreen from './components/screens/DashboardScreen';
import JournalScreen from './components/screens/JournalScreen';
import ProgressScreen from './components/screens/ProgressScreen';
import SettingsScreen from './components/screens/SettingsScreen';
import FocusScreen from './components/screens/FocusScreen';
import RoadmapScreen from './components/screens/RoadmapScreen'; 
import { UserDataProvider } from './contexts/UserDataContext'; 

const App: React.FC = () => {
  return (
    <UserDataProvider>
      <HashRouter>
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
          <Navbar />
          <main className="flex-1 bg-slate-900 md:ml-20 lg:ml-24 overflow-y-auto"> 
            <Routes>
              <Route path="/" element={<DashboardScreen />} />
              <Route path="/journal" element={<JournalScreen />} />
              <Route path="/roadmap" element={<RoadmapScreen />} /> 
              <Route path="/progress" element={<ProgressScreen />} />
              <Route path="/focus" element={<FocusScreen />} /> 
              <Route path="/settings" element={<SettingsScreen />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </UserDataProvider>
  );
};

export default App;