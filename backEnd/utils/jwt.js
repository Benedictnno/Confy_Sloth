const jwt = require("jsonwebtoken");

const createJwt = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_PASS, {
    expiresIn: process.env.JWT_TIME,
  });
  return token;
};

const isTokenValid = (token) => {
  const valid = jwt.verify(token, process.env.JWT_PASS);
  return valid;
};

const attachCookiesToResponse = ({ res, tokenUser }) => {
  const token = createJwt({ payload: tokenUser });
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneWeek),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};
module.exports = { createJwt, attachCookiesToResponse, isTokenValid };
