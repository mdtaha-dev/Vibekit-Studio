// All API calls in one place.
// Every function returns { data, error } so components
// never have to deal with try/catch themselves.

const BASE = '/.netlify/functions'

async function request(path, options = {}) {
    try {
        const res = await fetch(`${BASE}${path}`, {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // sends httpOnly cookie automatically
            ...options,
        })
        const data = await res.json()
        if (!res.ok) return { data: null, error: data.error || 'Something went wrong' }
        return { data, error: null }
    } catch {
        return { data: null, error: 'Network error. Please try again.' }
    }
}

// ── Auth ──────────────────────────────────────────────────
export const api = {
    auth: {
        me: () => request('/auth/me'),
        signup: (body) => request('/auth/signup', { method: 'POST', body: JSON.stringify(body) }),
        login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
        logout: () => request('/auth/logout', { method: 'POST' }),
    },

    // ── Pages (authenticated) ────────────────────────────────
    pages: {
        list: () => request('/pages'),
        create: (body) => request('/pages', { method: 'POST', body: JSON.stringify(body) }),
        get: (id) => request(`/pages/${id}`),
        update: (id, body) => request(`/pages/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
        publish: (id) => request(`/pages/${id}/publish`, { method: 'POST' }),
        unpublish: (id) => request(`/pages/${id}/unpublish`, { method: 'POST' }),
        duplicate: (id) => request(`/pages/${id}/duplicate`, { method: 'POST' }),
        delete: (id) => request(`/pages/${id}`, { method: 'DELETE' }),
    },

    // ── Public (no auth needed) ──────────────────────────────
    public: {
        getPage: (slug) => request(`/public/pages/${slug}`),
        incrementView: (slug) => request(`/public/pages/${slug}/view`, { method: 'POST' }),
        submitContact: (slug, body) => request(`/public/pages/${slug}/contact`, {
            method: 'POST',
            body: JSON.stringify(body),
        }),
    },
}