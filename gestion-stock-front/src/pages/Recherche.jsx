import { useState } from 'react'
import { searchArticles } from '../api/articles'
import { searchFonctionnaire } from '../api/fonctionnaires'

function Recherche() {
    const [activeTab, setActiveTab] = useState('article')
    const [articleQuery, setArticleQuery] = useState('')
    const [articleResults, setArticleResults] = useState([])
    const [articleLoading, setArticleLoading] = useState(false)
    
    const [fonctionnaireQuery, setFonctionnaireQuery] = useState('')
    const [fonctionnaireResult, setFonctionnaireResult] = useState(null)
    const [fonctionnaireLoading, setFonctionnaireLoading] = useState(false)
    
    const [error, setError] = useState('')

    const searchArticlesHandler = async () => {
        if (!articleQuery.trim()) return
        setArticleLoading(true)
        setError('')
        try {
        const response = await searchArticles(articleQuery)
        setArticleResults(response.data)
        } catch (err) {
        console.error('Error searching articles:', err)
        setError('Aucun article trouvé')
        setArticleResults([])
        } finally {
        setArticleLoading(false)
        }
    }

    const searchFonctionnaireHandler = async () => {
        if (!fonctionnaireQuery.trim()) return
        setFonctionnaireLoading(true)
        setError('')
        try {
        const response = await searchFonctionnaire(fonctionnaireQuery)
        setFonctionnaireResult(response.data)
        } catch (err) {
        console.error('Error searching fonctionnaire:', err)
        setError('Aucun fonctionnaire trouvé')
        setFonctionnaireResult(null)
        } finally {
        setFonctionnaireLoading(false)
        }
    }

    return (
        <div>
        <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>Recherche</h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>Rechercher par article ou par fonctionnaire</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', background: 'white', padding: '4px', borderRadius: '12px', border: '1px solid #e2e8f0', width: 'fit-content' }}>
            <button
            onClick={() => setActiveTab('article')}
            style={{
                padding: '8px 24px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'article' ? '#0f172a' : 'transparent',
                color: activeTab === 'article' ? 'white' : '#64748b'
            }}
            >
            Par article
            </button>
            <button
            onClick={() => setActiveTab('fonctionnaire')}
            style={{
                padding: '8px 24px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'fonctionnaire' ? '#0f172a' : 'transparent',
                color: activeTab === 'fonctionnaire' ? 'white' : '#64748b'
            }}
            >
            Par fonctionnaire
            </button>
        </div>

        {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px', marginBottom: '20px', color: '#dc2626' }}>
            {error}
            </div>
        )}

        {/* Article Search Tab */}
        {activeTab === 'article' && (
            <div>
            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                <input
                    type="text"
                    value={articleQuery}
                    onChange={(e) => setArticleQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchArticlesHandler()}
                    placeholder="Rechercher un article..."
                    style={{ flex: 1, padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }}
                />
                <button
                    onClick={searchArticlesHandler}
                    disabled={articleLoading}
                    style={{ background: '#0f172a', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    Rechercher
                </button>
                </div>
            </div>

            {articleLoading && (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ width: '32px', height: '32px', border: '3px solid #e2e8f0', borderTopColor: '#c9a03d', borderRadius: '50%', margin: '0 auto', animation: 'spin 1s linear infinite' }} />
                </div>
            )}

            {articleResults.length > 0 && (
                <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', background: '#fafbfc' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Résultats</span>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                        <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: '11px', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Article</th>
                        <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: '11px', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Catégorie</th>
                        <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: '11px', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Stock restant</th>
                        <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: '11px', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Disponibilité</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articleResults.map(article => (
                        <tr key={article.id}>
                            <td style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9' }}><strong>{article.nom}</strong></td>
                            <td style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9' }}>{article.categorie}</td>
                            <td style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9' }}>{article.stock_restant}</td>
                            <td style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9' }}>
                            <span style={{ display: 'inline-block', width: '60px', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden', marginRight: '8px', verticalAlign: 'middle' }}>
                                <span style={{ width: `${article.disponibilite}%`, height: '100%', background: article.disponibilite > 50 ? '#10b981' : '#f59e0b', display: 'block' }}></span>
                            </span>
                            <span style={{ fontSize: '12px', color: article.disponibilite > 50 ? '#10b981' : '#f59e0b' }}>{article.disponibilite}%</span>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>
            )}
            </div>
        )}

        {/* Fonctionnaire Search Tab */}
        {activeTab === 'fonctionnaire' && (
            <div>
            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                <input
                    type="text"
                    value={fonctionnaireQuery}
                    onChange={(e) => setFonctionnaireQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchFonctionnaireHandler()}
                    placeholder="Rechercher un fonctionnaire..."
                    style={{ flex: 1, padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }}
                />
                <button
                    onClick={searchFonctionnaireHandler}
                    disabled={fonctionnaireLoading}
                    style={{ background: '#0f172a', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    Rechercher
                </button>
                </div>
            </div>

            {fonctionnaireLoading && (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ width: '32px', height: '32px', border: '3px solid #e2e8f0', borderTopColor: '#c9a03d', borderRadius: '50%', margin: '0 auto', animation: 'spin 1s linear infinite' }} />
                </div>
            )}

            {fonctionnaireResult && (
                <>
                <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '24px' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', background: '#fafbfc' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Fonctionnaire: {fonctionnaireResult.fonctionnaire?.prenom} {fonctionnaireResult.fonctionnaire?.nom}</span>
                    </div>
                    <div style={{ padding: '16px 20px' }}>
                    <p><strong>Bureau:</strong> {fonctionnaireResult.fonctionnaire?.bureau?.nom}</p>
                    </div>
                </div>

                <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', background: '#fafbfc' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Articles actuellement détenus</span>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                        <tr>
                            <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: '11px', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Article</th>
                            <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: '11px', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Quantité</th>
                            <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: '11px', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Date de transfert</th>
                        </tr>
                        </thead>
                        <tbody>
                        {fonctionnaireResult.articles_actuels?.length > 0 ? (
                            fonctionnaireResult.articles_actuels.map((item, idx) => (
                            <tr key={idx}>
                                <td style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9' }}>{item.article?.nom}</td>
                                <td style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9' }}>{item.quantite}</td>
                                <td style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9' }}>{item.date_transfert?.split('-').reverse().join('/')}</td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                            <td colSpan="3" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Aucun article détenu</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    </div>
                </div>
                </>
            )}
            </div>
        )}

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )
}

export default Recherche