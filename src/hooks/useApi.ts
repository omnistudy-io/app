import axios from 'axios';
import { useState, useEffect } from 'react';

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

    useEffect(() => {
        axios.get(`http://localhost:3001${path}`, { headers: headers }).then((res) => {
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
        axios.post(`http://localhost:3001${path}`, body, { headers: headers }).then((res) => {
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
        axios.put(`http://localhost:3001${path}`, body, { headers: headers }).then((res) => {
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
        axios.delete(`http://localhost:3001${path}`, { headers: headers }).then((res) => {
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