import { useState, useEffect } from 'react'
import { getFonctionnaires, createFonctionnaire, updateFonctionnaire, deleteFonctionnaire } from '../api/fonctionnaires'
import { getBureaux } from '../api/bureaux'

function Fonctionnaires() {
    const [fonctionnaires, setFonctionnaires] = useState([])
    const [bureaux, setBureaux] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        bureau_id: ''
    })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
        setLoading(true)
        const [fonctionnairesRes, bureauxRes] = await Promise.all([
            getFonctionnaires(),
            getBureaux()
        ])
        setFonctionnaires(fonctionnairesRes.data)
        setBureaux(bureauxRes.data)
        } catch (err) {
        console.error('Error loading data:', err)
        setError('Erreur lors du chargement')
        } finally {
        setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.nom || !formData.prenom || !formData.bureau_id) {
        setError('Tous les champs sont requis')
        return
        }

        try {
        if (editingId) {
            await updateFonctionnaire(editingId, formData)
            setSuccess('Fonctionnaire modifié avec succès')
        } else {
            await createFonctionnaire(formData)
            setSuccess('Fonctionnaire créé avec succès')
        }
        setFormData({ nom: '', prenom: '', bureau_id: '' })
        setEditingId(null)
        setShowForm(false)
        setError('')
        setTimeout(() => setSuccess(''), 3000)
        loadData()
        } catch (err) {
        console.error('Error saving fonctionnaire:', err)
        setError("Erreur lors de l'enregistrement")
        }
    }

    const handleEdit = (f) => {
        setFormData({
        nom: f.nom,
        prenom: f.prenom,
        bureau_id: f.bureau_id
        })
        setEditingId(f.id)
        setShowForm(true)
        setError('')
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Supprimer ce fonctionnaire ?')) return
        try {
        await deleteFonctionnaire(id)
        setSuccess('Fonctionnaire supprimé avec succès')
        setTimeout(() => setSuccess(''), 3000)
        loadData()
        } catch (err) {
        console.error('Error deleting fonctionnaire:', err)
        setError("Erreur lors de la suppression")
        }
    }

    const getBureauName = (id) => {
        const bureau = bureaux.find(b => b.id === id)
        return bureau?.nom || '-'
    }

    if (loading) {
        return (
        <div style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#c9a03d', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ color: '#64748b' }}>Chargement des fonctionnaires...</p>
        </div>
        )
    }

    return (
        <div>
        <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>Fonctionnaires</h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>Gestion des employés de la commune</p>
        </div>

        {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px', marginBottom: '20px', color: '#dc2626' }}>
            ❌ {error}
            </div>
        )}

        {success && (
            <div style={{ background: '#e6f7ec', border: '1px solid #c8e6d9', borderRadius: '8px', padding: '12px', marginBottom: '20px', color: '#0e6b3e' }}>
            ✓ {success}
            </div>
        )}

        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafbfc' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Liste des fonctionnaires</span>
            <button
                onClick={() => { setShowForm(true); setEditingId(null); setFormData({ nom: '', prenom: '', bureau_id: '' }) }}
                style={{ background: '#0f172a', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Nouveau fonctionnaire
            </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: '11px', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Nom</th>
                    <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: '11px', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Prénom</th>
                    <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: '11px', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Bureau</th>
                    <th style={{ width: '80px' }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {fonctionnaires.map(f => (
                    <tr key={f.id}>
                    <td style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9' }}><strong>{f.nom}</strong></td>
                    <td style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9' }}>{f.prenom}</td>
                    <td style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9' }}>{getBureauName(f.bureau_id)}</td>
                    <td style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9' }}>
                        <button onClick={() => handleEdit(f)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '8px', padding: '4px', color: '#64748b' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 3l4 4-7 7H10v-4l7-7z"/><path d="M4 20h16"/></svg>
                        </button>
                        <button onClick={() => handleDelete(f.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#64748b' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="3 6 5 6 21 6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                        </button>
                    </td>
                    </tr>
                ))}
                {fonctionnaires.length === 0 && (
                    <tr>
                    <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 12px', opacity: 0.5 }}>
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                        </svg>
                        <p>Aucun fonctionnaire trouvé</p>
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
            <div style={{ background: 'white', borderRadius: '16px', width: '450px', maxWidth: '90%', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>{editingId ? 'Modifier le fonctionnaire' : 'Nouveau fonctionnaire'}</h3>
                <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: '#64748b' }}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px', color: '#475569' }}>Nom *</label>
                    <input type="text" value={formData.nom} onChange={(e) => setFormData({ ...formData, nom: e.target.value })} placeholder="Nom" style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px', color: '#475569' }}>Prénom *</label>
                    <input type="text" value={formData.prenom} onChange={(e) => setFormData({ ...formData, prenom: e.target.value })} placeholder="Prénom" style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px', color: '#475569' }}>Bureau *</label>
                    <select value={formData.bureau_id} onChange={(e) => setFormData({ ...formData, bureau_id: e.target.value })} style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                    <option value="">Sélectionner un bureau</option>
                    {bureaux.map(b => <option key={b.id} value={b.id}>{b.nom}</option>)}
                    </select>
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

export default Fonctionnaires