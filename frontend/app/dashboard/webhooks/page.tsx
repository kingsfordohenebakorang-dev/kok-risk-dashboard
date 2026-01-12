export default function WebhooksPage() {
    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h1 className="text-xl font-bold text-slate-900">Webhooks</h1>
                <p className="text-sm text-slate-500 mt-1">Listen for events on your account so your integration can automatically trigger reactions.</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                    <h3 className="font-semibold text-slate-700 text-sm">Hosted Endpoints</h3>
                    <button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded font-medium shadow-sm hover:bg-blue-700">+ Add Endpoint</button>
                </div>

                <div className="divide-y divide-slate-100">
                    <div className="p-4 flex justify-between items-center group cursor-pointer hover:bg-slate-50">
                        <div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-mono font-medium text-slate-900">https://api.fintech-app.com/hooks/risk</span>
                                <span className="bg-emerald-100 text-emerald-700 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold">Live</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Events: <span className="font-mono bg-slate-100 px-1 rounded">risk.decision.created</span>, <span className="font-mono bg-slate-100 px-1 rounded">loan.defaulted</span></p>
                        </div>
                        <div className="text-right text-xs text-slate-400">
                            Last delivery: 2 mins ago
                        </div>
                    </div>

                    <div className="p-4 flex justify-between items-center group cursor-pointer hover:bg-slate-50">
                        <div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-mono font-medium text-slate-500">https://staging.fintech-app.com/hooks</span>
                                <span className="bg-slate-100 text-slate-500 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold">Test</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Events: <span className="font-mono bg-slate-100 px-1 rounded">*</span></p>
                        </div>
                        <div className="text-right text-xs text-slate-400">
                            Last delivery: 2 days ago
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
