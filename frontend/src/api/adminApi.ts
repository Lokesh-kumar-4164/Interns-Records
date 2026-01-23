// import type{
//     Admin
// } from '../types/admin'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL as string;
export const verifyLogin = async function (
    email:string,
    password:string
): Promise<any> {
    const res = await axios.post(`${API_URL}/admin/login`,{email,password});
    return res.data;
};