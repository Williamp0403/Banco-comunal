import axios from './axios.js'

export const loginRequest = (data) => axios.post('/login', data)