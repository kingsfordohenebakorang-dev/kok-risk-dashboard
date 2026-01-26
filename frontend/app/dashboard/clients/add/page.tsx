'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AddClientPage() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 1500));
        setLoading(false);
        alert('Client added successfully! (Mock)');
        // In real app, router.push('/dashboard/clients')
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-6">
                <Link href="/dashboard/clients" className="text-slate-400 hover:text-white mr-4 transition-colors">
                    ← Back
                </Link>
                <h1 className="text-2xl font-bold text-slate-900">Add New Customer</h1>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                            <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Kwame" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                            <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Mensah" required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                        <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500" placeholder="kwame@example.com" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number (MoMo)</label>
                        <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500" placeholder="+233 24 000 0000" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">National ID (Ghana Card)</label>
                        <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 uppercase font-mono" placeholder="GHA-000000000-0" required />
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <button type="submit" disabled={loading} className="bg-[#0a2540] hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg shadow-slate-900/10 flex items-center">
                            {loading ? 'Creating...' : 'Create Customer Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
