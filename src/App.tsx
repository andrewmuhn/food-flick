import './App.css'
import { Authenticator } from '@aws-amplify/ui-react'
import HelloWorld from './components/HelloWorld'

function App() {

  return (
    <>
      <Authenticator>
        <HelloWorld/>
      </Authenticator>
    </>
  )
}

export default App
