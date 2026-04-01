import bcrypt from 'bcryptjs'
import { getDb } from './_db.js'
import {
    signToken,
    buildSessionCookie,
    clearSessionCookie,
    requireAuth,
    json,
    corsOptions,
} from './_auth.js'

export const handler = async (event) => {
    if (event.httpMethod === 'OPTIONS') return corsOptions()

    const path = event.path
        .replace('/.netlify/functions/auth', '')
        .replace('/api/auth', '')

    const method = event.httpMethod
    const db = getDb()

    // ── GET /api/auth/me ──────────────────────────────────────
    if (path === '/me' && method === 'GET') {
        const { user, error } = requireAuth(event)
        if (error) return json(401, { error })
        return json(200, { user: { id: user.id, email: user.email, name: user.name } })
    }

    // ── POST /api/auth/signup ─────────────────────────────────
    if (path === '/signup' && method === 'POST') {
        let body
        try { body = JSON.parse(event.body) } catch { return json(400, { error: 'Invalid JSON' }) }

        const { email, password, name } = body

        if (!email || !password) return json(400, { error: 'Email and password are required' })
        if (password.length < 8) return json(400, { error: 'Password must be at least 8 characters' })
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(400, { error: 'Invalid email' })

        const existing = await db.query(
            'SELECT id FROM users WHERE email = $1',
            [email.toLowerCase()]
        )
        if (existing.rows.length > 0) return json(409, { error: 'Email already in use' })

        const hashed = await bcrypt.hash(password, 12)
        const result = await db.query(
            'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name',
            [email.toLowerCase(), hashed, name || null]
        )

        const user = result.rows[0]
        const token = signToken({ id: user.id, email: user.email, name: user.name })

        return json(201, { user }, {
            'Set-Cookie': buildSessionCookie(token),
        })
    }

    // ── POST /api/auth/login ──────────────────────────────────
    if (path === '/login' && method === 'POST') {
        let body
        try { body = JSON.parse(event.body) } catch { return json(400, { error: 'Invalid JSON' }) }

        const { email, password } = body
        if (!email || !password) return json(400, { error: 'Email and password are required' })

        const result = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email.toLowerCase()]
        )

        if (result.rows.length === 0) return json(401, { error: 'Invalid email or password' })

        const user = result.rows[0]
        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return json(401, { error: 'Invalid email or password' })

        const token = signToken({ id: user.id, email: user.email, name: user.name })

        return json(200, { user: { id: user.id, email: user.email, name: user.name } }, {
            'Set-Cookie': buildSessionCookie(token),
        })
    }

    // ── POST /api/auth/logout ─────────────────────────────────
    if (path === '/logout' && method === 'POST') {
        return json(200, { message: 'Logged out' }, {
            'Set-Cookie': clearSessionCookie(),
        })
    }

    return json(404, { error: 'Not found' })
}