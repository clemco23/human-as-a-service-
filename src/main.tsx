import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './pages/home'
import ContactPage from './pages/contact'
import SearchPage from './pages/searchPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomePage />
    <ContactPage />
    <SearchPage />
  </StrictMode>,
)
