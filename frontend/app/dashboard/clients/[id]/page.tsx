'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ClientDetailsPage({ params }: { params: { id: string } }) {
    // State for Credit Overview
    const [overview, setOverview] = useState({
        totalBorrowed: 15400,
        activeLoans: 1,
        repaymentScore: 98,
        utilization: 85
    });

    // State for History
    const [history, setHistory] = useState([
        { date: 'Oct 24, 2024', type: 'SME Micro-Loan', amount: 5000, result: 'APPROVED' },
        { date: 'Aug 12, 2024', type: 'Personal Loan', amount: 2500, result: 'PAID OFF' }
    ]);

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [newLoan, setNewLoan] = useState({ type: 'SME Loan', amount: '' });

    const handleAddLoan = (e: React.FormEvent) => {
        e.preventDefault();
        const amt = parseFloat(newLoan.amount) || 0;

        // Add to history
        setHistory([{
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            type: newLoan.type,
            amount: amt,
            result: 'MANUAL ENTRY' // Identifying manual entry
        }, ...history]);

        // Update totals
        setOverview({
            ...overview,
            totalBorrowed: overview.totalBorrowed + amt,
            activeLoans: overview.activeLoans + 1
        });

        setShowModal(false);
        setNewLoan({ type: 'SME Loan', amount: '' });
    };

    return (
        <div className="max-w-5xl mx-auto relative">

            {/* Modal Overlay */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md animate-in fade-in zoom-in-95">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Add Past Loan Record</h3>
                        <form onSubmit={handleAddLoan} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Loan Type</label>
                                <select
                                    className="w-full bg-slate-50 border border-slate-200 rounded p-2"
                                    value={newLoan.type}
                                    onChange={e => setNewLoan({ ...newLoan, type: e.target.value })}
                                >
                                    <option>SME Loan</option>
                                    <option>Personal Loan</option>
                                    <option>Overdraft (MoMo)</option>
                                    <option>Emergency Credit</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Amount (GHS)</label>
                                <input
                                    type="number"
                                    className="w-full bg-slate-50 border border-slate-200 rounded p-2"
                                    placeholder="e.g. 1000"
                                    value={newLoan.amount}
                                    onChange={e => setNewLoan({ ...newLoan, amount: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="pt-4 flex justify-end gap-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-500 hover:text-slate-700 font-medium">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700">Add Record</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex items-center mb-6">
                <Link href="/dashboard/clients" className="text-slate-400 hover:text-slate-600 mr-4 transition-colors">
                    ← Back to List
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-slate-900">James Kwame Mensah</h1>
                    <p className="text-slate-500 text-sm font-mono uppercase">ID: {params.id}</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">+ Add History</button>
                    <button className="px-4 py-2 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-sm font-medium hover:bg-rose-100">Freeze Account</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Credit Overview</h3>
                            <button className="text-xs text-blue-600 font-medium hover:underline">Edit Stats</button>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="p-4 bg-slate-50 rounded-lg">
                                <span className="text-xs text-slate-500 block">Total Borrowed</span>
                                <span className="text-lg font-bold text-slate-900">GHS {overview.totalBorrowed.toLocaleString()}</span>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-lg">
                                <span className="text-xs text-slate-500 block">Active Loans</span>
                                <span className="text-lg font-bold text-emerald-600">{overview.activeLoans}</span>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-lg">
                                <span className="text-xs text-slate-500 block">Repayment Score</span>
                                <span className="text-lg font-bold text-blue-600">{overview.repaymentScore}/100</span>
                            </div>
                        </div>
                        <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${overview.utilization}%` }}></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2 text-right">Credit Utilization: {overview.utilization}%</p>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Recent Application History</h3>
                            <button onClick={() => setShowModal(true)} className="text-xs bg-slate-50 px-2 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-100">+ Add Manual Record</button>
                        </div>
                        <table className="w-full text-left text-sm">
                            <thead className="text-xs text-slate-400 border-b border-slate-100">
                                <tr>
                                    <th className="pb-2">Date</th>
                                    <th className="pb-2">Type</th>
                                    <th className="pb-2">Amount</th>
                                    <th className="pb-2 text-right">Result</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-600">
                                {history.map((h, i) => (
                                    <tr key={i} className="border-b border-slate-50 last:border-none">
                                        <td className="py-3">{h.date}</td>
                                        <td className="py-3">{h.type}</td>
                                        <td className="py-3 font-medium">GHS {h.amount.toLocaleString()}</td>
                                        <td className="py-3 text-right">
                                            <span className={`font-bold text-xs px-2 py-1 rounded 
                                                ${h.result === 'APPROVED' ? 'text-emerald-600 bg-emerald-50' :
                                                    h.result === 'PAID OFF' ? 'text-slate-500 bg-slate-100' :
                                                        'text-amber-600 bg-amber-50'}`}>
                                                {h.result}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">Contact Info</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex justify-between">
                                <span className="text-slate-500">Phone</span>
                                <span className="font-medium text-slate-900">+233 24 555 0199</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-slate-500">Email</span>
                                <span className="font-medium text-slate-900">james@example.com</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-slate-500">Location</span>
                                <span className="font-medium text-slate-900">Accra, Ghana</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-slate-900 rounded-xl p-6 text-white shadow-lg">
                        <h3 className="text-sm font-bold text-slate-400 mb-2 uppercase">Risk Data</h3>
                        <div className="text-3xl font-bold mb-1">A+</div>
                        <p className="text-slate-400 text-xs">Low Risk Borrower</p>

                        <div className="mt-6 space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-400">MoMo Volatility</span>
                                <span className="text-emerald-400">Low (0.02)</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-400">Gambling Activity</span>
                                <span className="text-emerald-400">None</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
