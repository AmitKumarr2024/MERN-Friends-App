import { Navigate } from "react-router-dom";

// Assuming you are using a function to check user authentication status
const isAuthenticated = () => {
  return !!localStorage.getItem('token');  // Example check, you can use context or Redux state instead
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
