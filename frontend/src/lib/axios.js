import axios from 'axios'

const rawBaseUrl = import.meta.env.VITE_BASE_URL
const baseURL = rawBaseUrl.trim().replace(/^['"]|['"]$/g, '')

export const axiosInstance = axios.create({
    baseURL,
    withCredentials: true
})
