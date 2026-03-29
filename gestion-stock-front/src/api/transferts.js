import api from './axios'

export const getTransferts = (articleId) => api.get(`/articles/${articleId}/transferts`)
export const createTransfert = (data) => api.post('/transferts', data)
export const deleteTransfert = (id) => api.delete(`/transferts/${id}`)