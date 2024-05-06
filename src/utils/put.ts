import axios from "axios";

// Base URL
const base = process.env.REACT_APP_API_BASE;

/**
 * Make a PUT request to the API
 * 
 * @param update A function to update the state with the response data
 * @param path The path to the API endpoint
 * @param data The data to send in the request
 * @param headers Optional headers to send with the request
 * @returns 
 */
export default function put(update: Function, path: string, data: object, headers: object = {}) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    headers = { ...headers, authorization: `Bearer ${token}` };
    
    return new Promise((resolve, _) => {
        axios.put(`${base}${path}`, data, { headers: headers }).then((res) => {
            resolve(res.data);
            update(res.data);
        }).catch((err) => {
            resolve(err);
        });
    });
}
