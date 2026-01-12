'use client';

export default function BillingPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Service Usage & Billing</h1>
                    <p className="text-slate-500 text-sm">Monetization and platform usage tracking for KOK Risk Services.</p>
                </div>
                <div className="text-right">
                    <p className="text-xs font-bold text-slate-500 uppercase">Current Month Invoice</p>
                    <h2 className="text-3xl font-bold text-slate-900">GH₵ 14,250.00</h2>
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded font-bold">Due Feb 1st</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <BillCard title="Scoring API Calls" count="1,240" cost="GH₵ 12,400" sub="GH₵ 10.00 / call" icon="⚡️" />
                <BillCard title="Insurance Commissions" count="GH₵ 50k Vol" cost="GH₵ 1,500" sub="3% Tech Fee" icon="🛡️" />
                <BillCard title="BoG Compliance License" count="Active" cost="GH₵ 1,666" sub="Monthly (20k/yr)" icon="🏛️" />
                <BillCard title="Ent. Support" count="Tier 1" cost="GH₵ 0" sub="Included in Setup" icon="🎧" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* USAGE TABLE (Per-Scoring Fee) */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-slate-800">Usage Breakdown</h3>
                            <p className="text-xs text-slate-500">Real-time meter for API consumption</p>
                        </div>
                        <button
                            onClick={() => alert("Downloading Invoice #INV-2025-001 (PDF)...")}
                            className="text-sm text-blue-600 font-bold hover:underline"
                        >
                            Download Invoice
                        </button>
                    </div>
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500">
                            <tr>
                                <th className="px-6 py-3">Service Module</th>
                                <th className="px-6 py-3">Volume</th>
                                <th className="px-6 py-3">Unit Price</th>
                                <th className="px-6 py-3 text-right">Total (GHS)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr>
                                <td className="px-6 py-4 font-medium text-slate-900">Credit Score (MoMo)</td>
                                <td className="px-6 py-4">840 reqs</td>
                                <td className="px-6 py-4">₵ 10.00</td>
                                <td className="px-6 py-4 text-right font-mono">8,400.00</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-slate-900">Credit Score (Bank)</td>
                                <td className="px-6 py-4">400 reqs</td>
                                <td className="px-6 py-4">₵ 10.00</td>
                                <td className="px-6 py-4 text-right font-mono">4,000.00</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-slate-900">Insurance Tech Fee</td>
                                <td className="px-6 py-4">₵ 50,000 GWP</td>
                                <td className="px-6 py-4">3.0%</td>
                                <td className="px-6 py-4 text-right font-mono text-emerald-600">1,500.00</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-slate-900">BoG Stress Test Module</td>
                                <td className="px-6 py-4">1 License</td>
                                <td className="px-6 py-4">Yearly</td>
                                <td className="px-6 py-4 text-right font-mono text-slate-400">Paid (Annual)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* PLAN DETAILS (Setup & License) */}
                <div className="bg-[#0a2540] rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="font-bold text-lg mb-1">Enterprise Plan</h3>
                        <p className="text-slate-400 text-sm mb-6">Ecobank Ghana Ltd.</p>

                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between border-b border-white/10 pb-3">
                                <span className="text-slate-400">Status</span>
                                <span className="text-emerald-400 font-bold">Active</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-3">
                                <span className="text-slate-400">Deployment Fee</span>
                                <span className="font-bold">GH₵ 250,000</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-3">
                                <span className="text-slate-400">Next Renewal</span>
                                <span className="font-bold">12 Jan 2027</span>
                            </div>
                        </div>

                        <div className="mt-8 bg-white/5 rounded p-4 border border-white/10">
                            <p className="text-xs text-slate-400 mb-1">Account Manager</p>
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold mr-3">K</div>
                                <div>
                                    <p className="font-bold text-sm">K. Oheneba (You)</p>
                                    <p className="text-[10px] text-slate-400">KOK Risk Director</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Circles */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
                </div>

            </div>
        </div>
    );
}

function BillCard({ title, count, cost, sub, icon }: any) {
    return (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
            <div className="flex justify-between mb-4">
                <span className="text-2xl bg-slate-50 w-10 h-10 flex items-center justify-center rounded-lg">{icon}</span>
                <span className="text-slate-900 font-bold text-lg">{cost}</span>
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase mb-1">{title}</p>
            <div className="flex justify-between items-end">
                <span className="text-slate-800 font-medium text-sm">{count}</span>
                <span className="text-[10px] text-slate-400">{sub}</span>
            </div>
        </div>
    )
}
