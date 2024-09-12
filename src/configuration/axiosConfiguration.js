import axios from 'axios'

export const axiosConfiguration = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || 
    'localhost:4000/api/v1/'
})