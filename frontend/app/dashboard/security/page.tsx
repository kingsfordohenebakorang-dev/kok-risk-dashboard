'use client';

export default function SecurityPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Security Operations (SOC)</h1>
                    <p className="text-slate-500 text-sm">Monitor access, audit logs, and threat intelligence.</p>
                </div>
                <div className="flex space-x-2">
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center border border-emerald-200">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                        System Healthy
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* THREAT METRICS */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-xs font-bold text-slate-500 uppercase mb-4">Threat Level</h3>
                    <div className="flex items-center justify-between">
                        <span className="text-4xl font-bold text-slate-900">Low</span>
                        <span className="text-3xl">🛡️</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">No active anomalies detected in last 24h.</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-xs font-bold text-slate-500 uppercase mb-4">Failed Logins (24h)</h3>
                    <div className="flex items-center justify-between">
                        <span className="text-4xl font-bold text-slate-900">3</span>
                        <span className="text-3xl">🔐</span>
                    </div>
                    <p className="text-xs text-rose-500 mt-2 font-bold">2 IPs blocked automatically.</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-xs font-bold text-slate-500 uppercase mb-4">Active Sessions</h3>
                    <div className="flex items-center justify-between">
                        <span className="text-4xl font-bold text-slate-900">8</span>
                        <span className="text-3xl">👨‍💻</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">All sessions originating from GH/NG.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-slate-800">Immutable Audit Logs</h3>
                        <p className="text-xs text-slate-500">Traceable actions for compliance (BoG Requirement).</p>
                    </div>
                    <button className="bg-white border border-slate-300 shadow-sm px-3 py-1.5 rounded text-xs font-bold hover:bg-slate-50">
                        Export CSV
                    </button>
                </div>

                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-3">Timestamp</th>
                            <th className="px-6 py-3">Actor</th>
                            <th className="px-6 py-3">Action</th>
                            <th className="px-6 py-3">Resource</th>
                            <th className="px-6 py-3">IP Address</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <AuditRow
                            time="Now"
                            actor="K. Oheneba (Admin)"
                            action="VIEW_KEYS"
                            resource="Settings / API Keys"
                            ip="102.176.x.x"
                            status="SUCCESS"
                        />
                        <AuditRow
                            time="2 mins ago"
                            actor="System"
                            action="AUTO_DEBIT"
                            resource="Loan #LN-8821"
                            ip="10.0.0.1 (Internal)"
                            status="SUCCESS"
                        />
                        <AuditRow
                            time="15 mins ago"
                            actor="E. Mensah (Officer)"
                            action="APPROVE_LOAN"
                            resource="Application #APP-992"
                            ip="41.218.x.x"
                            status="SUCCESS"
                        />
                        <AuditRow
                            time="1 hour ago"
                            actor="Unknown"
                            action="LOGIN_ATTEMPT"
                            resource="Auth Service"
                            ip="192.168.1.55"
                            status="FAILED"
                            isDanger
                        />
                        <AuditRow
                            time="3 hours ago"
                            actor="Integration Bot"
                            action="SYNC_BUREAU"
                            resource="XDS Data API"
                            ip="10.0.0.5 (Internal)"
                            status="SUCCESS"
                        />
                    </tbody>
                </table>
            </div>

        </div>
    );
}

function AuditRow({ time, actor, action, resource, ip, status, isDanger }: any) {
    return (
        <tr className="hover:bg-slate-50 transition-colors">
            <td className="px-6 py-3 text-slate-500 font-mono text-xs">{time}</td>
            <td className="px-6 py-3 font-medium text-slate-900">{actor}</td>
            <td className="px-6 py-3">
                <span className={`text-[10px] font-bold px-2 py-1 rounded border ${isDanger ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                    {action}
                </span>
            </td>
            <td className="px-6 py-3 text-slate-600">{resource}</td>
            <td className="px-6 py-3 font-mono text-xs text-slate-500">{ip}</td>
            <td className="px-6 py-3">
                <span className={`text-[10px] font-bold ${isDanger ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {status}
                </span>
            </td>
        </tr>
    )
}
