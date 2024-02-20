import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    console.log(token);
    if (!token) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    const ogToken = token.split(" ")[1];
    console.log(ogToken);
    const isValid = jwt.verify(ogToken, process.env.USER_SECRET_KEY);

    if (!isValid) {
      return res.status(403).json({ message: "You are not authorized" });
    }
    console.log(isValid);
    next();
  } catch (e) {
    return res.status(403).json({ message: "You are not authorized" });
  }
};

export default checkToken;
