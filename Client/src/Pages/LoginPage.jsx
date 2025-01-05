import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is already logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");  // Get token from localStorage
   
    
    if (token) {
      navigate("/home");  // Navigate to home page if token exists
    }
  }, [navigate]);

  // Handle form submit
  const handleToSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    
    try {
      const data = { email, password };
      console.log(data); // Log form data for debugging

      const response = await fetch("/api/user/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

     

      const result = await response.json();

      

      if (result.success) {
        toast.success(result.message || "Login Successful");

        // Store the token in localStorage
        localStorage.setItem("token", result.data);  // Assuming result.token contains the JWT

        navigate('/home');  // Navigate to home page after login
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);  // Display the error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-200">
      <div className="flex sm:flex-col md:flex-row w-full max-w-4xl px-4">
        <div className="w-full sm:w-full md:w-1/2 bg-red-600 text-white p-6 flex items-center justify-center rounded-md shadow-lg">
          <p className="text-center text-4xl tracking-wider font-semibold">
            "Welcome back! Login to continue."
          </p>
        </div>

        <div className="w-full sm:w-full md:w-1/2 bg-slate-100 p-6 rounded-md shadow-md mt-6 md:mt-0">
          <h3 className="text-4xl text-center mt-2 text-indigo-500 font-extrabold">
            Login
          </h3>
          <div className="bg-slate-300 h-[1px] mx-3 mt-3"></div>
          <div>
            <form onSubmit={handleToSubmit}>
              <div className="flex flex-col w-full items-start px-5 my-4">
                <label>Email</label>
                <input
                  type="email"
                  className="w-full p-2 border-2 outline-none rounded-md"
                  placeholder="Enter Your Email"
                  value={email} // Controlled input
                  onChange={(e) => setEmail(e.target.value)} // Update state on change
                />
              </div>

              <div className="flex flex-col w-full items-start px-5 my-4">
                <label>Password</label>
                <input
                  type="password"
                  className="w-full p-2 border-2 outline-none rounded-md"
                  placeholder="Enter Your Password"
                  value={password} // Controlled input
                  onChange={(e) => setPassword(e.target.value)} // Update state on change
                />
              </div>

              <div className="w-full flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-slate-800 text-white p-2 mb-3 rounded-lg"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>

            <div className="w-full text-center mb-4 text-slate-400">
              New Account?{" "}
              <Link to="/signup" className="text-blue-600 font-semibold">
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
