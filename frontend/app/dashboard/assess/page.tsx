'use client';

import { useState } from 'react';

export default function NewAssessmentPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [dataSource, setDataSource] = useState<'MOMO' | 'BANK'>('MOMO');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        const formData = new FormData(e.currentTarget);
        const payload: any = {
            borrower_id: formData.get('borrowerId'),
            loan_amount: parseFloat(formData.get('amount') as string),
            currency: formData.get('currency'),
            tenor: parseInt(formData.get('tenor') as string),
            employment_type: formData.get('employment'),
        };

        if (dataSource === 'MOMO') {
            // Mapping MoMo Inflow to 'monthly_income' for the engine
            payload.monthly_income = parseFloat(formData.get('momoInflow') as string);
            // Extra data that we will eventually send to the engine exclusively
            payload.wallet_age = formData.get('walletAge');
            payload.zero_bal_days = formData.get('zeroBal');
        } else { // BANK
            payload.monthly_income = parseFloat(formData.get('monthlySalary') as string);
            payload.wallet_age = formData.get('bankAccountAge');
            payload.employer = formData.get('employer');
        }

        try {
            const token = localStorage.getItem('token');
            // Use Env Var if available, otherwise fallback to Live Backend
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://kok-risk-git-main-kingsfords-projects-45482bf6.vercel.app';

            const res = await fetch(`${API_URL}/v1/evaluate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed');
            setResult(data);

        } catch (err: any) {
            alert('Assessment Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">New Risk Assessment</h1>
                <p className="text-slate-500 text-sm">Enter Mobile Money and Telecom data to score unbanked borrowers.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-2 space-y-6">
                    <form onSubmit={handleSubmit}>

                        {/* SECTION 1: BORROWER PROFILE (CORE DATA) */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-6">
                            <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
                                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">1. Borrower Profile</h3>
                                <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded">GHANA MARKET</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1">Borrower / Wallet ID (Ghana Card)</label>
                                    <div className="flex gap-2">
                                        <input name="borrowerId" className="flex-1 bg-slate-50 border border-slate-200 rounded p-2.5 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none uppercase font-mono" placeholder="GHA-000000000-0" required />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                const btn = e.currentTarget;
                                                const statusSpan = document.getElementById('bureau-status');
                                                btn.innerHTML = '⏳ Verifying...';
                                                btn.className = "bg-slate-100 text-slate-500 px-3 py-2 rounded text-xs font-bold border border-slate-300 cursor-not-allowed";

                                                // Simulate API Call to XDS Data Ghana
                                                setTimeout(() => {
                                                    btn.innerHTML = '✅ Verified';
                                                    btn.className = "bg-emerald-100 text-emerald-700 px-3 py-2 rounded text-xs font-bold border border-emerald-200";
                                                    if (statusSpan) {
                                                        statusSpan.innerHTML = 'Found: Kojo Mensah (Score 720)';
                                                        statusSpan.className = "text-xs text-emerald-600 mt-1 block animate-in fade-in";
                                                    }
                                                    (document.getElementsByName('history')[0] as HTMLInputElement).value = 'GOOD';
                                                }, 1500);
                                            }}
                                            className="bg-[#0a2540] hover:bg-slate-800 text-white px-3 py-2 rounded text-xs font-bold shadow-sm transition-colors"
                                        >
                                            Verify ID
                                        </button>
                                    </div>
                                    <span id="bureau-status" className="text-xs text-slate-400 mt-1 hidden"></span>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1">Region / Location</label>
                                    <select name="location" className="w-full bg-slate-50 border border-slate-200 rounded p-2.5 text-slate-900">
                                        <option value="ACCRA">Greater Accra Region</option>
                                        <option value="ASHANTI">Ashanti Region (Kumasi)</option>
                                        <option value="WESTERN">Western Region (Takoradi)</option>
                                        <option value="NORTHERN">Northern Region (Tamale)</option>
                                        <option value="EASTERN">Eastern Region (Koforidua)</option>
                                        <option value="VOLTA">Volta Region (Ho)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1">Age Range</label>
                                    <select name="ageRange" className="w-full bg-slate-50 border border-slate-200 rounded p-2.5 text-slate-900">
                                        <option value="18-25">18 - 25 Years</option>
                                        <option value="26-35">26 - 35 Years</option>
                                        <option value="36-50">36 - 50 Years</option>
                                        <option value="50+">50+ Years</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1">Credit History (XDS Data)</label>
                                    <select name="history" className="w-full bg-slate-50 border border-slate-200 rounded p-2.5 text-slate-900">
                                        <option value="NEW">No History (New Borrower)</option>
                                        <option value="GOOD">Good Standing</option>
                                        <option value="POOR">Missed Payments</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 2: LOAN DETAILS (GHS ONLY) */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-6">
                            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4 border-b border-slate-100 pb-2">2. Loan Request</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-slate-500 mb-1">Amount Requested (GHS)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-slate-500 font-bold">₵</span>
                                        <input type="number" name="amount" className="w-full bg-slate-50 border border-slate-200 rounded p-2.5 pl-8 text-slate-900 font-bold text-lg" placeholder="5,000.00" required />
                                        <input type="hidden" name="currency" value="GHS" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1">Duration (Tenor)</label>
                                    <select name="tenor" className="w-full bg-slate-50 border border-slate-200 rounded p-2.5 text-slate-900">
                                        <option value="30">30 Days</option>
                                        <option value="60">60 Days</option>
                                        <option value="90">90 Days</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 3: FINANCIAL DATA SOURCE */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-6 relative overflow-hidden">
                            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-2">
                                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center">
                                    3. Financial Data
                                </h3>
                                <div className="bg-slate-100 p-1 rounded-lg flex text-xs font-semibold">
                                    <button
                                        type="button"
                                        onClick={() => setDataSource('MOMO')}
                                        className={`px-3 py-1.5 rounded transition-all ${dataSource === 'MOMO' ? 'bg-[#0a2540] text-white shadow' : 'text-slate-500 hover:text-slate-900'}`}
                                    >
                                        Mobile Money
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setDataSource('BANK')}
                                        className={`px-3 py-1.5 rounded transition-all ${dataSource === 'BANK' ? 'bg-[#0a2540] text-white shadow' : 'text-slate-500 hover:text-slate-900'}`}
                                    >
                                        Bank Statement
                                    </button>
                                </div>
                            </div>

                            {/* DOCUMENT UPLOAD ZONE */}
                            <div className="mb-8 border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors relative">
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;

                                        // Simulate AI Analysis
                                        const btn = document.getElementById('analysis-status');
                                        if (btn) {
                                            btn.innerHTML = `<span class="animate-pulse">🔄 Scanning <b>${file.name}</b> with OCR...</span>`;

                                            setTimeout(() => {
                                                // Auto-fill logic based on Data Source
                                                if (dataSource === 'MOMO') {
                                                    (document.getElementsByName('momoInflow')[0] as HTMLInputElement).value = '4250.00';
                                                    (document.getElementsByName('walletAge')[0] as HTMLSelectElement).value = '>2Y';
                                                    (document.getElementsByName('zeroBal')[0] as HTMLInputElement).value = '1';
                                                    (document.getElementsByName('employment')[0] as HTMLSelectElement).value = 'SME';
                                                } else {
                                                    (document.getElementsByName('monthlySalary')[0] as HTMLInputElement).value = '8500.00';
                                                    (document.getElementsByName('bankAccountAge')[0] as HTMLSelectElement).value = '>5Y';
                                                    (document.getElementsByName('employer')[0] as HTMLInputElement).value = 'Tullow Oil Ghana';
                                                    (document.getElementsByName('employment')[0] as HTMLSelectElement).value = 'SALARIED';
                                                }
                                                btn.innerHTML = `<span class="text-emerald-600">✅ Analysis Complete. Data Extracted.</span>`;
                                            }, 2000); // 2 second delay for realism
                                        }
                                    }}
                                />
                                <div id="analysis-status" className="text-sm text-slate-500 pointer-events-none">
                                    <span className="text-2xl block mb-2">📄</span>
                                    <span className="font-semibold text-slate-700">Drop {dataSource === 'MOMO' ? 'MoMo Statement (PDF)' : 'Bank Statement (PDF)'} here</span>
                                    <span className="block text-xs mt-1">or click to upload for Instant AI Analysis</span>
                                </div>
                            </div>

                            {dataSource === 'MOMO' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in-95 duration-200">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">Avg. Monthly Wallet Inflow</label>
                                        <input type="number" name="momoInflow" className="w-full bg-slate-50 border border-slate-200 rounded p-2.5 text-slate-900" placeholder="e.g. 2500" required />
                                        <p className="text-[10px] text-slate-400 mt-1">Mean of last 3 months incoming txns.</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">Wallet Age</label>
                                        <select name="walletAge" className="w-full bg-slate-50 border border-slate-200 rounded p-2.5 text-slate-900">
                                            <option value=">2Y">More than 2 Years</option>
                                            <option value="1Y-2Y">1 - 2 Years</option>
                                            <option value="<1Y">Less than 1 Year</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">Zero Balance Days (Last 30d)</label>
                                        <input type="number" name="zeroBal" className="w-full bg-slate-50 border border-slate-200 rounded p-2.5 text-slate-900" placeholder="e.g. 4" required />
                                        <p className="text-[10px] text-slate-400 mt-1">Fewer is better (Stability signal).</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in-95 duration-200">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">Avg. Monthly Salary</label>
                                        <input type="number" name="monthlySalary" className="w-full bg-slate-50 border border-slate-200 rounded p-2.5 text-slate-900" placeholder="e.g. 5000" required />
                                        <p className="text-[10px] text-slate-400 mt-1">Mean of last 3 months salary deposits.</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">Bank Account Age</label>
                                        <select name="bankAccountAge" className="w-full bg-slate-50 border border-slate-200 rounded p-2.5 text-slate-900">
                                            <option value=">5Y">More than 5 Years</option>
                                            <option value="2Y-5Y">2 - 5 Years</option>
                                            <option value="<2Y">Less than 2 Years</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">Employer / Company</label>
                                        <input name="employer" className="w-full bg-slate-50 border border-slate-200 rounded p-2.5 text-slate-900" placeholder="e.g. Coca Cola Ghana" />
                                        <p className="text-[10px] text-slate-400 mt-1">Name of current employer.</p>
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 pt-4 border-t border-slate-100">
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Employment Type</label>
                                <select name="employment" className="w-full bg-slate-50 border border-slate-200 rounded p-2.5 text-slate-900">
                                    {dataSource === 'MOMO' ? (
                                        <>
                                            <option value="GOVT">Govt Worker (CAGD)</option>
                                            <option value="GIG">Gig Economy (Uber/Bolt)</option>
                                            <option value="INFORMAL">Informal Trader</option>
                                            <option value="SME">SME Owner</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value="GOVT">Govt Worker (CAGD)</option>
                                            <option value="SALARIED">Corporate Salaried</option>
                                            <option value="SME">SME Owner</option>
                                        </>
                                    )}
                                </select>
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="w-full bg-[#0a2540] hover:bg-slate-800 text-white font-bold py-4 rounded-lg shadow-lg shadow-slate-900/20 transition-all flex justify-center items-center">
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Analyzing Risk Models...
                                </span>
                            ) : 'Run Prediction & Pricing'}
                        </button>
                    </form>
                </div>

                {/* Result Section (Stripe Style) */}
                <div className="lg:col-span-1">
                    {result ? (
                        <div className="sticky top-24 space-y-6">
                            {/* Score Card */}
                            <div className={`p-6 rounded-lg shadow-lg border border-slate-200 ${result.approved ? 'bg-white' : 'bg-white'}`}>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-sm font-bold text-slate-500 uppercase">Assessment Result</h3>
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${result.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                                        {result.approved ? 'Approved' : 'Rejected'}
                                    </span>
                                </div>

                                <div className="text-center py-6">
                                    <span className="text-5xl font-bold text-slate-900">{(result.risk.pd * 100).toFixed(1)}</span>
                                    <span className="text-sm text-slate-400 block mt-1">Probability of Default (%)</span>
                                </div>

                                {!result.approved && (
                                    <div className="bg-rose-50 p-3 rounded text-xs text-rose-700 font-medium mb-4">
                                        Reason: {result.reasonCodes?.join(', ') || 'High Risk'}
                                    </div>
                                )}

                                <div className="border-t border-slate-100 pt-4 space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Risk Grade</span>
                                        <span className="font-bold text-slate-800">{result.risk.grade || 'C'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Max Limit</span>
                                        <span className="font-bold text-slate-800">{result.approved ? (result.pricing.premium * 20).toFixed(0) : 0} {result.pricing.currency}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Insurance Card */}
                            {result.approved && (
                                <div className="bg-[#0a2540] p-6 rounded-lg shadow-lg border border-slate-800 text-white relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h3 className="text-xs font-bold text-emerald-400 uppercase mb-4 flex items-center">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
                                            Insurance Quote
                                        </h3>

                                        <div className="space-y-3 mb-6">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-400">Base Premium</span>
                                                <span>{result.pricing.breakdown?.technicalPremium.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-400">Inflation Shield</span>
                                                <span className="text-emerald-300">+{result.pricing.breakdown?.inflationAdjustment.toFixed(2)}</span>
                                            </div>
                                        </div>

                                        <div className="border-t border-white/10 pt-4 flex justify-between items-end">
                                            <span className="text-sm text-slate-400">Total Cost</span>
                                            <span className="text-2xl font-bold">{result.pricing.premium} <span className="text-sm font-normal text-slate-400">{result.pricing.currency}</span></span>
                                        </div>

                                        <button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold py-2 rounded transition-colors">
                                            Download Policy
                                        </button>
                                    </div>
                                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-64 bg-slate-50 border border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 text-center p-6">
                            <span className="text-4xl mb-4">📊</span>
                            <p className="text-sm">Analysis results will appear here after running the model.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
