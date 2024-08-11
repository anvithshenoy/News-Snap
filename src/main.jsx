import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FullScreenDrawer from './Component/Drawer/FullscreenDrawer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route
          path='/'
          element={<App />}
        />
        <Route
          path='/article'
          element={<FullScreenDrawer />}
        />
      </Routes>
    </Router>
  </StrictMode>
)
