import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getArticles, createArticle, updateArticle, deleteArticle } from '../api/articles'
import { getCategories } from '../api/categories'

function Articles() {
    const { id: categorieId } = useParams()
    const navigate = useNavigate()
    const [articles, setArticles] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategorie, setSelectedCategorie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [formData, setFormData] = useState({
        nom: '',
        description: '',
        reference_bc_ao: '',
        quantite_entree: '',
        date_entree: '',
        categorie_id: categorieId
    })
    const [error, setError] = useState('')

    useEffect(() => {
        loadData()
    }, [categorieId])

    const loadData = async () => {
        try {
        setLoading(true)
        const [articlesRes, categoriesRes] = await Promise.all([
            getArticles(categorieId),
            getCategories()
        ])
        setArticles(articlesRes.data)
        setCategories(categoriesRes.data)
        const categorie = categoriesRes.data.find(c => c.id === parseInt(categorieId))
        setSelectedCategorie(categorie)
        } catch (err) {
        console.error('Error loading data:', err)
        setError('Erreur lors du chargement')
        } finally {
        setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.nom || !formData.reference_bc_ao || !formData.quantite_entree || !formData.date_entree) {
        setError('Tous les champs sont requis')
        return
        }

        try {
        const dataToSend = {
            ...formData,
            categorie_id: parseInt(categorieId),
            quantite_entree: parseInt(formData.quantite_entree)
        }
        if (editingId) {
            await updateArticle(editingId, dataToSend)
        } else {
            await createArticle(dataToSend)
        }
        setFormData({ nom: '', description: '', reference_bc_ao: '', quantite_entree: '', date_entree: '', categorie_id: categorieId })
        setEditingId(null)
        setShowForm(false)
        setError('')
        loadData()
        } catch (err) {
        console.error('Error saving article:', err)
        setError("Erreur lors de l'enregistrement")
        }
    }

    const handleEdit = (article) => {
        setFormData({
        nom: article.nom,
        description: article.description || '',
        reference_bc_ao: article.reference_bc_ao,
        quantite_entree: article.quantite_entree,
        date_entree: article.date_entree,
        categorie_id: categorieId
        })
        setEditingId(article.id)
        setShowForm(true)
        setError('')
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Supprimer cet article ?')) return
        try {
        await deleteArticle(id)
        loadData()
        } catch (err) {
        console.error('Error deleting article:', err)
        setError("Erreur lors de la suppression")
        }
    }

    const handleViewTransferts = (articleId) => {
        navigate(`/categories/${categorieId}/articles/${articleId}/transferts`)
    }

    if (loading) {
        return (
        <div style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#c9a03d', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ color: '#64748b' }}>Chargement des articles...</p>
        </div>
        )
    }

    return (
        <div>
        {/* Back Button */}
        <button
            onClick={() => navigate('/')}
            style={{ marginBottom: '20px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Retour aux catégories
        </button>

        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
            Articles - {selectedCategorie?.nom || 'Catégorie'}
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>Gestion des articles de cette catégorie</p>
        </div>

        {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px', marginBottom: '20px', color: '#dc2626' }}>
            ❌ {error}
            </div>
        )}

        {/* Articles Table */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '24px' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafbfc' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Liste des articles</span>
            <button
                onClick={() => { setShowForm(true); setEditingId(null); setFormData({ nom: '', description: '', reference_bc_ao: '', quantite_entree: '', date_entree: '', categorie_id: categorieId }) }}
                style={{ background: '#0f172a', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Nouvel article
            </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Article</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Réf. BC/AO</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Date entrée</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Qté entrée</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Qté sortie</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Stock</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Dispo</th>
                    <th style={{ width: '100px' }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {articles.map(article => (
                    <tr key={article.id}>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}><strong>{article.nom}</strong></td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', fontSize: '12px', color: '#64748b' }}>{article.reference_bc_ao}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', fontSize: '13px' }}>{article.date_entree?.split('-').reverse().join('/')}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', fontSize: '13px' }}>{article.quantite_entree}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', fontSize: '13px' }}>{article.quantite_sortie || 0}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', fontSize: '13px' }}><strong>{article.stock_restant}</strong></td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ display: 'inline-block', width: '60px', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden', marginRight: '8px', verticalAlign: 'middle' }}>
                        <span style={{ width: `${article.disponibilite}%`, height: '100%', background: article.disponibilite > 50 ? '#10b981' : '#f59e0b', display: 'block' }}></span>
                        </span>
                        <span style={{ fontSize: '12px', fontWeight: 500, color: article.disponibilite > 50 ? '#10b981' : '#f59e0b' }}>{article.disponibilite}%</span>
                    </td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>
                        <button onClick={() => handleViewTransferts(article.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '8px', padding: '4px', color: '#c9a03d' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                        </button>
                        <button onClick={() => handleEdit(article)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '4px', padding: '4px', color: '#64748b' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 3l4 4-7 7H10v-4l7-7z"/><path d="M4 20h16"/></svg>
                        </button>
                        <button onClick={() => handleDelete(article.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#64748b' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="3 6 5 6 21 6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                        </button>
                    </td>
                    </tr>
                ))}
                {articles.length === 0 && (
                    <tr>
                    <td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 12px', opacity: 0.5 }}>
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                        </svg>
                        <p>Aucun article trouvé</p>
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'white', borderRadius: '16px', width: '500px', maxWidth: '90%', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>{editingId ? 'Modifier l\'article' : 'Nouvel article'}</h3>
                <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: '#64748b' }}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px', color: '#475569' }}>Nom de l'article *</label>
                    <input type="text" value={formData.nom} onChange={(e) => setFormData({ ...formData, nom: e.target.value })} placeholder="ex: PC Dell Optiplex" style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px', color: '#475569' }}>Référence BC/AO *</label>
                    <input type="text" value={formData.reference_bc_ao} onChange={(e) => setFormData({ ...formData, reference_bc_ao: e.target.value })} placeholder="ex: BC-2025-001" style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px', color: '#475569' }}>Quantité *</label>
                    <input type="number" value={formData.quantite_entree} onChange={(e) => setFormData({ ...formData, quantite_entree: e.target.value })} placeholder="0" style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }} />
                    </div>
                    <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px', color: '#475569' }}>Date d'entrée *</label>
                    <input type="date" value={formData.date_entree} onChange={(e) => setFormData({ ...formData, date_entree: e.target.value })} style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }} />
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px', color: '#475569' }}>Description</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Description optionnelle..." rows="3" style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', resize: 'vertical' }} />
                </div>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button type="button" onClick={() => setShowForm(false)} style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Annuler</button>
                    <button type="submit" style={{ padding: '8px 20px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>{editingId ? 'Modifier' : 'Créer'}</button>
                </div>
                </form>
            </div>
            </div>
        )}
        </div>
    )
}

export default Articles