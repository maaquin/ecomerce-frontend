import { useState } from "react";
import { verifyLink as request } from '../../../services'

export function useVerifyLink() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function verifyLink(email, captcha) {
        setLoading(true);
        setError(null);
        try {
            const res = await request({ email, captcha });
            const data = await res.json();
            return data;
        } catch (err) {
            setError(err);
            return { sent: false };
        } finally {
            setLoading(false);
        }
    }

    return { verifyLink, loading, error };
}
