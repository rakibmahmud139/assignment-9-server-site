import jwt, { JwtPayload, Secret } from "jsonwebtoken";

export const createToken = (
  secret: Secret,
  payload: JwtPayload,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn,
  });

  return token;
};

export const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret);
};
