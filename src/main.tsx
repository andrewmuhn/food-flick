import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Amplify } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports.js'

Amplify.configure(awsconfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
