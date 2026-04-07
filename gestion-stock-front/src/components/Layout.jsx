import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  Package, 
  ArrowRightLeft, 
  Users, 
  Building, 
  Search, 
  LogOut,
  UserCircle,
  Bell
} from 'lucide-react'

function Layout({ children, pageTitle, pageSub }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  
  const getActiveMenu = () => {
    const path = location.pathname
    if (path === '/' || path === '/categories') return 'categories'
    if (path === '/transferts') return 'transferts'
    if (path === '/fonctionnaires') return 'fonctionnaires'
    if (path === '/bureaux') return 'bureaux'
    if (path === '/recherche') return 'recherche'
    return 'categories'
  }
  
  const [activeMenu, setActiveMenu] = useState(getActiveMenu())

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const menuItems = [
    { id: 'categories', label: 'Catégories', icon: Package, path: '/' },
    { id: 'transferts', label: 'Transferts', icon: ArrowRightLeft, path: '/transferts' },
    { id: 'fonctionnaires', label: 'Fonctionnaires', icon: Users, path: '/fonctionnaires' },
    { id: 'bureaux', label: 'Bureaux', icon: Building, path: '/bureaux' },
    { id: 'recherche', label: 'Recherche', icon: Search, path: '/recherche' },
  ]

  const handleMenuClick = (id, path) => {
    setActiveMenu(id)
    navigate(path)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {/* Sidebar */}
      <div style={{
        width: '280px',
        background: 'linear-gradient(180deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: '#e2e8f0',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
        boxShadow: 'var(--shadow-xl)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Logo Section */}
        <div style={{ 
          padding: '32px 24px', 
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          position: 'sticky',
          top: 0,
          background: 'var(--primary)',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)'
            }}>
              <Package size={22} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: 700, color: 'white', margin: 0, letterSpacing: '-0.5px' }}>
                GESTION STOCK
              </h1>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', margin: 0, fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Commune Al Marsa
              </p>
            </div>
          </div>
        </div>
        
        {/* Navigation Section */}
        <div style={{ padding: '24px 16px', flex: 1 }}>
          <div style={{ 
            fontSize: '11px', 
            fontWeight: 600, 
            textTransform: 'uppercase', 
            letterSpacing: '1px', 
            color: 'rgba(255,255,255,0.4)', 
            padding: '0 12px 14px' 
          }}>
            Menu Principal
          </div>
          {menuItems.map(item => {
            const Icon = item.icon
            const isActive = activeMenu === item.id
            return (
              <div
                key={item.id}
                onClick={() => handleMenuClick(item.id, item.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px 16px',
                  marginBottom: '8px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: isActive ? 'linear-gradient(90deg, rgba(212, 175, 55, 0.15) 0%, transparent 100%)' : 'transparent',
                  color: isActive ? 'var(--accent)' : 'rgba(255,255,255,0.7)',
                  borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.color = 'white'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                  }
                }}
              >
                <Icon size={20} style={{ transition: 'transform 0.3s', transform: isActive ? 'scale(1.1)' : 'scale(1)' }} />
                <span style={{ fontSize: '15px', fontWeight: isActive ? 600 : 500 }}>{item.label}</span>
              </div>
            )
          })}
        </div>
        
        {/* Bottom Section */}
        <div style={{ 
          padding: '24px 16px', 
          borderTop: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(0,0,0,0.2)'
        }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              width: '100%',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#f87171',
              cursor: 'pointer',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: 'inherit',
              transition: 'var(--transition)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'
              e.currentTarget.style.transform = 'none'
            }}
          >
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ marginLeft: '280px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        {/* Header (Top Navigation) */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 40px',
          background: scrolled ? 'rgba(248, 250, 252, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
          transition: 'all 0.3s ease'
        }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-heading)', margin: 0, letterSpacing: '-0.5px' }}>{pageTitle}</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px', marginBottom: 0 }}>{pageSub}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--bg-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              transition: 'var(--transition)',
              border: '1px solid var(--border-color)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--accent)'
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.boxShadow = 'var(--shadow-md)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-muted)'
              e.currentTarget.style.borderColor = 'var(--border-color)'
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
            }}
            >
              <Bell size={18} />
            </div>
            
            <div className="card glass-panel" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '6px 16px 6px 6px',
              borderRadius: '40px',
              cursor: 'pointer'
            }}>
              <div style={{ 
                width: '36px', 
                height: '36px', 
                background: 'var(--primary)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.4)'
              }}>
                <UserCircle size={22} color="var(--accent)" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b', lineHeight: '1' }}>Admin</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Responsable</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ padding: '16px 40px 40px', flex: 1 }}>
          <div style={{ 
            animation: 'fadeIn 0.5s ease-out'
          }}>
            {children}
          </div>
        </main>
        
        {/* Simple fade in animation for page transition */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  )
}

export default Layout