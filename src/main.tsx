import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Toaster position="top-center" />
    <App />
  </>,
)
