import api from './axios'

export const getBureaux = () => api.get('/bureaux')
export const createBureau = (data) => api.post('/bureaux', data)
export const updateBureau = (id, data) => api.put(`/bureaux/${id}`, data)
export const deleteBureau = (id) => api.delete(`/bureaux/${id}`)