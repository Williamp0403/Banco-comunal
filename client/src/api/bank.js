import axios from './axios.js'

export const bankRequest = () => axios.get('/bank')

export const getProjectsRequest = () => axios.get('/projects')

export const createProjectRequest = (data) => axios.post('/create-project', data)

export const updateStateRequest = (data, id) => axios.put(`/update-state/${id}`, data)

export const deleteProjectRequest = (id) => axios.delete(`/delete-project/${id}`)

export const addAmountRequest = (data, id) => axios.put(`/add-amount/${id}`, data)

export const withdrawAmountRequest = (data, id) =>  axios.put(`/withdraw-amount/${id}`, data)