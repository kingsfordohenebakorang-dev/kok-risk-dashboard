'use client';

export default function DashboardPage() {
    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Home</h1>
                    <p className="text-sm text-slate-500 mt-1">Snapshot of your risk portfolio and recent activity.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-3 py-1.5 bg-white border border-slate-300 rounded text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">Last 7 Days</button>
                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-medium shadow-sm hover:bg-blue-700 shadow-blue-500/30">Generate Report</button>
                </div>
            </div>

            {/* Metric Cards - Stripe Style (Zeroed Out for Testing) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="Gross Volume" value="GHS 0.00" trend="-" trendPositive={false} />
                <Card title="Active Loans / Customers" value="0" trend="0 this week" trendPositive={false} />
                <Card title="Net Risk Exposure" value="0.0%" trend="-" trendPositive={true} />
            </div>

            {/* Charts & Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Area */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                    <h3 className="text-sm font-bold text-slate-700 mb-6 border-b border-slate-100 pb-2">Loan Volume (30D)</h3>
                    <div className="h-64 flex items-end justify-center space-x-2 px-2 bg-slate-50 border border-dashed border-slate-200 rounded">
                        <div className="text-center text-slate-400">
                            <span className="text-2xl block mb-2">📉</span>
                            <span className="text-sm font-medium">No activity data yet</span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions / Setup */}
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                        <h3 className="text-sm font-bold text-slate-700 mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            <ActionRow icon="⚡️" label="New Assessment" href="dashboard/assess" />
                            <ActionRow icon="👤" label="Add Customer" href="dashboard/clients" />
                            <ActionRow icon="🛡️" label="Compliance Tools" href="dashboard/compliance" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                        <h3 className="text-sm font-bold text-slate-700 mb-4">System Status</h3>
                        <div className="space-y-3">
                            <StatusRow label="Risk Engine" status="Online" />
                            <StatusRow label="Audit Vault" status="Standby" />
                            <StatusRow label="Bank Integrations" status="Connected" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-700">Recent Transactions</h3>
                </div>
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3">Customer</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                        {/* Empty State */}
                        <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">
                                No recent transactions found. Start a new assessment.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Sub-components
function Card({ title, value, trend, trendPositive }: any) {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <p className="text-xs font-semibold text-slate-500 uppercase mb-2">{title}</p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{value}</h3>
            <p className={`text-xs font-medium mt-2 ${trendPositive ? 'text-emerald-600' : 'text-slate-500'}`}>
                {trend}
            </p>
        </div>
    );
}

function ActionRow({ icon, label, href }: any) {
    return (
        <a href={href} className="flex items-center p-2 rounded hover:bg-slate-50 transition-colors group cursor-pointer">
            <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm mr-3 group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-slate-200">{icon}</span>
            <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600">{label}</span>
            <span className="ml-auto text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
        </a>
    )
}

function StatusRow({ label, status }: any) {
    const isGood = status === 'Operational';
    return (
        <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600">{label}</span>
            <div className="flex items-center">
                <div className={`h-2 w-2 rounded-full mr-2 ${isGood ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                <span className={`text-xs font-medium ${isGood ? 'text-emerald-700' : 'text-amber-700'}`}>{status}</span>
            </div>
        </div>
    )
}

function TableRow({ amount, desc, cust, date, status }: any) {
    const isSuccess = status === 'Succeeded';
    const isPending = status === 'Pending';
    return (
        <tr className="hover:bg-slate-50 transition-colors cursor-pointer">
            <td className="px-6 py-4 font-bold text-slate-900">{amount}</td>
            <td className="px-6 py-4 font-medium">{desc}</td>
            <td className="px-6 py-4 text-slate-500">{cust}</td>
            <td className="px-6 py-4 text-slate-400 text-xs">{date}</td>
            <td className="px-6 py-4 text-right">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border
                    ${isSuccess ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        isPending ? 'bg-amber-50 text-amber-700 border-amber-200' :
                            'bg-rose-50 text-rose-700 border-rose-200'}`}>
                    {status}
                </span>
            </td>
        </tr>
    );
}
