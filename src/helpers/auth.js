import { argon2i } from 'argon2-ffi';
import { config } from 'dotenv';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

config();

async function generateJWT({ id }, duration = '24h') {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: duration });
}

async function hashPassword(password) {
  const salt = crypto.randomBytes(+process.env.SALT_ROUNDS);
  const hashed = await argon2i.hash(password, salt);
  return hashed;
}

async function verifyPassword(encPassword, password) {
  return argon2i.verify(encPassword, password);
}

export {
  generateJWT,
  hashPassword,
  verifyPassword,
};
