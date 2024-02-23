import jwt from "jsonwebtoken";

const checkToken = role => {
  return (req, res, next) => {
    const token = req.headers.authorization;
    try {
      if (!token) {
        return res.status(403).json({ message: "You are not authorized" });
      }

      const ogToken = token.split(" ")[1];

      const isValid = jwt.verify(ogToken, process.env.SECRET_KEY);

      if (!isValid) {
        return res.status(403).json({ message: "You are not authorized" });
      }
      if (!role.includes(isValid.role)) {
        return res.status(403).json({ message: "You are not authorized" });
      }

      next();
    } catch (e) {
      return res.status(403).json({ message: "You are not authorized" });
    }
  };
};

export default checkToken;
