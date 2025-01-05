import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate for redirect
import toast from "react-hot-toast"; // To show toast notifications

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleToSearch = () => {
    console.log(searchInput);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      // Send logout request to the backend API
      const response = await fetch("/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.success) {
        // Clear the token from localStorage
        localStorage.removeItem("token");

        // Redirect to login page
        navigate("/login");

        // Show success message
        toast.success(result.message || "Logged out successfully!");
      } else {
        // Show error if logout fails
        toast.error(result.message || "Logout failed");
      }
    } catch (err) {
      // Handle any errors during the API call
      toast.error("An error occurred while logging out");
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-brown-600 px-4 py-2 flex items-center justify-between">
      {/* Logo */}
      <Link to={'/home'} className="text-2xl font-extrabold text-white cursor-pointer">FriendsPoint</Link>

      {/* Search Bar (Hidden on small screens) */}
      <div className="hidden sm:flex min-w-96 py-2">
        <input
          type="text"
          className="w-full p-2 outline-none rounded-l-md"
          placeholder="Search"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <span
          className="bg-slate-200 p-2 rounded-r-md cursor-pointer"
          onClick={handleToSearch}
        >
          Search
        </span>
      </div>

      {/* Logout (Visible only on larger screens) */}
      <div className="hidden sm:block text-lg font-semibold text-white cursor-pointer" onClick={handleLogout}>
        Logout
      </div>

      {/* Hamburger Menu (Visible only on small screens) */}
      <div
        className="sm:hidden text-white text-2xl cursor-pointer"
        onClick={toggleMobileMenu}
      >
        ☰
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute right-0 top-14 w-3/4 bg-white shadow-lg rounded-lg p-4 sm:hidden">
          <ul className="space-y-4">
            <li className="text-gray-800 font-medium">
              <div className="flex flex-row py-2">
                <input
                  type="text"
                  className="w-full p-2 outline-none rounded-l-md bg-slate-200"
                  placeholder="Search"
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <span
                  className="bg-slate-300 p-2 rounded-r-md cursor-pointer"
                  onClick={handleToSearch}
                >
                  Search
                </span>
              </div>
            </li>
            {/* Logout (Visible only in the mobile menu) */}
            <li className="text-gray-800 font-medium cursor-pointer" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
