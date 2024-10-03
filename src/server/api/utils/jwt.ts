import jwt, { type JwtPayload } from 'jsonwebtoken'

const SECRET = process.env.SESSION_SECRET ?? 'your-secret-key'

export const signJwt = (userId: string): string => {
    return jwt.sign({ userId }, SECRET)
}

export const verifyJwt = (token: string): JwtPayload => {
    return jwt.verify(token, SECRET) as JwtPayload
}
