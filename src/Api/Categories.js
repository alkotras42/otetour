import axios from 'axios'
import { API } from '../Helpers/api'

export const getCategories = async () => {
    const res = await axios.get(API.categories.get)
    return res.data.data
} 