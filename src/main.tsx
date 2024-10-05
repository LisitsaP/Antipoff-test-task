import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store, persistor } from './store.ts'
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

      <App />
    </PersistGate>
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
