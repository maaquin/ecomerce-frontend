import { useState } from "react";
import { verifyToken as request } from '../../../services'

export function useVerifyToken() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function verifyToken(token) {
        setLoading(true);
        setError(null);
        try {
            const res = await request(token);
            const data = await res.data;
            return data;
        } catch (err) {
            setError(err);
            return { valid: false };
        } finally {
            setLoading(false);
        }
    }

    return { verifyToken, loading, error };
}
