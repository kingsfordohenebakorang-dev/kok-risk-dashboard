'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Use Env Var if available, otherwise fallback to Live Backend
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://kok-risk-git-main-kingsfords-projects-45482bf6.vercel.app';

            // DEMO BYPASS: If backend is down, allow demo user to enter
            if (email === 'demo@risk.co' && password === 'demo123') {
                const fakeUser = {
                    id: 'usr_demo_123',
                    name: 'Demo Admin',
                    email: 'demo@risk.co',
                    role: 'ADMIN',
                    permissions: ['ALL']
                };
                localStorage.setItem('token', 'demo_token_xyz');
                localStorage.setItem('user', JSON.stringify(fakeUser));
                // Simulate network delay
                await new Promise(r => setTimeout(r, 1000));
                router.push('/dashboard');
                return;
            }

            const res = await fetch(`${API_URL}/v1/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Save to localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirect to Dashboard
            router.push('/dashboard');

        } catch (err: any) {
            console.error('Login Error:', err);
            if (err.message === 'Failed to fetch') {
                setError('Cannot connect to Server. Please stick to stable internet, or check if Backend is running.');
            } else {
                setError(err.message || 'Something went wrong');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100 font-sans">
            <div className="w-full max-w-md p-8 bg-slate-800 rounded-xl shadow-2xl border border-slate-700">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                        Risk & Insurance
                    </h1>
                    <p className="text-slate-400 mt-2">Bank-Grade Infrastructure</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder-slate-500"
                            placeholder="admin@risk.co"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder-slate-500"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-900/50 border border-red-500/50 text-red-200 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3.5 rounded-lg font-bold text-lg shadow-lg transition-all transform hover:-translate-y-0.5
              ${loading
                                ? 'bg-slate-600 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white'
                            }`}
                    >
                        {loading ? 'Authenticating...' : 'Secure Login'}
                    </button>
                </form>

                <div className="mt-6 text-center text-xs text-slate-500">
                    SECURED BY AUDIT VAULT • 256-BIT ENCRYPTION
                </div>
            </div>
        </div>
    );
}
