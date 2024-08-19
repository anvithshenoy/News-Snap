import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import BitcoinProvider from './context/Bitcoin/BitcoinProvider.jsx'
import WeatherProvider from './context/Weather/WeatherProvider.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <WeatherProvider>
        <BitcoinProvider>
          <App />
        </BitcoinProvider>
      </WeatherProvider>
    </QueryClientProvider>
  </StrictMode>
)
