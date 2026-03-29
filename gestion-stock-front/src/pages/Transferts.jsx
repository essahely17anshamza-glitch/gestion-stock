import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTransferts, createTransfert, deleteTransfert } from '../api/transferts'
import { getArticles } from '../api/articles'
import { getBureaux } from '../api/bureaux'
import { getFonctionnaires } from '../api/fonctionnaires'

function Transferts() {
    const { articleId } = useParams()
    const navigate = useNavigate()
    const [transferts, setTransferts] = useState([])
    const [article, setArticle] = useState(null)
    const [bureaux, setBureaux] = useState([])
    const [fonctionnaires, setFonctionnaires] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        quantite: '',
        date_transfert: '',
        bureau_id: '',
        fonctionnaire_id: '',
        remarques: ''
    })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        loadData()
    }, [articleId])

    const loadData = async () => {
        try {
        setLoading(true)
        const [transfertsRes, bureauxRes, fonctionnairesRes] = await Promise.all([
            getTransferts(articleId),
            getBureaux(),
            getFonctionnaires()
        ])
        setTransferts(transfertsRes.data)
        setBureaux(bureauxRes.data)
        setFonctionnaires(fonctionnairesRes.data)
        
        // Get article details from transferts if available
        if (transfertsRes.data.length > 0 && transfertsRes.data[0].article) {
            setArticle(transfertsRes.data[0].article)
        }
        } catch (err) {
        console.error('Error loading data:', err)
        setError('Erreur lors du chargement')
        } finally {
        setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.quantite || !formData.date_transfert || !formData.bureau_id || !formData.fonctionnaire_id) {
        setError('Tous les champs sont requis')
        return
        }

        try {
        await createTransfert({
            ...formData,
            article_id: parseInt(articleId),
            quantite: parseInt(formData.quantite)
        })
        setFormData({ quantite: '', date_transfert: '', bureau_id: '', fonctionnaire_id: '', remarques: '' })
        setShowForm(false)
        setError('')
        setSuccess('Transfert enregistré avec succès')
        setTimeout(() => setSuccess(''), 3000)
        loadData()
        } catch (err) {
        console.error('Error saving transfert:', err)
        setError(err.response?.data?.message || "Erreur lors de l'enregistrement")
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Supprimer ce transfert ?')) return
        try {
        await deleteTransfert(id)
        loadData()
        } catch (err) {
        console.error('Error deleting transfert:', err)
        setError("Erreur lors de la suppression")
        }
    }

    const getBureauName = (id) => {
        const bureau = bureaux.find(b => b.id === id)
        return bureau?.nom || '-'
    }

    const getFonctionnaireName = (id) => {
        const f = fonctionnaires.find(fn => fn.id === id)
        return f ? `${f.prenom} ${f.nom}` : '-'
    }

    if (loading) {
        return (
        <div style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#c9a03d', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ color: '#64748b' }}>Chargement des transferts...</p>
        </div>
        )
    }

    return (
        <div>
        {/* Back Button */}
        <button
            onClick={() => navigate(-1)}
            style={{ marginBottom: '20px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Retour
        </button>

        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
            Transferts - {article?.nom || `Article #${articleId}`}
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>Historique des mouvements de stock</p>
        </div>

        {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px', marginBottom: '20px', color: '#dc2626', fontSize: '13px' }}>
            ❌ {error}
            </div>
        )}

        {success && (
            <div style={{ background: '#e6f7ec', border: '1px solid #c8e6d9', borderRadius: '8px', padding: '12px', marginBottom: '20px', color: '#0e6b3e', fontSize: '13px' }}>
            ✓ {success}
            </div>
        )}

        {/* Transferts Table */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '24px' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafbfc' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Historique des transferts</span>
            <button
                onClick={() => setShowForm(true)}
                style={{ background: '#0f172a', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Nouveau transfert
            </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Réf. BR</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Date</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Quantité</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Bureau</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Destinataire</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Remarques</th>
                    <th style={{ width: '80px' }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {transferts.map(t => (
                    <tr key={t.id}>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}><strong style={{ color: '#0f172a' }}>{t.reference_br}</strong></td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>{t.date_transfert?.split('-').reverse().join('/')}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>{t.quantite}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>{getBureauName(t.bureau_id)}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>{getFonctionnaireName(t.fonctionnaire_id)}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', color: '#64748b', fontSize: '12px' }}>{t.remarques || '—'}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>
                        <button onClick={() => handleDelete(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#64748b' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="3 6 5 6 21 6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                        </button>
                    </td>
                    </tr>
                ))}
                {transferts.length === 0 && (
                    <tr>
                    <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 12px', opacity: 0.5 }}>
                        <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
                        </svg>
                        <p>Aucun transfert enregistré</p>
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
        </div>

        {/* New Transfert Form Modal */}
        {showForm && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'white', borderRadius: '16px', width: '500px', maxWidth: '90%', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Nouveau transfert</h3>
                <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: '#64748b' }}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px', color: '#475569' }}>Quantité *</label>
                    <input type="number" value={formData.quantite} onChange={(e) => setFormData({ ...formData, quantite: e.target.value })} placeholder="0" min="1" style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                    </div>
                    <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px', color: '#475569' }}>Date de transfert *</label>
                    <input type="date" value={formData.date_transfert} onChange={(e) => setFormData({ ...formData, date_transfert: e.target.value })} style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                    </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px', color: '#475569' }}>Bureau *</label>
                    <select value={formData.bureau_id} onChange={(e) => setFormData({ ...formData, bureau_id: e.target.value })} style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                    <option value="">Sélectionner un bureau</option>
                    {bureaux.map(b => <option key={b.id} value={b.id}>{b.nom}</option>)}
                    </select>
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px', color: '#475569' }}>Destinataire *</label>
                    <select value={formData.fonctionnaire_id} onChange={(e) => setFormData({ ...formData, fonctionnaire_id: e.target.value })} style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                    <option value="">Sélectionner un fonctionnaire</option>
                    {fonctionnaires.map(f => <option key={f.id} value={f.id}>{f.prenom} {f.nom} ({f.bureau?.nom})</option>)}
                    </select>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px', color: '#475569' }}>Remarques</label>
                    <textarea value={formData.remarques} onChange={(e) => setFormData({ ...formData, remarques: e.target.value })} placeholder="Remarques optionnelles..." rows="2" style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                </div>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button type="button" onClick={() => setShowForm(false)} style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Annuler</button>
                    <button type="submit" style={{ padding: '8px 20px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Enregistrer</button>
                </div>
                </form>
            </div>
            </div>
        )}
        </div>
    )
}

export default Transferts