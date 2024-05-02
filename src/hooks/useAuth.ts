import { useEffect, useState } from 'react';
import axios from "axios";

// The base URL for the API
const base = process.env.API_URL || "http://localhost:3001"

export default function useAuth() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        name: "",
        email: "",
        id: 0
    });

    useEffect(() => {
        const localToken = localStorage.getItem('token');
        const sessionToken = sessionStorage.getItem('token');
        const token = localToken || sessionToken;

        if (token) {
            axios.post(`${base}/auth/token`, {
                token: token
            }).then((res) => {
                setLoading(false);
                setUser(res.data.data);
            }).catch((err) => {
                setLoading(false);
                setUser({
                    name: "",
                    email: "",
                    id: 0
                });
                // window.location.href = "/login";
            });
        }
        else {
            setLoading(false);
            setUser({
                name: "",
                email: "",
                id: 0
            });
            // window.location.href = "/login";
        }
    }, []);

    return { user, loading };
}
