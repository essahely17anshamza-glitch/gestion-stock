import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { LogIn, User, Lock } from 'lucide-react'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const res = await axios.post('http://localhost:8000/api/login', {
        username,
        password
      })
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch (err) {
      setError('Identifiants incorrects')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '40px',
        width: '420px',
        maxWidth: '90%',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'linear-gradient(135deg, #d4af37 0%, #b8942e 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
              <path d="M20 7h-4.18A3 3 0 0 0 16 5.18V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1.18A3 3 0 0 0 8.18 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"/>
              <path d="M8 7v2"/>
              <path d="M16 7v2"/>
            </svg>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Gestion de Stock</h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>Commune Al Marsa</p>
        </div>

        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '12px',
            padding: '12px',
            marginBottom: '24px',
            color: '#dc2626',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px', color: '#475569' }}>
              Nom d'utilisateur
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '10px 14px',
              transition: 'all 0.2s'
            }}>
              <User size={18} color="#94a3b8" style={{ marginRight: '10px' }} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  background: 'transparent'
                }}
                autoFocus
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px', color: '#475569' }}>
              Mot de passe
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '10px 14px'
            }}>
              <Lock size={18} color="#94a3b8" style={{ marginRight: '10px' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  background: 'transparent'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: '#0f172a',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#1e293b'}
            onMouseLeave={e => e.currentTarget.style.background = '#0f172a'}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
            <LogIn size={16} />
          </button>
        </form>

        {/* Footer */}
        <p style={{
          textAlign: 'center',
          fontSize: '11px',
          color: '#94a3b8',
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid #e2e8f0'
        }}>
          Responsable de Stock · Administration
        </p>
      </div>
    </div>
  )
}

export default Login