import jwt from 'jsonwebtoken'
import { parse } from 'cookie'

const JWT_SECRET = process.env.JWT_SECRET
const COOKIE_NAME = 'vk_session'

export function signToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function buildSessionCookie(token) {
    const maxAge = 60 * 60 * 24 * 7
    return [
        `${COOKIE_NAME}=${token}`,
        'HttpOnly',
        'SameSite=Strict',
        `Max-Age=${maxAge}`,
        'Path=/',
    ].join('; ')
}

export function clearSessionCookie() {
    return `${COOKIE_NAME}=; HttpOnly; SameSite=Strict; Max-Age=0; Path=/`
}

export function requireAuth(event) {
    const cookieHeader = event.headers.cookie || event.headers.Cookie || ''
    const cookies = parse(cookieHeader)
    const token = cookies[COOKIE_NAME]

    if (!token) return { user: null, error: 'Not authenticated' }

    try {
        const user = jwt.verify(token, JWT_SECRET)
        return { user, error: null }
    } catch {
        return { user: null, error: 'Invalid or expired session' }
    }
}

export function json(statusCode, body, headers = {}) {
    return {
        statusCode,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': process.env.APP_URL || '*',
            'Access-Control-Allow-Credentials': 'true',
            ...headers,
        },
        body: JSON.stringify(body),
    }
}

export function corsOptions() {
    return {
        statusCode: 204,
        headers: {
            'Access-Control-Allow-Origin': process.env.APP_URL || '*',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Credentials': 'true',
        },
        body: '',
    }
}