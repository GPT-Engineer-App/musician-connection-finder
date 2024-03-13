import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index.jsx";

function App() {
  const [profiles, setProfiles] = useState([]);

  const addProfile = (newProfile) => {
    setProfiles([...profiles, newProfile]);
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index profiles={profiles} addProfile={addProfile} />} />
      </Routes>
    </Router>
  );
}

export default App;
