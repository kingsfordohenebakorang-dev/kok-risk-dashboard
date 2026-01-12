'use client';

import { useState } from 'react';

export default function SettingsPage() {
    const [configModal, setConfigModal] = useState<null | string>(null);

    const [showKey, setShowKey] = useState(false);

    return (
        <div className="space-y-6 relative">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">System Configuration</h1>
                    <p className="text-slate-500 text-sm">Manage regional settings, currencies, and API connectors.</p>
                </div>
                <button className="bg-slate-900 text-white px-4 py-2 rounded text-sm font-bold shadow-lg hover:bg-slate-800">
                    Save Changes
                </button>
            </div>

            {/* API KEYS SECTION */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center">
                    🔑 Developer API Keys
                </h3>
                <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <div className="flex-1 w-full">
                        <p className="text-xs font-bold text-slate-500 mb-1">Secret Key (Live)</p>
                        <div className="flex items-center justify-between bg-white border border-slate-200 rounded px-3 py-2">
                            <code className="text-slate-700 font-mono text-sm">
                                {showKey ? 'sk_test_mock_KOKRisk29012SecureKey99' : 'sk_test_*************************'}
                            </code>
                            <button onClick={() => setShowKey(!showKey)} className="text-xs font-bold text-blue-600 hover:text-blue-500">
                                {showKey ? 'Hide' : 'Reveal'}
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => navigator.clipboard.writeText('sk_test_mock_KOKRisk29012SecureKey99')} className="px-3 py-2 bg-white border border-slate-300 rounded text-xs font-bold shadow-sm hover:bg-slate-50">
                            Copy
                        </button>
                        <button onClick={() => alert('Key Rolled! Old key is now invalid.')} className="px-3 py-2 bg-white border border-rose-200 text-rose-600 rounded text-xs font-bold shadow-sm hover:bg-rose-50">
                            Roll Key
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* REGIONAL SETTINGS */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-6 flex items-center">
                        🌍 Active Markets
                    </h3>

                    <div className="space-y-4">
                        {/* GHANA (Active) */}
                        <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center">
                                <span className="text-2xl mr-3">🇬🇭</span>
                                <div>
                                    <p className="font-bold text-slate-900">Ghana (GHS)</p>
                                    <p className="text-xs text-slate-500">Default Market</p>
                                </div>
                            </div>
                            <div className="flex items-center bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                                Active
                            </div>
                        </div>

                        {/* NIGERIA (Inactive) */}
                        <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-lg opacity-60 hover:opacity-100 transition-opacity">
                            <div className="flex items-center">
                                <span className="text-2xl mr-3 grayscale">🇳🇬</span>
                                <div>
                                    <p className="font-bold text-slate-700">Nigeria (NGN)</p>
                                    <p className="text-xs text-slate-400">Not Configured</p>
                                </div>
                            </div>
                            <button
                                onClick={() => alert('🇳🇬 Switch Market: Please enter your CBN License Key to activate Nigeria.')}
                                className="text-blue-600 text-xs font-bold hover:underline"
                            >
                                Enable
                            </button>
                        </div>

                        {/* KENYA (Inactive) */}
                        <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-lg opacity-60 hover:opacity-100 transition-opacity">
                            <div className="flex items-center">
                                <span className="text-2xl mr-3 grayscale">🇰🇪</span>
                                <div>
                                    <p className="font-bold text-slate-700">Kenya (KES)</p>
                                    <p className="text-xs text-slate-400">Not Configured</p>
                                </div>
                            </div>
                            <button
                                onClick={() => alert('🇰🇪 Switch Market: Please enter your CBK License Key to activate Kenya.')}
                                className="text-blue-600 text-xs font-bold hover:underline"
                            >
                                Enable
                            </button>
                        </div>
                    </div>
                </div>

                {/* INTEGRATION SETTINGS */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-6 flex items-center">
                        🔌 Ghana Connectors (Live)
                    </h3>

                    <div className="space-y-4">
                        <IntegrationStatus name="NITC (Ghana Card)" status="Connected" type="Identity" />
                        <IntegrationStatus name="XDS Data Ghana" status="Connected" type="Bureau" />
                        <IntegrationStatus name="MTN MobileMoney API" status="Connected" type="Payments" />
                        <IntegrationStatus name="Hubtel SMS" status="Connected" type="Notifications" />
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mt-8 mb-6 flex items-center">
                        🏦 Core Banking (Legacy)
                    </h3>
                    <div className="space-y-4">
                        {/* T24 */}
                        <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg">
                            <div className="flex items-center">
                                <span className="text-2xl mr-3">🏛️</span>
                                <div>
                                    <p className="font-bold text-slate-900">Temenos T24 (Transact)</p>
                                    <p className="text-xs text-slate-500">Protocol: SOAP/XML</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setConfigModal('T24')}
                                className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-3 py-1 rounded text-xs font-bold shadow-sm"
                            >
                                Configure
                            </button>
                        </div>

                        {/* ORACLE */}
                        <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg">
                            <div className="flex items-center">
                                <span className="text-2xl mr-3">🏗️</span>
                                <div>
                                    <p className="font-bold text-slate-900">Oracle Flexcube</p>
                                    <p className="text-xs text-slate-500">Protocol: ISO 8583</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setConfigModal('ORACLE')}
                                className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-3 py-1 rounded text-xs font-bold shadow-sm"
                            >
                                Configure
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-slate-50 rounded border border-slate-100 text-center">
                        <p className="text-xs text-slate-500 mb-2">Want to add connectors for other regions?</p>
                        <a href="/dashboard/marketplace" className="inline-block text-blue-600 font-bold text-xs border border-blue-200 px-3 py-1 rounded hover:bg-blue-50">View Marketplace</a>
                    </div>
                </div>

            </div>

            {/* SIMULATED CONFIG MODAL */}
            {configModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in">
                    <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden p-0">
                        <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
                            <h3 className="text-white font-bold flex items-center">
                                {configModal === 'T24' ? '🏛️ Temenos T24 Connect' : '🏗️ Oracle Flexcube Connect'}
                            </h3>
                            <button onClick={() => setConfigModal(null)} className="text-slate-400 hover:text-white">✕</button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3 rounded">
                                ⚠️ A Secure VPN Tunnel (IPSec) is required before configuring port listeners.
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">OFS / ISO listener Endpoint</label>
                                <input className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-sm font-mono" defaultValue="10.5.21.44:8080/t24/ofs" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Port</label>
                                    <input className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-sm font-mono" defaultValue="1433" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Timeouts</label>
                                    <input className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-sm font-mono" defaultValue="3000ms" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mutual TLS Cert (mTLS)</label>
                                <div className="border border-dashed border-slate-300 rounded p-4 text-center text-xs text-slate-500 bg-slate-50 hover:bg-white cursor-pointer transition-colors">
                                    Upload .PEM or .PFX Certificate
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end space-x-2">
                                <button onClick={() => setConfigModal(null)} className="px-4 py-2 text-slate-600 font-bold text-sm">Cancel</button>
                                <button onClick={() => { alert('Handshake Initiated! (Simulation)'); setConfigModal(null); }} className="px-4 py-2 bg-blue-600 text-white font-bold text-sm rounded shadow-sm hover:bg-blue-500">
                                    Verify & Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}


function IntegrationStatus({ name, status, type }: any) {
    return (
        <div className="flex justify-between items-center pb-3 border-b border-slate-50 last:border-0 last:pb-0">
            <div>
                <p className="font-bold text-sm text-slate-800">{name}</p>
                <p className="text-[10px] text-slate-400 uppercase">{type}</p>
            </div>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded flex items-center">
                ✅ {status}
            </span>
        </div>
    )
}
