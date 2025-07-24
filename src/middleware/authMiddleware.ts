import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
    user?: string | object;
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void | Response => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, process.env.SECRET as string, (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded;
        next();
    });
}


export default authMiddleware;