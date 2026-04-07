import { useState, useEffect } from 'react'
import { getCategories, createCategory, updateCategory, deleteCategory } from '../api/categories'
import { useNavigate } from 'react-router-dom'

function Categories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [formData, setFormData] = useState({ nom: '' })
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const [stats, setStats] = useState({
        totalCategories: 0,
        totalArticles: 0,
        totalStock: 0,
        totalSorties: 0
    })

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = async () => {
        try {
        setLoading(true)
        const response = await getCategories()
        setCategories(response.data)
        
        const totalCategories = response.data.length
        const totalArticles = response.data.reduce((sum, cat) => sum + (cat.nombre_articles || 0), 0)
        const totalStock = response.data.reduce((sum, cat) => sum + (cat.total_stock || 0), 0)
        const totalSorties = response.data.reduce((sum, cat) => sum + (cat.pieces_sortantes || 0), 0)
        
        setStats({ totalCategories, totalArticles, totalStock, totalSorties })
        } catch (err) {
        console.error('Error loading categories:', err)
        setError('Erreur lors du chargement des catégories')
        } finally {
        setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.nom.trim()) {
        setError('Le nom de la catégorie est requis')
        return
        }

        try {
        if (editingId) {
            await updateCategory(editingId, formData)
        } else {
            await createCategory(formData)
        }
        setFormData({ nom: '' })
        setEditingId(null)
        setShowForm(false)
        setError('')
        loadCategories()
        } catch (err) {
        console.error('Error saving category:', err)
        setError("Erreur lors de l'enregistrement")
        }
    }

    const handleEdit = (category) => {
        setFormData({ nom: category.nom })
        setEditingId(category.id)
        setShowForm(true)
        setError('')
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Supprimer cette catégorie ?')) return
        
        try {
        await deleteCategory(id)
        loadCategories()
        } catch (err) {
        console.error('Error deleting category:', err)
        setError("Erreur lors de la suppression")
        }
    }

    // SVG Icons
    const Icons = {
        categories: () => (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a03d" strokeWidth="1.8">
            <path d="M20 7h-4.18A3 3 0 0 0 16 5.18V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1.18A3 3 0 0 0 8.18 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"/>
            <path d="M8 7v2"/>
            <path d="M16 7v2"/>
        </svg>
        ),
        articles: () => (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a03d" strokeWidth="1.8">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <path d="M12 22V12"/>
            <path d="M9 10.5 12 9l3 1.5"/>
        </svg>
        ),
        stock: () => (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a03d" strokeWidth="1.8">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
            <polyline points="17 6 23 6 23 12"/>
        </svg>
        ),
        transfers: () => (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a03d" strokeWidth="1.8">
            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
            <polyline points="17 18 23 18 23 12"/>
        </svg>
        )
    }

    if (loading && categories.length === 0) {
        return (
        <div style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#c9a03d', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ color: '#64748b' }}>Chargement des catégories...</p>
        </div>
        )
    }

    return (
        <div>
        {/* Stats Cards */}
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            marginBottom: '32px'
        }}>
            <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Catégories</span>
                <Icons.categories />
            </div>
            <div style={{ fontSize: '36px', fontWeight: 700, color: 'var(--text-heading)', letterSpacing: '-1px' }}>{stats.totalCategories}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Total</div>
            </div>

            <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Articles</span>
                <Icons.articles />
            </div>
            <div style={{ fontSize: '36px', fontWeight: 700, color: 'var(--text-heading)', letterSpacing: '-1px' }}>{stats.totalArticles}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Tous articles</div>
            </div>

            <div className="card glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>En Stock</span>
                <Icons.stock />
            </div>
            <div style={{ fontSize: '36px', fontWeight: 700, color: 'var(--accent-dark)', letterSpacing: '-1px' }}>{stats.totalStock}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-main)', marginTop: '4px', fontWeight: 500 }}>Unités disponibles</div>
            </div>

            <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Transférées</span>
                <Icons.transfers />
            </div>
            <div style={{ fontSize: '36px', fontWeight: 700, color: 'var(--text-heading)', letterSpacing: '-1px' }}>{stats.totalSorties}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Unités sorties</div>
            </div>
        </div>

        {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px', marginBottom: '20px', color: '#dc2626', fontSize: '13px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }}>
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
            </div>
        )}

        <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-main)' }}>
            <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-heading)' }}>Liste des catégories</span>
            <button
                className="btn-primary"
                onClick={() => { setShowForm(true); setEditingId(null); setFormData({ nom: '' }) }}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Nouvelle catégorie
            </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
                <tr>
                <th>Catégorie</th>
                <th>Articles</th>
                <th>Entrées</th>
                <th>Sorties</th>
                <th>Stock</th>
                <th style={{ width: '100px', textAlign: 'center' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {categories.map(cat => (
                <tr key={cat.id}>
                    <td style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }}>
  <strong 
    style={{ color: '#0f172a' }}
    onClick={() => navigate(`/categories/${cat.id}/articles`)}
  >
    {cat.nom}
  </strong>
</td>
                    <td style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9', fontSize: '13px' }}>{cat.nombre_articles || 0}</td>
                    <td style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9', fontSize: '13px' }}>{cat.pieces_entrees || 0}</td>
                    <td style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9', fontSize: '13px' }}>{cat.pieces_sortantes || 0}</td>
                    <td style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9', fontSize: '13px' }}><strong>{cat.total_stock || 0}</strong></td>
                    <td style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9' }}>
                    <button onClick={() => handleEdit(cat)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '8px', padding: '4px', borderRadius: '4px', color: '#64748b' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M17 3l4 4-7 7H10v-4l7-7z"/>
                        <path d="M4 20h16"/>
                        </svg>
                    </button>
                    <button onClick={() => handleDelete(cat.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '4px', color: '#64748b' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        <path d="M10 11v6"/>
                        <path d="M14 11v6"/>
                        </svg>
                    </button>
                    </td>
                </tr>
                ))}
                {categories.length === 0 && (
                <tr>
                    <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 12px', opacity: 0.5 }}>
                        <path d="M20 7h-4.18A3 3 0 0 0 16 5.18V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1.18A3 3 0 0 0 8.18 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"/>
                        <path d="M8 7v2"/>
                        <path d="M16 7v2"/>
                    </svg>
                    <p>Aucune catégorie trouvée</p>
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>

        {/* Add/Edit Modal */}
        {showForm && (
            <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(15, 23, 42, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
            backdropFilter: 'blur(4px)'
            }}>
            <div className="card glass-panel" style={{ width: '480px', maxWidth: '90%', padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>{editingId ? 'Modifier la catégorie' : 'Nouvelle catégorie'}</h3>
                <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: 'var(--text-muted)', transition: 'var(--transition)' }} onMouseEnter={e=>e.currentTarget.style.color='var(--text-heading)'} onMouseLeave={e=>e.currentTarget.style.color='var(--text-muted)'}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-heading)' }}>Nom de la catégorie</label>
                    <input
                        type="text"
                        className="premium-input"
                        value={formData.nom}
                        onChange={(e) => setFormData({ nom: e.target.value.toUpperCase() })}
                        placeholder="ex: ÉQUIPEMENT INFORMATIQUE"
                        autoFocus
                    />
                </div>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button type="button" onClick={() => setShowForm(false)} style={{ padding: '10px 20px', background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '14px', fontWeight: 500, cursor: 'pointer', transition: 'var(--transition)' }}>Annuler</button>
                    <button type="submit" className="btn-accent">{editingId ? 'Modifier' : 'Créer'}</button>
                </div>
                </form>
            </div>
            </div>
        )}
        </div>
    )
}

export default Categories