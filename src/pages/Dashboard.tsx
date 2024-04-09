import { useGet } from "@/hooks/useApi";

export default function Dashboard() {

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const { data, loading, error } = useGet(`/auth/validate/${token}`);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome back, {!loading ? data.user.name : null}</p>
        </div>
    );
}