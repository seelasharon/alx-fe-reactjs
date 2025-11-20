import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <Router>
      <div style={{ padding: "2rem" }}>
        <h1>GitHub User Search</h1>
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/user/:username" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
