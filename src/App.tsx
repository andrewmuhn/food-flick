import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/views/LandingPage";
import { Authenticator } from "@aws-amplify/ui-react";
import VotingPage from "./components/views/VotingPage";
import NavBar from "./components/Navbar";
import { DinnerPartyProvider } from "./components/Context/DinnerPartyContext";

function App() {
  return (
    <>
      <Authenticator>
        <NavBar />
        <Router>
          <DinnerPartyProvider>
            <Routes>
              <Route path="/" Component={LandingPage} />
              <Route path="/vote/:dinnerPartyId" Component={VotingPage} />
            </Routes>
          </DinnerPartyProvider>
        </Router>
      </Authenticator>
    </>
  );
}

export default App;
