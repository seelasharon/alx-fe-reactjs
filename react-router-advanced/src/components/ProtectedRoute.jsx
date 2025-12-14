import { Navigate, Outlet } from "react-router-dom";

// Simulate authentication status
const isAuthenticated = () => {
  // Change this to false to simulate a logged-out user
  return localStorage.getItem("isLoggedIn") === "true";
};

export default function ProtectedRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}
