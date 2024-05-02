import axios from "axios";
import { useState, useEffect } from "react";
import useAuth from "./useAuth";

// The base URL for the API
const base = process.env.API_URL || "http://localhost:3001";

/**
 * Make a GET request to the API
 * 
 * @param path The API endpoint, Ex: /users, /users/1
 * @param headers The headers object to send
 * @returns Three state objects: data, loading, error
 */
function useGet(path: string, headers: object = {}) {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Get the current user
    const { user } = useAuth();

    useEffect(() => {
        // Wait until user is found to complete request
        if(user && user.id > 0) {
            // Replace userId placeholder with real user id
            path = path.replaceAll("{userId}", `${user.id}`);
            // Make the request
            axios.get(`${base}${path}`, { headers: headers }).then((res) => {
                setData(res.data);
                setLoading(false);
            }).catch((err) => {
                setError(err); 
                setLoading(false);
            });
        }
    }, [user]);

    return { data, loading, error };
}

/**
 * Make a POST request to the API
 *  
 * @param path The API endpoint, Ex: /users, /users/1
 * @param headers The headers object to send
 * @param body The body object to send
 * @returns Three state objects: data, loading, error
 */
function usePost(path: string, headers: object = {}, body: object = {}) {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.post(`${base}${path}`, body, { headers: headers }).then((res) => {
            setData(res.data);
            setLoading(false);
        }).catch((err) => {
            setError(err); 
            setLoading(false);
        });
    }, []);

    return { data, loading, error };
}


/**
 * Make a PUT request to the API
 * 
 * @param path The API endpoint, Ex: /users, /users/1
 * @param headers The headers object to send
 * @param body The body object to send
 * @returns Three state objects: data, loading, error
 */
function usePut(path: string, headers: object = {}, body: object = {}) {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.put(`${base}${path}`, body, { headers: headers }).then((res) => {
            setData(res.data);
            setLoading(false);
        }).catch((err) => {
            setError(err); 
            setLoading(false);
        });
    }, []);

    return { data, loading, error };
}

export async function put(path: string, headers: object = {}, body: object = {}) {
    await new Promise(async (resolve, _) => {
        await axios.put(`${base}${path}`, body, { headers: headers }).then((res) => {
            resolve({ ok: true, data: res.data });
        }).catch((err) => {
            resolve({ ok: false, err: err });
        });
    });
}

/**
 * Make a DELETE request to the API
 * 
 * @param path The API endpoint, Ex: /users, /users/1
 * @param headers The headers object to send
 * @param body The body object to send
 * @returns Three state objects: data, loading, error
 */
function useDelete(path: string, headers: object = {}, body: object = {}) {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.delete(`${base}${path}`, { headers: headers }).then((res) => {
            setData(res.data);
            setLoading(false);
        }).catch((err) => {
            setError(err); 
            setLoading(false);
        });
    }, []);

    return { data, loading, error };
}

export { useGet, usePost, usePut, useDelete };
