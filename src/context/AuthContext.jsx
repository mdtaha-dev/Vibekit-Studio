import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // On app load, check if user has a valid session
    useEffect(() => {
        async function checkSession() {
            const { data } = await api.auth.me()
            setUser(data?.user || null)
            setLoading(false)
        }
        checkSession()
    }, [])

    async function login(email, password) {
        const { data, error } = await api.auth.login({ email, password })
        if (error) return { error }
        setUser(data.user)
        return { error: null }
    }

    async function signup(name, email, password) {
        const { data, error } = await api.auth.signup({ name, email, password })
        if (error) return { error }
        setUser(data.user)
        return { error: null }
    }

    async function logout() {
        await api.auth.logout()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
    return ctx
}