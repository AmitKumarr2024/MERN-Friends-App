import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Pages/Home";
import Signup from "../Pages/SignupPage";
import Login from "../Pages/LoginPage";
import ProtectedRoute from "../helper/ProtectorRouter"; 
import NewRequestRecieve from "../Components/NewRequestRecieve";
import ViewFriends from "../Components/ViewFriends";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Protect the /home and /friendList routes
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/friendList",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      
      {
        path: "/newRequest",
        element: (
          <ProtectedRoute>
            <NewRequestRecieve/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/viewFriends",
        element: (
          <ProtectedRoute>
            <ViewFriends/>
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
]);

export default router;
