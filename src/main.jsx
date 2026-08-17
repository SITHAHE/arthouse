import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Шрифты подключаются ДО index.css: там они уже назначены переменным
// --font-display и --font-text, и @font-face должен быть объявлен раньше.
import './fonts.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
