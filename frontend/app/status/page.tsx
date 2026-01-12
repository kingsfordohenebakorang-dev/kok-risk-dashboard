'use client';

import { useState } from 'react';

export default function StatusPage() {
    const [id, setId] = useState('');
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const checkStatus = () => {
        setLoading(true);
        // Simulate API lookup
        setTimeout(() => {
            setResult({
                name: "Kwame Mensah",
                loanAmount: "GHS 5,000",
                status: "APPROVED_FUNDED",
                riskGrade: "A",
                policyId: "POL-009882",
                date: "12 Oct 2025"
            });
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-[#0a2540] p-6 text-center">
                    <h1 className="text-xl font-bold text-white">Application Tracker</h1>
                    <p className="text-slate-400 text-sm mt-1">Check your loan & insurance status</p>
                </div>

                <div className="p-8">
                    {!result ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                    Enter Reference ID or Phone
                                </label>
                                <input
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    placeholder="e.g. L-2024-882 or 054xxxxxxx"
                                    className="w-full text-lg p-3 bg-slate-100 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:bg-white transition-all outline-none"
                                />
                            </div>
                            <button
                                onClick={checkStatus}
                                disabled={!id || loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? 'Searching Database...' : 'Track Application'}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                    ✅
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">Congratulations!</h2>
                                <p className="text-emerald-600 font-medium">Application Approved & Funded</p>
                            </div>

                            <div className="bg-slate-50 rounded-lg p-4 space-y-3 text-sm border border-slate-100">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Borrower</span>
                                    <span className="font-semibold text-slate-900">{result.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Loan Amount</span>
                                    <span className="font-bold text-slate-900">{result.loanAmount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Risk Grade</span>
                                    <span className="font-bold text-slate-900 bg-emerald-100 text-emerald-800 px-2 rounded">{result.riskGrade}</span>
                                </div>
                            </div>

                            <div className="bg-[#0a2540] text-white p-4 rounded-lg relative overflow-hidden">
                                <div className="relative z-10">
                                    <p className="text-xs text-white/60 uppercase tracking-widest font-bold mb-1">Insurance Active</p>
                                    <p className="font-mono text-lg tracking-wider">{result.policyId}</p>
                                    <p className="text-[10px] text-emerald-300 mt-2 flex items-center">
                                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></span>
                                        Protected against Inflation & Default
                                    </p>
                                </div>
                                <div className="absolute -right-4 -bottom-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                            </div>

                            <button
                                onClick={() => setResult(null)}
                                className="w-full text-slate-400 text-sm hover:text-slate-600 pt-2"
                            >
                                Check Another
                            </button>
                        </div>
                    )}
                </div>

                <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                    <p className="text-[10px] text-slate-400">Powered by KOK Risk Infrastructure</p>
                </div>
            </div>
        </div>
    );
}
