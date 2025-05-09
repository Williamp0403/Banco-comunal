import axios from './axios.js'

export const bankRequest = () => axios.get('/bank')

export const getProjectsRequest = () => axios.get('/projects')

export const createProjectRequest = (data) => axios.post('/create-project', data)