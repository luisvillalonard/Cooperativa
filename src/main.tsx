import ContextsProvidersApps from '@components/providers/providersTree'
import StyleProvider from '@components/providers/styles'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/">
    <StyleProvider>
      <ContextsProvidersApps>
        <App />
      </ContextsProvidersApps>
    </StyleProvider>
  </BrowserRouter>,
)
