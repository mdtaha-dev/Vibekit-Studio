// Re-export from context for cleaner imports in components.
// Instead of: import { useAuth } from '../context/AuthContext'
// You can do: import { useAuth } from '../hooks/useAuth'

export { useAuth } from '../context/AuthContext'