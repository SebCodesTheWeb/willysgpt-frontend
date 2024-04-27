import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { MediatoolThemeProvider } from '@northlight/ui'
import './index.css'
import { willysTheme } from './theme-provider.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MediatoolThemeProvider theme={willysTheme}>
      <App />
    </MediatoolThemeProvider>
  </React.StrictMode>
)
