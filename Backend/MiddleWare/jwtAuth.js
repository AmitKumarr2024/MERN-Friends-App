import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "Please Login First and try again",
      error: true,
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decodedToken._id; // Set userId from token
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or Expired Token",
      error: true,
    });
  }
};

export default jwtAuth;
