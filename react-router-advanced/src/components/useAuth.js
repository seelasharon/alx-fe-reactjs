// Simple auth hook for demonstration
export function useAuth() {
  return {
    isAuthenticated: localStorage.getItem("isLoggedIn") === "true"
  };
}
