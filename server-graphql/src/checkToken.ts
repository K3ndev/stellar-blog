import jwt from "jsonwebtoken";

const PUBLICKEY = process.env.CLERK_PEM_PUBLIC_KEY!

export const checkToken = (token: string) => {
    if (!token) {
        return false;
    }

    try {
        const decoded = jwt.verify(token, PUBLICKEY, { algorithms: ['RS256'] });
        return true;
    } catch (error: any) {
        console.error(error.message);
        return false;
    }
};