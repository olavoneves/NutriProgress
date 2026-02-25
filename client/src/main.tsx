import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { setupInterceptors } from '@lib/api'
import './styles/reset.css'
import './styles/variables.css'
import './styles/global.css'
import App from './App'

// Configura interceptors do Axios antes do render
setupInterceptors();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
