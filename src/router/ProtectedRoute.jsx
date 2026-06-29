import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  // TODO: Add authentication check here
  // For now, allowing access. Replace with real auth logic
  const isAuthenticated = true; // Change based on your auth state

  return isAuthenticated ? children : <Navigate to="/" replace />;
}
