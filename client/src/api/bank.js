import axios from './axios.js'

export const bankRequest = () => axios.get('/bank')

export const getProjectsRequest = () => axios.get('/projects')

export const createProjectRequest = (data) => axios.post('/create-project', data)

export const addAmountRequest = (data, id) => axios.put(`/add-amount/${id}`, data)

export const withdrawAmountRequest = (data, id) =>  axios.put(`/withdraw-amount/${id}`, data)