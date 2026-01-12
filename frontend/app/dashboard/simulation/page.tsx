'use client';

import { useState, useEffect } from 'react';

export default function SimulationPage() {
    const [volatility, setVolatility] = useState(5); // 5% normal
    const [exchangeRate, setExchangeRate] = useState(15.5); // GHS to USD
    const [premiumBuffer, setPremiumBuffer] = useState(2.5); // Base Buffer
    const [notifications, setNotifications] = useState<any[]>([]);

    // Simulation Logic: Auto-adjust Premium based on Volatility Slider
    useEffect(() => {
        // Pricing Algorithm Simulation
        const newBuffer = 2.5 + (volatility - 5) * 1.2;
        setPremiumBuffer(Math.max(2.5, newBuffer));

        // Trigger Alerts if crisis detected
        if (volatility > 15 && notifications.length === 0) {
            addNotification('⚠️ BoG ALERT: Cedi depreciating rapidly against USD. Rates adjusting.', 'System');
            setTimeout(() => addNotification('📢 Dear Customer, due to high GHS/USD volatility, your KOK Insurance Shield has been activated. Your repayment amount remains fixed in Cedis. We cover the difference.', 'SMS'), 1500);
        }
    }, [volatility]);

    const addNotification = (msg: string, type: string) => {
        const newNote = { id: Date.now(), msg, type, time: new Date().toLocaleTimeString() };
        setNotifications(prev => [newNote, ...prev]);
    };

    return (
        <div className="space-y-8">
            {/* HEADER */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Ghana Market Stress Test</h1>
                    <p className="text-slate-500 text-sm">Simulate Cedi performance to test parametric insurance triggers.</p>
                </div>
                <button
                    onClick={() => { setVolatility(5); setExchangeRate(15.5); setNotifications([]); }}
                    className="text-sm text-slate-500 hover:text-slate-900 underline"
                >
                    Reset Simulation
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT: CONTROL PANEL */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-700 uppercase mb-6 flex items-center">
                            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                            Bank of Ghana (BoG) Interbank Data
                        </h3>

                        <div className="space-y-8">
                            {/* Volatility Slider */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-semibold text-slate-700">Cedi (GHS) Depreciation Rate</label>
                                    <span className={`text-sm font-bold ${volatility > 15 ? 'text-rose-600' : 'text-emerald-600'}`}>
                                        {volatility}% {volatility > 15 ? '(HIGH INFLATION)' : '(STABLE)'}
                                    </span>
                                </div>
                                <input
                                    type="range" min="0" max="40" step="1"
                                    value={volatility}
                                    onChange={(e) => setVolatility(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <div className="flex justify-between text-xs text-slate-400 mt-1">
                                    <span>0% (Stable)</span>
                                    <span>20% (High)</span>
                                    <span>40% (Crash)</span>
                                </div>
                            </div>

                            {/* FX Rate Slider */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-semibold text-slate-700">USD / GHS Exchange Rate</label>
                                    <span className="text-sm font-mono font-bold text-slate-800">
                                        1 USD = {exchangeRate.toFixed(2)} GHS
                                    </span>
                                </div>
                                <input
                                    type="range" min="10" max="30" step="0.1"
                                    value={exchangeRate}
                                    onChange={(e) => setExchangeRate(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* LIVE PRICING IMPACT */}
                    <div className="bg-[#0a2540] p-6 rounded-xl shadow-lg text-white relative overflow-hidden transition-all duration-500">
                        <div className="relative z-10 grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-slate-400 text-xs uppercase font-bold mb-1">Standard Premium</p>
                                <p className="text-3xl font-bold">2.5%</p>
                            </div>
                            <div>
                                <p className={`text-xs uppercase font-bold mb-1 ${volatility > 10 ? 'text-amber-400' : 'text-emerald-400'}`}>
                                    Inflation Buffer (Dynamic)
                                </p>
                                <p className={`text-3xl font-bold transition-all duration-300 ${volatility > 10 ? 'text-amber-400' : 'text-white'}`}>
                                    {premiumBuffer.toFixed(2)}%
                                </p>
                                {volatility > 10 && <p className="text-xs text-amber-300 mt-1 animate-pulse">Adjusting for risk...</p>}
                            </div>
                        </div>
                        {/* Background Graphs */}
                        <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20">
                            <svg viewBox="0 0 100 20" className="w-full h-full"><path fill="none" stroke="currentColor" strokeWidth="2" d={`M0 10 Q 25 ${20 - (volatility / 2)} 50 10 T 100 10`} /></svg>
                        </div>
                    </div>
                </div>

                {/* RIGHT: NOTIFICATION SIMULATOR (PHONE MOCKUP) */}
                <div className="bg-slate-100 rounded-[2.5rem] p-4 border-4 border-slate-300 shadow-2xl relative max-w-sm mx-auto">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-20"></div>

                    <div className="bg-white h-[600px] rounded-[2rem] overflow-hidden relative flex flex-col">
                        {/* Phone Status Bar */}
                        <div className="bg-slate-50 h-14 flex items-end justify-between px-6 pb-2 border-b border-slate-100">
                            <span className="text-xs font-bold text-slate-800">9:41</span>
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                                <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                            </div>
                        </div>

                        {/* Messages App Header */}
                        <div className="bg-slate-50 p-4 shadow-sm z-10">
                            <h4 className="text-lg font-bold text-slate-800">Messages</h4>
                            <p className="text-xs text-slate-500">KOK Risk Alerts</p>
                        </div>

                        {/* Message List */}
                        <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-50/50">

                            {/* Welcome Message */}
                            <div className="flex flex-col items-start animate-in slide-in-from-bottom-4 duration-500">
                                <div className="bg-slate-200 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[85%] text-sm text-slate-700 shadow-sm">
                                    Welcome to KOK Risk alerts. You will receive updates about your loan and insurance Status here.
                                </div>
                                <span className="text-[10px] text-slate-400 mt-1 ml-1">Yesterday 10:00 AM</span>
                            </div>

                            {/* Dynamic Messages */}
                            {notifications.map((note) => (
                                <div key={note.id} className="flex flex-col items-start animate-in slide-in-from-bottom-10 fade-in duration-300">
                                    <div className={`rounded-2xl rounded-tl-sm px-4 py-2 max-w-[90%] text-sm shadow-sm border ${note.type === 'System'
                                        ? 'bg-amber-50 text-amber-800 border-amber-100'
                                        : 'bg-blue-600 text-white'
                                        }`}>
                                        {note.type === 'System' && <strong className="block text-xs mb-1 uppercase opacity-70">Admin Alert</strong>}
                                        {note.msg}
                                    </div>
                                    <span className="text-[10px] text-slate-400 mt-1 ml-1">Just Now</span>
                                </div>
                            ))}

                            {notifications.length === 0 && (
                                <div className="text-center mt-20 opacity-30">
                                    <p className="text-4xl mb-2">📭</p>
                                    <p className="text-xs">No recent alerts</p>
                                </div>
                            )}
                        </div>

                        {/* Phone Bottom Bar */}
                        <div className="h-1 bg-slate-800 w-1/3 mx-auto rounded-full mb-2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
