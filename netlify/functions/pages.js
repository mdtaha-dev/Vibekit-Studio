import { getDb } from './_db.js'
import { requireAuth, json, corsOptions } from './_auth.js'

function slugify(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .slice(0, 60)
        .replace(/^-|-$/g, '') || 'untitled'
}

async function uniqueSlug(db, base, excludeId = null) {
    let candidate = base
    let count = 1
    while (true) {
        const q = excludeId
            ? 'SELECT id FROM pages WHERE slug = $1 AND id != $2'
            : 'SELECT id FROM pages WHERE slug = $1'
        const params = excludeId ? [candidate, excludeId] : [candidate]
        const result = await db.query(q, params)
        if (result.rows.length === 0) return candidate
        candidate = `${base}-${count++}`
    }
}

const DEFAULT_CONTENT = {
    hero: {
        title: 'Welcome to My Page',
        subtitle: 'Built with VibeKit Studio',
        buttonText: 'Get Started',
        buttonUrl: '#features',
    },
    features: [
        { id: 'f1', title: 'Feature One', description: 'Describe your first key feature here.' },
        { id: 'f2', title: 'Feature Two', description: 'Describe your second key feature here.' },
        { id: 'f3', title: 'Feature Three', description: 'Describe your third key feature here.' },
    ],
    gallery: [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', alt: 'Gallery image 1' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', alt: 'Gallery image 2' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800', alt: 'Gallery image 3' },
    ],
    contact: {
        heading: 'Get in Touch',
        subheading: 'We would love to hear from you.',
    },
    sectionOrder: ['hero', 'features', 'gallery', 'contact'],
}

export const handler = async (event) => {
    if (event.httpMethod === 'OPTIONS') return corsOptions()

    const { user, error } = requireAuth(event)
    if (error) return json(401, { error })

    const rawPath = event.path
        .replace('/.netlify/functions/pages', '')
        .replace('/api/pages', '')

    const method = event.httpMethod
    const db = getDb()

    // ── GET /api/pages ────────────────────────────────────────
    if ((rawPath === '' || rawPath === '/') && method === 'GET') {
        const result = await db.query(
            `SELECT id, title, slug, theme, status, view_count, published_at, created_at, updated_at
       FROM pages WHERE user_id = $1 ORDER BY updated_at DESC`,
            [user.id]
        )
        return json(200, { pages: result.rows })
    }

    // ── POST /api/pages ───────────────────────────────────────
    if ((rawPath === '' || rawPath === '/') && method === 'POST') {
        let body
        try { body = JSON.parse(event.body) } catch { return json(400, { error: 'Invalid JSON' }) }

        const title = (body.title || 'Untitled Page').slice(0, 100)
        const theme = body.theme || 'minimal'
        const baseSlug = slugify(title)
        const slug = await uniqueSlug(db, baseSlug)

        const result = await db.query(
            `INSERT INTO pages (user_id, title, slug, theme, content)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [user.id, title, slug, theme, JSON.stringify(DEFAULT_CONTENT)]
        )
        return json(201, { page: result.rows[0] })
    }

    // ─── Routes with /:id ─────────────────────────────────────
    const parts = rawPath.split('/').filter(Boolean)
    const id = parts[0]
    const action = parts[1]

    if (!id) return json(404, { error: 'Not found' })

    const owned = await db.query(
        'SELECT * FROM pages WHERE id = $1 AND user_id = $2',
        [id, user.id]
    )
    if (owned.rows.length === 0) return json(404, { error: 'Page not found' })
    const page = owned.rows[0]

    // ── GET /api/pages/:id ────────────────────────────────────
    if (!action && method === 'GET') {
        return json(200, { page })
    }

    // ── PUT /api/pages/:id ────────────────────────────────────
    if (!action && method === 'PUT') {
        let body
        try { body = JSON.parse(event.body) } catch { return json(400, { error: 'Invalid JSON' }) }

        const title = body.title !== undefined ? body.title.slice(0, 100) : page.title
        const theme = body.theme || page.theme
        const content = body.content !== undefined ? body.content : page.content

        let slug = page.slug
        if (body.slug && body.slug !== page.slug) {
            const cleanSlug = slugify(body.slug)
            slug = await uniqueSlug(db, cleanSlug, id)
        } else if (body.title && body.title !== page.title) {
            const baseSlug = slugify(body.title)
            slug = await uniqueSlug(db, baseSlug, id)
        }

        const result = await db.query(
            `UPDATE pages SET title=$1, slug=$2, theme=$3, content=$4
       WHERE id=$5 AND user_id=$6 RETURNING *`,
            [title, slug, theme, JSON.stringify(content), id, user.id]
        )
        return json(200, { page: result.rows[0] })
    }

    // ── POST /api/pages/:id/publish ───────────────────────────
    if (action === 'publish' && method === 'POST') {
        const result = await db.query(
            `UPDATE pages SET status='published', published_at=NOW()
       WHERE id=$1 AND user_id=$2 RETURNING *`,
            [id, user.id]
        )
        return json(200, { page: result.rows[0] })
    }

    // ── POST /api/pages/:id/unpublish ─────────────────────────
    if (action === 'unpublish' && method === 'POST') {
        const result = await db.query(
            `UPDATE pages SET status='draft', published_at=NULL
       WHERE id=$1 AND user_id=$2 RETURNING *`,
            [id, user.id]
        )
        return json(200, { page: result.rows[0] })
    }

    // ── POST /api/pages/:id/duplicate ─────────────────────────
    if (action === 'duplicate' && method === 'POST') {
        const newTitle = `${page.title} (Copy)`
        const baseSlug = slugify(newTitle)
        const newSlug = await uniqueSlug(db, baseSlug)

        const result = await db.query(
            `INSERT INTO pages (user_id, title, slug, theme, content)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [user.id, newTitle, newSlug, page.theme, JSON.stringify(page.content)]
        )
        return json(201, { page: result.rows[0] })
    }

    // ── DELETE /api/pages/:id ─────────────────────────────────
    if (!action && method === 'DELETE') {
        await db.query(
            'DELETE FROM pages WHERE id=$1 AND user_id=$2',
            [id, user.id]
        )
        return json(200, { message: 'Page deleted' })
    }

    return json(404, { error: 'Not found' })
}