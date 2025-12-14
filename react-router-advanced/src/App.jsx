import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Profile from "./Profile";
import ProfileDetails from "./ProfileDetails";
import ProfileSettings from "./ProfileSettings";
import BlogPost from "./BlogPost";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the React Router demo!</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/blog/123">Blog Post 123</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />}>
            <Route path="details" element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>
        </Route>
        <Route path="/blog/:postId" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
