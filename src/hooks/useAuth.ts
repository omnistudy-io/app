import { useEffect, useState } from 'react';
import axios from "axios";

export default function useAuth() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        name: "",
        email: ""
    });

    useEffect(() => {
        const localToken = localStorage.getItem('token');
        const sessionToken = sessionStorage.getItem('token');
        const token = localToken || sessionToken;

        if (token) {
            axios.get("http://localhost:3001/auth/validate/" + token).then((res) => {
                setLoading(false);
                setUser(res.data.user);
            }).catch((err) => {
                setLoading(false);
                setUser({
                    name: "",
                    email: ""
                });
                window.location.href = "/login";
            });
        }
        else {
            setLoading(false);
            setUser({
                name: "",
                email: ""
            });
            window.location.href = "/login";
        }
    }, []);

    return { user, loading };
}
