'use client';

import Link from 'next/link';

export default function ClientDetailsPage({ params }: { params: { id: string } }) {
    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center mb-6">
                <Link href="/dashboard/clients" className="text-slate-400 hover:text-slate-600 mr-4 transition-colors">
                    ← Back to List
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-slate-900">James Kwame Mensah</h1>
                    <p className="text-slate-500 text-sm font-mono uppercase">ID: {params.id}</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Edit Profile</button>
                    <button className="px-4 py-2 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-sm font-medium hover:bg-rose-100">Freeze Account</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">Credit Overview</h3>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="p-4 bg-slate-50 rounded-lg">
                                <span className="text-xs text-slate-500 block">Total Borrowed</span>
                                <span className="text-lg font-bold text-slate-900">GHS 15,400</span>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-lg">
                                <span className="text-xs text-slate-500 block">Active Loans</span>
                                <span className="text-lg font-bold text-emerald-600">1</span>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-lg">
                                <span className="text-xs text-slate-500 block">Repayment Score</span>
                                <span className="text-lg font-bold text-blue-600">98/100</span>
                            </div>
                        </div>
                        <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[85%]"></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2 text-right">Credit Utilization: 85%</p>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">Recent Application History</h3>
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
                                <tr className="border-b border-slate-50">
                                    <td className="py-3">Oct 24, 2024</td>
                                    <td className="py-3">SME Micro-Loan</td>
                                    <td className="py-3 font-medium">GHS 5,000</td>
                                    <td className="py-3 text-right"><span className="text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-1 rounded">APPROVED</span></td>
                                </tr>
                                <tr>
                                    <td className="py-3">Aug 12, 2024</td>
                                    <td className="py-3">Personal Loan</td>
                                    <td className="py-3 font-medium">GHS 2,500</td>
                                    <td className="py-3 text-right"><span className="text-slate-500 font-bold text-xs bg-slate-100 px-2 py-1 rounded">PAID OFF</span></td>
                                </tr>
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
