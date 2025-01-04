import UserModel from "./User.models.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";


export const userRegister = async(req,res) => {

    try {
        const { fullName, email, password, confirmPassword, gender } =
          req.body;

        if (password !== confirmPassword) {
          return res.status(400).json({
            message: "Passwords do not match",
            error: true,
          });
        }
        const userExist = await UserModel.findOne({ email });
    
        if (userExist) {
          return res.status(400).json({
            message: "User already exists",
            error: true,
          });
        }
    
        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // Profile Pic API
        const profilePicUrl = `https://avatar.iran.liara.run/public/${
          gender === "male" ? "boy" : "girl"
        }?username=${fullName}`;

       
        
    
        const newUser = new UserModel({
          fullName,
          email,
          password:hashedPassword,
          gender,
          profilePic: profilePicUrl,
        });
    
        await newUser.save();
    
        return res.status(201).json({
          message: "Signup request created successfully",
          data: {
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            gender: newUser.gender,
            profilePic: newUser.profilePic,
          },
          success: true,
        });
      } catch (error) {
        console.error("Error in userRegister controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }


};


export const login = async (req,res)=>{
    try {
        const { email, password } = req.body;
    
        const userExist = await UserModel.findOne({ email });
    
        if (!userExist) {
          return res.status(400).json({
            message: "User Not Found!!",
            error: true,
          });
        }
    
        // check password validity
        const isValidPassword = await bcrypt.compare(password, userExist.password);
        if (!isValidPassword) {
          return res.status(400).json({ message: "Invalid Credentials " });
        }
    
        // check if user is already logged in
    
        const token = req.cookies.token;
        if (token) {
          try {
            const decoded = await jwt.verify(token, process.env.SECRET_KEY);
            if (decoded._id === userExist._id.toString()) {
              return res.status(400).json({ message: "You are already Logged in" });
            }
          } catch (err) {
            // Token is invalid or expired
            return res.status(400).json({
              message: "Invalid or expired token",
              error: err.message,
            });
          }
        }
    
        // Prepare token data
        const tokenData = {
          _id: userExist._id,
          email: userExist.email,
        };
    
        // Generate token
        const newToken = await jwt.sign(tokenData, process.env.SECRET_KEY, {
          expiresIn: 24 * 60 * 60, // Token expiry set to 24 hours
        });
    
        // Determine if the environment is production
        const isProduction = process.env.NODE_ENV === "production";
    
        const tokenOptions = {
          httpOnly: true,
          secure: isProduction, // Secure cookies only in production
          sameSite: "strict",
        };
    
        // Set cookie and respond
        res.cookie("token", newToken, tokenOptions).status(200).json({
          message: "Login successful",
          data: newToken,
          success: true,
          error: false,
        });
      } catch (error) {
        console.error("Error in Login controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }
}

export const singleUser = async(req,res)=>{
    try {
        // Check if userId is present in the request
        if (!req.params.id) {
          return res.status(400).json({
            message: "User ID is missing",
            error: true,
          });
        }
    
        // Fetch user details from the database
        const user = await UserModel.findById(req.params.id).select("-password");
    
        // Check if user exists
        if (!user) {
          console.error("User not found for ID:", req.userId);
          return res.status(404).json({
            message: "User not found",
            error: true,
          });
        }
    
        // Send user details in response
        res.status(200).json({
          data: user,
          message: "User details retrieved successfully",
          success: true,
        });
      } catch (error) {
        console.error("Error in singleUser controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }

}


export const allUser = async( req,res)=>{
    try {
        const user = await UserModel.find();
    
        if (!user) {
          return res.status(400).json({
            message: "No User available",
            data: [],
            error: true,
          });
        }
    
        res.status(200).json({
          message: "Request complete Successfully",
          data: user,
          success: true,
        });
      } catch (error) {
        console.error("Error in allUser controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }
}

export const Logout = async(req,res)=>{
    try {
        // Clear the cookie named "token"
        res.clearCookie("token", {
          httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
          secure: process.env.NODE_ENV === "production", // Ensures cookie is sent only over HTTPS in production
          sameSite: "strict", // Protects against CSRF attacks
          maxAge: 0, // Set the cookie's maxAge to 0 to expire it
          // Add domain option if necessary:
          // domain: process.env.COOKIE_DOMAIN || undefined, // Define this if you're using subdomains
        });
    
        // Log a message indicating successful logout
        console.log("User logged out successfully");
    
        // Send a success response
        res.status(200).json({ message: "Logout successfully", success: true });
      } catch (error) {
        // Log the error with a stack trace for better debugging
        console.error("Error in logout controller:", error);
    
        // Send an internal server error response
        return res.status(500).json({ error: "Internal Server Error" });
      }
}