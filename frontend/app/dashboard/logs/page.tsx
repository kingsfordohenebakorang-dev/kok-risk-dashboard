export default function LogsPage() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-slate-900">System Logs</h1>
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Live Stream</span>
                </div>
            </div>

            <div className="bg-[#1e293b] rounded-lg shadow-sm border border-slate-700 overflow-hidden font-mono text-sm h-[600px] overflow-y-auto p-4 text-slate-300">
                <div className="space-y-1">
                    <LogLine time="10:23:45" level="INFO" msg="Incoming request: POST /v1/evaluate" />
                    <LogLine time="10:23:45" level="INFO" msg="Risk Engine: Starting assessment for borrower_id: 233..." />
                    <LogLine time="10:23:46" level="DEBUG" msg="Module[Affordability]: DTI Calculated at 0.42 (Pass)" color="text-blue-400" />
                    <LogLine time="10:23:46" level="DEBUG" msg="Module[Credit]: Bureau Score 780 mapped to PD 0.04" color="text-blue-400" />
                    <LogLine time="10:23:47" level="INFO" msg="Decision: APPROVED (Score 78). Premium: 50 GHS" color="text-emerald-400" />
                    <LogLine time="10:23:47" level="INFO" msg="Audit Vault: Record 0x8f2... saved to ledger." />
                    <LogLine time="10:24:12" level="INFO" msg="Incoming request: GET /v1/health" />
                    <LogLine time="10:25:00" level="WARN" msg="Job[CurrencyUpdate]: Volatility spike detected in NGN (+2.4%)" color="text-amber-400" />
                    <LogLine time="10:25:01" level="INFO" msg="Pricing Engine: Adjusted NGN buffer to 15.4%" />
                </div>
            </div>
        </div>
    );
}

function LogLine({ time, level, msg, color }: any) {
    return (
        <div className="flex space-x-3 hover:bg-white/5 p-0.5 rounded">
            <span className="text-slate-500 shrink-0">{time}</span>
            <span className={`w-12 shrink-0 font-bold ${level === 'ERROR' ? 'text-rose-500' : (level === 'WARN' ? 'text-amber-500' : 'text-emerald-500')}`}>
                {level}
            </span>
            <span className={`break-all ${color || 'text-slate-300'}`}>{msg}</span>
        </div>
    )
}
