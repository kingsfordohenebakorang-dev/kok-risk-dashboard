'use client';

export default function MarketplacePage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Integration Marketplace</h1>
                    <p className="text-slate-500 text-sm">Discover and install connectors for Identity, Credit Data, and Payments.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <ConnectorCard title="First/Atlas" cat="Identity" regions="All Africa" icon="🆔" installed={false} />
                <ConnectorCard title="Smile ID" cat="Identity/KYC" regions="Kenya, NG" icon="🤳" installed={false} />
                <ConnectorCard title="Mono" cat="Open Banking" regions="Nigeria" icon="🏦" installed={false} />
                <ConnectorCard title="Okra" cat="Open Banking" regions="Nigeria" icon="🍃" installed={false} />
                <ConnectorCard title="Metropol" cat="Credit Bureau" regions="Kenya" icon="🇰🇪" installed={false} />
                <ConnectorCard title="TransUnion" cat="Credit Bureau" regions="Global" icon="🌐" installed={false} />
                <ConnectorCard title="Paystack" cat="Payments" regions="All Africa" icon="💳" installed={false} />
                <ConnectorCard title="Zeepay" cat="Remittance" regions="Ghana, UK" icon="💸" installed={false} />
            </div>
        </div>
    );
}

function ConnectorCard({ title, cat, regions, icon, installed }: any) {
    return (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center text-3xl">
                    {icon}
                </div>
                <button
                    onClick={() => alert(`Installing ${title} Connector... \n(Access Code required)`)}
                    className="bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded hover:bg-slate-700 transition-colors"
                >
                    Install +
                </button>
            </div>
            <h3 className="font-bold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500 mb-2">{cat}</p>
            <div className="flex items-center text-[10px] text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded w-fit">
                🌍 {regions}
            </div>
        </div>
    )
}
