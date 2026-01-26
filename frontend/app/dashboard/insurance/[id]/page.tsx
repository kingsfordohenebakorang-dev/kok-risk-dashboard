'use client';

import Link from 'next/link';

export default function PolicyCertificatePage({ params }: { params: { id: string } }) {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
                <Link href="/dashboard/insurance" className="text-slate-400 hover:text-slate-600 mr-4 transition-colors">
                    ← Back to Monitor
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-slate-900">Insurance Certificate</h1>
                    <p className="text-slate-500 text-sm font-mono uppercase">POLICY REF: {params.id}</p>
                </div>
                <button className="px-4 py-2 bg-[#0a2540] text-white rounded-lg text-sm font-bold shadow hover:bg-slate-800 transition-colors">
                    Download PDF
                </button>
            </div>

            <div className="bg-white border text-center border-slate-200 rounded-xl p-12 shadow-lg relative overflow-hidden">
                {/* Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                    <span className="text-9xl font-bold text-slate-900">AC</span>
                </div>

                <div className="border-4 border-double border-slate-200 p-8 relative z-10">
                    <div className="flex justify-center mb-8">
                        <div className="h-16 w-16 bg-[#0a2540] rounded-full flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">K</span>
                        </div>
                    </div>

                    <h2 className="text-3xl font-serif text-slate-900 mb-2">Certificate of Insurance</h2>
                    <p className="text-slate-500 mb-8">Parametric Risk Transfer Protocol</p>

                    <div className="grid grid-cols-2 gap-8 text-left max-w-2xl mx-auto mb-12">
                        <div>
                            <p className="text-xs uppercase text-slate-400 font-bold mb-1">Policy Holder</p>
                            <p className="font-bold text-slate-900 text-lg">James Kwame Mensah</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase text-slate-400 font-bold mb-1">Coverage Amount</p>
                            <p className="font-bold text-slate-900 text-lg">GHS 5,000.00</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase text-slate-400 font-bold mb-1">Underwriter</p>
                            <p className="font-bold text-slate-900">KOK Reinsurance Ltd.</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase text-slate-400 font-bold mb-1">Effective Date</p>
                            <p className="font-bold text-slate-900">Oct 24, 2024</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-left max-w-2xl mx-auto">
                        <h3 className="text-sm font-bold text-slate-700 uppercase mb-2">Trigger Conditions (Parametric)</h3>
                        <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                            <li><strong>Default Event:</strong> 90 Days Past Due (DPD) on linked loan facility.</li>
                            <li><strong>FX Event:</strong> Currency depreciation exceeding 15% within 30 days.</li>
                        </ul>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-end">
                        <div className="text-left">
                            <p className="font-serif italic text-2xl text-slate-800">Kingsford Oheneba</p>
                            <div className="h-px w-48 bg-slate-300 mt-1"></div>
                            <p className="text-xs text-slate-400 mt-2 uppercase">Authorized Signature</p>
                        </div>
                        <div className="text-right">
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${params.id}`} alt="QR Verification" className="inline-block" />
                            <p className="text-[10px] text-slate-400 mt-2">Scan to Verify</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
