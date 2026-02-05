import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
    <Toaster position="top-right"
      expand={false}
      richColors
      closeButton
      duration={3000}
      toastOptions={{
        style: {
          background: '#1e293b', // slate-800
          border: '1px solid #334155', // slate-700
          color: '#f1f5f9', // slate-100
        },
        className: 'toast-custom',
      }} />
  </BrowserRouter>,
)
