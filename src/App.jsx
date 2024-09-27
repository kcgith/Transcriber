import React from 'react'
import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import MainPage from './Pages/MainPage'


function App() {
 return (
  <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mainpage" element={<MainPage />} />
      </Routes>
  </Router>
  );
}
export default App
