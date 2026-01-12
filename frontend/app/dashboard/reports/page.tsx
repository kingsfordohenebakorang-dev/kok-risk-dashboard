'use client';

import { useState } from 'react';

export default function ReportsPage() {
    const [activeTab, setActiveTab] = useState('BOG');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Regulatory Compliance Command Center</h1>
                    <p className="text-slate-500 text-sm">Automated reporting for Bank of Ghana (BoG) and Ghana Revenue Authority (GRA).</p>
                </div>
                <div className="flex space-x-2 bg-slate-100 p-1 rounded-lg">
                    <TabButton label="BoG Returns" active={activeTab === 'BOG'} onClick={() => setActiveTab('BOG')} />
                    <TabButton label="Tax & E-Levy" active={activeTab === 'TAX'} onClick={() => setActiveTab('TAX')} />
                    <TabButton label="internal Audit" active={activeTab === 'AUDIT'} onClick={() => setActiveTab('AUDIT')} />
                </div>
            </div>

            {activeTab === 'BOG' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
                    <ReportCard
                        title="Monthly BSD Returns"
                        desc="Standard BSD1 form for Bank of Ghana. Includes PAR breakdown."
                        format="CSV / PDF"
                        lastRun="Today, 09:00 AM"
                    />
                    <ReportCard
                        title="Unsecured Credit Exposure"
                        desc="Detailed list of all clean facilities/loans > GHS 50k."
                        format="XLSX"
                        lastRun="Yesterday"
                    />
                    <ReportCard
                        title="Foreign Exchange Exposure"
                        desc="Forex net open position report for USD/GHS facilities."
                        format="PDF"
                        lastRun="Weekly"
                    />
                </div>
            )}

            {activeTab === 'TAX' && (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 animate-in fade-in">
                    <h3 className="font-bold text-slate-800 mb-4">E-Levy & Tax Engine</h3>
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 uppercase text-xs font-bold text-slate-500">
                            <tr>
                                <th className="px-4 py-3">Tax Type</th>
                                <th className="px-4 py-3">Applicable Rate</th>
                                <th className="px-4 py-3">Period Volume</th>
                                <th className="px-4 py-3">Tax Liability</th>
                                <th className="px-4 py-3 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr>
                                <td className="px-4 py-3 font-bold">E-Levy (Disbursements)</td>
                                <td className="px-4 py-3">1.0%</td>
                                <td className="px-4 py-3">GHS 1,250,000</td>
                                <td className="px-4 py-3 text-rose-600 font-mono">GHS 12,500</td>
                                <td className="px-4 py-3 text-right"><span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded font-bold">Remitted</span></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-bold">Corporate Income Tax</td>
                                <td className="px-4 py-3">25.0%</td>
                                <td className="px-4 py-3">GHS 45,000 (Profit)</td>
                                <td className="px-4 py-3 text-rose-600 font-mono">GHS 11,250</td>
                                <td className="px-4 py-3 text-right"><span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded font-bold">Pending</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={() => alert("Generating GRA Compliance Schedule (Form 21)...")}
                            className="bg-slate-900 text-white px-4 py-2 rounded text-sm font-bold hover:bg-slate-800"
                        >
                            Export GRA Schedule
                        </button>
                    </div>
                </div>
            )}

            {activeTab === 'AUDIT' && (
                <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-12 text-center text-slate-400">
                    <p className="text-4xl mb-2">👮🏾‍♂️</p>
                    <p>Internal Audit Log Viewer is authorized for Chief Risk Officer only.</p>
                    <button
                        onClick={() => alert("Access Request Sent to Board Risk Committee.")}
                        className="mt-4 text-blue-600 font-bold text-sm underline"
                    >
                        Request Access
                    </button>
                </div>
            )}

        </div>
    );
}

function TabButton({ label, active, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${active ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
        >
            {label}
        </button>
    )
}

function ReportCard({ title, desc, format, lastRun }: any) {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-50 text-blue-600 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    📄
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">{format}</span>
            </div>
            <h3 className="font-bold text-slate-800 mb-1">{title}</h3>
            <p className="text-xs text-slate-500 mb-6 h-10">{desc}</p>

            <div className="flex justify-between items-center text-xs pt-4 border-t border-slate-100">
                <span className="text-slate-400">Run: <span className="text-slate-600 font-medium">{lastRun}</span></span>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        alert(`Downloading ${title} (${format})... \n\nCompliance Header: Authenticated.`);
                    }}
                    className="text-blue-600 font-bold group-hover:underline z-10"
                >
                    Download ⬇
                </button>
            </div>
        </div>
    )
}
