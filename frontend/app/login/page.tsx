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

            // DEFINITIONS
            const cleanEmail = email.trim().toLowerCase();
            const cleanPass = password.trim();

            // DEBUGGING: Check what is actually being submitted
            console.log('Attempting Login:', { cleanEmail, cleanPass });

            // 1. CHECK ANALYST
            if (cleanEmail === 'analyst@risk.co' && cleanPass === 'view123') {
                console.log('✅ Analyst Login Match');
                const analystUser = {
                    id: 'usr_analyst_001',
                    name: 'Junior Analyst',
                    email: 'analyst@risk.co',
                    role: 'ANALYST',
                    permissions: ['VIEW_REPORTS', 'VIEW_DASHBOARD']
                };
                localStorage.setItem('token', 'analyst_token_xyz');
                localStorage.setItem('user', JSON.stringify(analystUser));
                router.push('/dashboard'); // Removed timeout to speed up
                return; // 🛑 STOP HERE
            }

            // 2. CHECK ADMIN
            if (cleanEmail === 'demo@risk.co' && cleanPass === 'demo123') {
                console.log('✅ Admin Login Match');
                const fakeUser = {
                    id: 'usr_demo_123',
                    name: 'Demo Admin',
                    email: 'demo@risk.co',
                    role: 'ADMIN',
                    permissions: ['ALL']
                };
                localStorage.setItem('token', 'demo_token_xyz');
                localStorage.setItem('user', JSON.stringify(fakeUser));
                router.push('/dashboard');
                return; // 🛑 STOP HERE
            }

            // 3. CHECK UNDERWRITER
            if (cleanEmail === 'underwriter@risk.co' && cleanPass === 'under123') {
                console.log('✅ Underwriter Login Match');
                const underwriterUser = {
                    id: 'usr_under_001',
                    name: 'Senior Underwriter',
                    email: 'underwriter@risk.co',
                    role: 'UNDERWRITER',
                    permissions: ['VIEW_RISK_MODELS', 'EDIT_POLICIES']
                };
                localStorage.setItem('token', 'underwriter_token_xyz');
                localStorage.setItem('user', JSON.stringify(underwriterUser));
                router.push('/dashboard');
                return; // 🛑 STOP HERE
            }

            console.log('❌ No local match. Credentials provided:', { cleanEmail, cleanPass });

            // AUTOMATIC FAILURE for now to prevent "Load Failed" error
            // This confirms if the issue is just a wrong password.
            throw new Error('Invalid Credentials (Demo Mode Only). Try: analyst@risk.co (view123), demo@risk.co (demo123), or underwriter@risk.co (under123)');

            /* 
            // DISABLE BACKEND FETCH TEMPORARILY
            const res = await fetch(`${API_URL}/v1/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            */

            /*
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Save to localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirect to Dashboard
            router.push('/dashboard');
            */

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

                <div className="mt-6">
                    <details className="text-xs text-slate-500 cursor-pointer">
                        <summary className="hover:text-blue-400 transition-colors">View Demo Credentials</summary>
                        <div className="mt-2 p-3 bg-slate-900/50 rounded border border-slate-700 text-left space-y-2">
                            <div>
                                <span className="font-bold text-slate-300">Analyst:</span> analyst@risk.co / view123
                            </div>
                            <div>
                                <span className="font-bold text-slate-300">Admin:</span> demo@risk.co / demo123
                            </div>
                            <div>
                                <span className="font-bold text-slate-300">Underwriter:</span> underwriter@risk.co / under123
                            </div>
                        </div>
                    </details>
                </div>

                <div className="mt-6 text-center text-xs text-slate-500">
                    SECURED BY AUDIT VAULT • 256-BIT ENCRYPTION
                </div>
            </div>
        </div>
    );
}
