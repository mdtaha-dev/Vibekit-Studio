import { getDb } from './_db.js'
import { json, corsOptions } from './_auth.js'

export const handler = async (event) => {
    if (event.httpMethod === 'OPTIONS') return corsOptions()

    const rawPath = event.path
        .replace('/.netlify/functions/public', '')
        .replace('/api/public', '')

    const method = event.httpMethod
    const db = getDb()

    const match = rawPath.match(/^\/pages\/([^/]+)\/?([^/]*)$/)
    if (!match) return json(404, { error: 'Not found' })

    const slug = match[1]
    const action = match[2] || null

    // ── GET /api/public/pages/:slug ───────────────────────────
    if (!action && method === 'GET') {
        const result = await db.query(
            `SELECT id, title, slug, theme, content, view_count, published_at
       FROM pages WHERE slug = $1 AND status = 'published'`,
            [slug]
        )
        if (result.rows.length === 0) return json(404, { error: 'Page not found or not published' })
        return json(200, { page: result.rows[0] })
    }

    // ── POST /api/public/pages/:slug/view ─────────────────────
    if (action === 'view' && method === 'POST') {
        await db.query(
            `UPDATE pages SET view_count = view_count + 1
       WHERE slug = $1 AND status = 'published'`,
            [slug]
        )
        return json(200, { ok: true })
    }

    // ── POST /api/public/pages/:slug/contact ──────────────────
    if (action === 'contact' && method === 'POST') {
        let body
        try { body = JSON.parse(event.body) } catch { return json(400, { error: 'Invalid JSON' }) }

        const { name, email, message } = body

        if (!name || !email || !message) {
            return json(400, { error: 'Name, email and message are required' })
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return json(400, { error: 'Invalid email address' })
        }
        if (message.length > 2000) {
            return json(400, { error: 'Message too long' })
        }

        const page = await db.query(
            `SELECT id FROM pages WHERE slug = $1 AND status = 'published'`,
            [slug]
        )
        if (page.rows.length === 0) return json(404, { error: 'Page not found' })

        await db.query(
            `INSERT INTO contact_submissions (page_id, name, email, message)
       VALUES ($1, $2, $3, $4)`,
            [page.rows[0].id, name.slice(0, 100), email.slice(0, 200), message]
        )

        return json(201, { message: 'Message received. Thank you!' })
    }

    return json(404, { error: 'Not found' })
}

