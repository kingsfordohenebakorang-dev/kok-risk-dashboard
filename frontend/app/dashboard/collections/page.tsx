'use client';

import { useState } from 'react';

export default function CollectionsPage() {
    const [nudging, setNudging] = useState(false);

    const triggerNudges = () => {
        setNudging(true);
        setTimeout(() => {
            setNudging(false);
            alert('📢 Batch Processed: 1,250 WhatsApp Nudges sent to "Yellow" risk segment.');
        }, 2000);
    };

    return (
        <div className="space-y-8">
            {/* HEADER */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Collections & Recovery Engine</h1>
                    <p className="text-slate-500 text-sm">AI-driven nudging and recovery prioritization.</p>
                </div>
                <button
                    onClick={triggerNudges}
                    disabled={nudging}
                    className={`px-4 py-2 rounded-lg font-bold text-sm shadow-sm transition-all ${nudging ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 text-white'}`}
                >
                    {nudging ? '🚀 Sending...' : '📢 Trigger Smart Nudges'}
                </button>
            </div>

            {/* METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <MetricCard title="Recovery Rate (MoM)" value="94.2%" trend="+1.5%" color="emerald" />
                <MetricCard title="Auto-Debit Success" value="88.5%" trend="-0.2%" color="blue" />
                <MetricCard title="Promise-to-Pay (PTP)" value="65%" trend="Stable" color="amber" />
                <MetricCard title="Portfolio at Risk (PAR 30)" value="4.2%" trend="-0.5%" color="emerald" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT: PRIORITIZED RECOVERY QUEUE */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800">🔥 High-Risk Recovery Queue</h3>
                        <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-1 rounded">AI Prioritized</span>
                    </div>

                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
                            <tr>
                                <th className="px-6 py-3">Borrower</th>
                                <th className="px-6 py-3">Days Past Due</th>
                                <th className="px-6 py-3">Risk Score</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <QueueRow name="Emmanuel K." dpd="45 Days" score="D-" amount="GHS 2,400" />
                            <QueueRow name="Sarah O." dpd="32 Days" score="C" amount="GHS 500" />
                            <QueueRow name="John D." dpd="15 Days" score="B-" amount="GHS 12,000" />
                            <QueueRow name="Kwame A." dpd="8 Days" score="A" amount="GHS 1,200" />
                        </tbody>
                    </table>
                </div>

                {/* RIGHT: SMART NUDGE PREVIEW */}
                <div className="space-y-6">
                    <div className="bg-[#0a2540] p-6 rounded-xl text-white shadow-lg">
                        <h3 className="font-bold text-sm text-emerald-400 uppercase mb-4">Behavioral Nudge Logic</h3>
                        <div className="space-y-4">
                            <div className="border-l-2 border-emerald-500 pl-4">
                                <p className="text-xs text-slate-400">Trigger: "Grade A" Borrower</p>
                                <p className="text-sm italic">"Hi [Name], pay 2 days early to boost your Credit Limit by 10% next month! 🚀"</p>
                            </div>
                            <div className="border-l-2 border-amber-500 pl-4">
                                <p className="text-xs text-slate-400">Trigger: "Grade C" (Late 2 days)</p>
                                <p className="text-sm italic">"Hi [Name], avoiding late fees saves you GHS 50. Pay via *170# now."</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <h3 className="font-bold text-slate-800 mb-4">Auto-Debit Health</h3>
                        <div className="space-y-3">
                            <DebitStatus provider="MTN MoMo" status="Operational" success="92%" />
                            <DebitStatus provider="Telecel Cash" status="Degraded" success="74%" />
                            <DebitStatus provider="GIP (Bank)" status="Operational" success="98%" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

function MetricCard({ title, value, trend, color }: any) {
    const colors: any = { emerald: 'text-emerald-600', blue: 'text-blue-600', amber: 'text-amber-600' };
    return (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-xs font-bold uppercase">{title}</p>
            <div className="flex justify-between items-end mt-2">
                <h2 className="text-2xl font-bold text-slate-900">{value}</h2>
                <span className={`text-xs font-bold ${colors[color]}`}>{trend}</span>
            </div>
        </div>
    )
}

function QueueRow({ name, dpd, score, amount }: any) {
    return (
        <tr className="hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4 font-medium text-slate-900">{name}</td>
            <td className="px-6 py-4 text-rose-600 font-bold">{dpd}</td>
            <td className="px-6 py-4 text-slate-500">{score}</td>
            <td className="px-6 py-4 font-mono">{amount}</td>
            <td className="px-6 py-4 text-right">
                <button className="text-blue-600 hover:text-blue-800 text-xs font-bold border border-blue-200 px-3 py-1 rounded hover:bg-blue-50">Call 📞</button>
            </td>
        </tr>
    )
}

function DebitStatus({ provider, status, success }: any) {
    return (
        <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${status === 'Operational' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></div>
                <span className="font-medium text-slate-700">{provider}</span>
            </div>
            <span className="font-mono font-bold text-slate-500">{success}</span>
        </div>
    )
}
