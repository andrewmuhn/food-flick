import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import LandingPage from './components/views/LandingPage';
import { Authenticator } from '@aws-amplify/ui-react'

function App() {

  return (
    <>
      <Authenticator>
      <Router>
        <Routes>
          <Route path="/" Component={LandingPage}/>
        </Routes>
      </Router>
      </Authenticator>
    </>
  )
}

export default App
