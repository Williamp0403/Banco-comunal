import axios from "./axios"

export const getMovementsRequest = (data) => axios.get(`/movements?since=${data.since}&until=${data.until}`)

export const latestMovementsRequest = () => axios.get('/latest-movements')