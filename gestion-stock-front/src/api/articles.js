import api from './axios'

export const getArticles = (categorieId) => api.get(`/categories/${categorieId}/articles`)
export const createArticle = (data) => api.post('/articles', data)
export const updateArticle = (id, data) => api.put(`/articles/${id}`, data)
export const deleteArticle = (id) => api.delete(`/articles/${id}`)
export const searchArticles = (query) => api.get(`/articles/search?q=${query}`)