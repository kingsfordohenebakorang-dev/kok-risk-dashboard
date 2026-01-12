export default function InsurancePage() {
    return (
        <div className="space-y-8">
            {/* Hero Header */}
            <div className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-xl p-8 text-white relative overflow-hidden shadow-lg border border-emerald-700/50">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Parametric Protection Active</h1>
                    <p className="text-emerald-100 max-w-xl">Your portfolio is secured by our automated risk transfer protocol. Claims are triggered instantly upon initialized default events.</p>

                    <div className="flex gap-6 mt-8">
                        <div>
                            <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Total Coverage</p>
                            <p className="text-2xl font-bold">GHS 1.2M</p>
                        </div>
                        <div className="w-px bg-emerald-700/50"></div>
                        <div>
                            <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Policies Active</p>
                            <p className="text-2xl font-bold">342</p>
                        </div>
                        <div className="w-px bg-emerald-700/50"></div>
                        <div>
                            <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Claims Paid (YTD)</p>
                            <p className="text-2xl font-bold">GHS 45k</p>
                        </div>
                    </div>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
            </div>

            {/* Claims Monitor */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-slate-800">Live Claims Monitor</h2>
                    <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                        Monitoring 342 Schedules
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-4 py-3">Policy ID</th>
                                <th className="px-4 py-3">Loan Ref</th>
                                <th className="px-4 py-3">Coverage Amount</th>
                                <th className="px-4 py-3">Trigger Condition</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-600">
                            <PolicyRow id="POL-8821" refId="LOAN-992" amount="GHS 5,000" trigger="3 Missed Payments" status="Active" />
                            <PolicyRow id="POL-8822" refId="LOAN-993" amount="GHS 15,000" trigger="3 Missed Payments" status="Active" />
                            <PolicyRow id="POL-8825" refId="LOAN-998" amount="NGN 500k" trigger="FX Volatility > 15%" status="Triggered" />
                            <PolicyRow id="POL-8829" refId="LOAN-1002" amount="KES 120k" trigger="3 Missed Payments" status="Payout Processing" />
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Payouts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4">Recent Payouts</h3>
                    <div className="space-y-4">
                        <PayoutRow amount="NGN 500,000" date="Oct 24" reason="Default (90 Days)" />
                        <PayoutRow amount="GHS 2,500" date="Oct 12" reason="Currency Devaluation (Trigger)" />
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4">Coverage Mix</h3>
                    <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
                        [Pie Chart: Default Protection vs FX Shield]
                    </div>
                </div>
            </div>
        </div>
    );
}

function PolicyRow({ id, refId, amount, trigger, status }: any) {
    let statusColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (status === 'Triggered') statusColor = 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse';
    if (status === 'Payout Processing') statusColor = 'bg-blue-50 text-blue-700 border-blue-200';

    return (
        <tr className="hover:bg-slate-50">
            <td className="px-4 py-3 font-mono text-slate-500">{id}</td>
            <td className="px-4 py-3 font-medium text-slate-700">{refId}</td>
            <td className="px-4 py-3 font-bold">{amount}</td>
            <td className="px-4 py-3 text-xs text-slate-500">{trigger}</td>
            <td className="px-4 py-3">
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${statusColor}`}>{status}</span>
            </td>
            <td className="px-4 py-3 text-right">
                <button className="text-blue-600 hover:text-blue-800 text-xs font-semibold">View Cert</button>
            </td>
        </tr>
    )
}

function PayoutRow({ amount, date, reason }: any) {
    return (
        <div className="flex justify-between items-center bg-slate-50 p-3 rounded border border-slate-100">
            <div>
                <p className="font-bold text-slate-800">{amount}</p>
                <p className="text-xs text-slate-500">{reason}</p>
            </div>
            <div className="text-right">
                <p className="text-xs font-medium text-emerald-600">Paid</p>
                <p className="text-[10px] text-slate-400">{date}</p>
            </div>
        </div>
    )
}
