import api from './axios'

export const getFonctionnaires = () => api.get('/fonctionnaires')
export const createFonctionnaire = (data) => api.post('/fonctionnaires', data)
export const updateFonctionnaire = (id, data) => api.put(`/fonctionnaires/${id}`, data)
export const deleteFonctionnaire = (id) => api.delete(`/fonctionnaires/${id}`)
export const searchFonctionnaire = (query) => api.get(`/fonctionnaires/search?q=${query}`)