import jwt from 'jsonwebtoken';

interface Payload {
  id: number;
}

const JWT_SECRET = process.env.SECRET as string;
const EXPIRES_IN = '12h'; // 12 hours

export const generarJWT = (payload: Payload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
};

export const verificarJWT = (token: string): Payload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as Payload;
  } catch (error) {
    console.error('Error verifying JWT:', error);
    return null;
  }
};
