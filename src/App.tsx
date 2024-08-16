import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/views/LandingPage";
import { Authenticator } from "@aws-amplify/ui-react";
import NavBar from "./components/Navbar";

function App() {
  return (
    <>
      <Authenticator>
        <NavBar />
        <Router>
          <Routes>
            <Route path="/" Component={LandingPage} />
          </Routes>
        </Router>
      </Authenticator>
    </>
  );
}

export default App;
