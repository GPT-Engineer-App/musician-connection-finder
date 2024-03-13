import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index.jsx";
import Header from "./components/Header.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  const [profiles, setProfiles] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const addProfile = (newProfile) => {
    setProfiles([...profiles, newProfile]);
  };

  return (
    <Router>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route exact path="/" element={<Index profiles={profiles} addProfile={addProfile} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
