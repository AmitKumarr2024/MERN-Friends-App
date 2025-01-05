import React, { useState } from "react";
import toast,{Toaster} from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {
  const navigate= useNavigate();
  // State to store form data
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = { fullName, email, password,confirmPassword, gender }; // Create the data object

      const response = await fetch('/api/user/createUser', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Send the data as JSON in the request body
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Signup successful!"); // Handle the success case
        console.log(result.data); // You can redirect or show a success message
        navigate('/login')

      } else {
        setError(result.message || "Signup failed");
        toast.error(result.message || "Signup failed"); // Show error message if any
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message); // Show error message in case of network issues
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <Toaster  position="top-right" />
      <div className="w-full max-w-4xl px-4 flex flex-col sm:flex-col md:flex-row">
        {/* Left side (Welcome message) */}
        <div className="min-w-[370px] bg-red-600 flex items-center text-white p-4 rounded-md shadow-lg">
          <p className="text-center sm:text-xl md:text-5xl tracking-wider font-semibold">
            "Sign up today and take the first step towards unlocking your potential!"
          </p>
        </div>

        {/* Right side (Signup form) */}
        <div className="min-w-[370px] bg-slate-100 p-6">
          <h3 className="text-4xl text-center text-green-400 mt-2 font-extrabold">SignUp</h3>
          <div className="bg-slate-300 h-[1px] mx-3 mt-3"></div>
          <form onSubmit={handleSubmit}>
            {/* Full Name input */}
            <div className="flex flex-col w-full items-start px-5 my-4">
              <label>Full Name</label>
              <input
                type="text"
                className="w-full p-2 border-2 outline-none rounded-md"
                placeholder="Enter Your Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)} // Update state on change
              />
            </div>

            {/* Email input */}
            <div className="flex flex-col w-full items-start px-5 my-4">
              <label>Email</label>
              <input
                type="email"
                className="w-full p-2 border-2 outline-none rounded-md"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state on change
              />
            </div>

            {/* Password input */}
            <div className="flex flex-col w-full items-start px-5 my-4">
              <label>Password</label>
              <input
                type="password"
                className="w-full p-2 border-2 outline-none rounded-md"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state on change
              />
            </div>

            {/* Confirm Password input */}
            <div className="flex flex-col w-full items-start px-5 my-4">
              <label>Confirm Password</label>
              <input
                type="password"
                className="w-full p-2 border-2 outline-none rounded-md"
                placeholder="Confirm Your Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} // Update state on change
              />
            </div>

            {/* Gender selection */}
            <div className="flex flex-col w-full items-start px-5 my-4">
              <label className="mb-2 font-medium text-gray-700">Gender</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="w-full flex items-center justify-center">
              <button
                type="submit"
                className="bg-slate-800 text-white p-2 mb-3 rounded-lg"
                disabled={loading} // Disable the button while loading
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          {/* Link to Login page */}
          <div className="w-full text-center mb-4 text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
