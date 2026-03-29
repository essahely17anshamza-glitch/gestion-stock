import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Layout from './components/Layout'
import Categories from './pages/Categories'
import Articles from './pages/Articles'
import Transferts from './pages/Transferts'
import Fonctionnaires from './pages/Fonctionnaires'
import Bureaux from './pages/Bureaux'
import Recherche from './pages/Recherche'

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <PrivateRoute>
          <Layout pageTitle="Catégories de Stock" pageSub="Gestion des catégories d'articles">
            <Categories />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/categories/:id/articles" element={
        <PrivateRoute>
          <Layout pageTitle="Articles" pageSub="Liste des articles par catégorie">
            <Articles />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/categories/:id/articles/:articleId/transferts" element={
        <PrivateRoute>
          <Layout pageTitle="Transferts" pageSub="Mouvements de stock vers les bureaux">
            <Transferts />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/fonctionnaires" element={
        <PrivateRoute>
          <Layout pageTitle="Fonctionnaires" pageSub="Gestion des employés de la commune">
            <Fonctionnaires />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/bureaux" element={
        <PrivateRoute>
          <Layout pageTitle="Bureaux" pageSub="Gestion des bureaux de la commune">
            <Bureaux />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/recherche" element={
        <PrivateRoute>
          <Layout pageTitle="Recherche" pageSub="Rechercher par article ou par fonctionnaire">
            <Recherche />
          </Layout>
        </PrivateRoute>
      } />
    </Routes>
  )
}

export default App