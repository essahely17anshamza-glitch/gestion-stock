import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  Package, 
  ArrowRightLeft, 
  Users, 
  Building, 
  Search, 
  LogOut,
  UserCircle
} from 'lucide-react'

function Layout({ children, pageTitle, pageSub }) {
  const navigate = useNavigate()
  const location = useLocation()
  
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
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={{
        width: '280px',
        background: 'linear-gradient(180deg, #0f172a 0%, #0a0f1f 100%)',
        color: '#e2e8f0',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto'
      }}>
        <div style={{ padding: '28px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #d4af37 0%, #b8942e 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Package size={20} color="white" />
            </div>
            <h1 style={{ fontSize: '18px', fontWeight: 600, color: 'white', margin: 0 }}>Gestion de Stock</h1>
          </div>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', margin: 0 }}>Commune Al Marsa</p>
        </div>
        
        <div style={{ padding: '20px 16px' }}>
          <div style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'rgba(255,255,255,0.35)', padding: '0 12px 12px' }}>
            Gestion du stock
          </div>
          {menuItems.map(item => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                onClick={() => handleMenuClick(item.id, item.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  marginBottom: '4px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: activeMenu === item.id ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                  color: activeMenu === item.id ? '#d4af37' : 'rgba(255,255,255,0.65)',
                  borderLeft: activeMenu === item.id ? '2px solid #d4af37' : 'none'
                }}
                onMouseEnter={e => {
                  if (activeMenu !== item.id) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                    e.currentTarget.style.color = 'white'
                  }
                }}
                onMouseLeave={e => {
                  if (activeMenu !== item.id) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
                  }
                }}
              >
                <Icon size={18} />
                <span style={{ fontSize: '14px', fontWeight: 500 }}>{item.label}</span>
              </div>
            )
          })}
        </div>
        
        <div style={{ padding: '20px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 'auto' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 12px',
              width: '100%',
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.55)',
              cursor: 'pointer',
              borderRadius: '10px',
              fontSize: '14px',
              fontFamily: 'inherit',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)'
              e.currentTarget.style.color = '#ef4444'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'none'
              e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
            }}
          >
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '280px', flex: 1, padding: '28px 32px', background: '#f7f9fc', minHeight: '100vh' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#0f172a', margin: 0 }}>{pageTitle}</h2>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '6px', marginBottom: 0 }}>{pageSub}</p>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            background: 'white', 
            padding: '6px 18px 6px 12px', 
            borderRadius: '40px', 
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
          }}>
            <div style={{ 
              width: '34px', 
              height: '34px', 
              background: '#0f172a', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <UserCircle size={20} color="#d4af37" />
            </div>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#1e293b' }}>Responsable Stock</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Layout