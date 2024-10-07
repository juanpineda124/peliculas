import axios from 'axios'

export const axiosConfiguration = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || 
    'https://proyecto-3-or25.onrender.com/api/v1/'
})