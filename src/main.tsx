import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/home'
import APP from './pages/contact'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <APP />
  </StrictMode>,
)
