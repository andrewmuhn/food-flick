import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/views/LandingPage";
import VotingPage from "./components/views/VotingPage";
import ResultsPage from "./components/views/ResultsPage";
import { Authenticator } from "@aws-amplify/ui-react";
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
              <Route path="/" element={<LandingPage />} />
              <Route path="/dinnerparty/:dinnerPartyId" element={<VotingPage />} />
              <Route path="/dinnerparty/:dinnerPartyId/results" element={<ResultsPage />} />
            </Routes>
          </DinnerPartyProvider>
        </Router>
      </Authenticator>
    </>
  );
}

export default App;
