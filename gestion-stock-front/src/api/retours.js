import api from './axios'

export const createRetour = (data) => api.post('/retours', data)