import axios from 'axios'

const rawBaseUrl = "http://localhost:3000/api"
const baseURL = rawBaseUrl.trim().replace(/^['"]|['"]$/g, '')

export const axiosInstance = axios.create({
    baseURL,
    withCredentials: true
})