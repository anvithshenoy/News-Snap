import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import BitcoinProvider from './context/Bitcoin/BitcoinProvider.jsx'
import WeatherProvider from './context/Weather/WeatherProvider.jsx'
import CurrencyProvider from './context/currency/CurrencyProvider.jsx'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <WeatherProvider>
          <BitcoinProvider>
            <CurrencyProvider>
              <Routes>
                <Route
                  path='/'
                  element={<App />}
                />

                <Route
                  path='*'
                  element={
                    <Navigate
                      to={'/'}
                      replace
                    />
                  }
                />
              </Routes>
            </CurrencyProvider>
          </BitcoinProvider>
        </WeatherProvider>
      </QueryClientProvider>
    </Router>
  </StrictMode>
)
