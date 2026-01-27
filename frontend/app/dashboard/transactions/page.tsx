'use client';

export default function TransactionsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-slate-900">Transactions</h1>
                <div className="flex gap-2">
                    <button onClick={() => alert('Filter Modal: Coming Soon')} className="px-3 py-1.5 text-sm bg-white border border-slate-300 rounded shadow-sm text-slate-700 hover:bg-slate-50 transition-colors">Filter</button>
                    <button onClick={() => alert('Exporting to CSV...')} className="px-3 py-1.5 text-sm bg-white border border-slate-300 rounded shadow-sm text-slate-700 hover:bg-slate-50 transition-colors">Export</button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs font-semibold">
                        <tr>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3">Customer</th>
                            <th className="px-6 py-3 text-right">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                        <TxRow amount="GHS 5,000.00" status="succeeded" desc="Loan Disbursement" cust="James K." date="Oct 24, 10:23 AM" />
                        <TxRow amount="GHS 150.00" status="succeeded" desc="Repayment" cust="James K." date="Oct 24, 09:00 AM" />
                        <TxRow amount="KES 45,000.00" status="pending" desc="Loan Disbursement" cust="Sarah M." date="Oct 23, 4:15 PM" />
                        <TxRow amount="NGN 12,000.00" status="failed" desc="Repayment (Insufficient Funds)" cust="Emmanuel O." date="Oct 23, 2:30 PM" />
                        <TxRow amount="USD 50.00" status="succeeded" desc="Insurance Premium" cust="Zainab B." date="Oct 22, 11:45 AM" />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function TxRow({ amount, status, desc, cust, date }: any) {
    let badgeClass = 'bg-slate-100 text-slate-700';
    if (status === 'succeeded') badgeClass = 'bg-emerald-50 text-emerald-700';
    if (status === 'pending') badgeClass = 'bg-amber-50 text-amber-700';
    if (status === 'failed') badgeClass = 'bg-rose-50 text-rose-700';

    return (
        <tr className="hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4 font-bold text-slate-900">{amount}</td>
            <td className="px-6 py-4">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide border border-transparent ${badgeClass}`}>
                    {status}
                </span>
            </td>
            <td className="px-6 py-4">{desc}</td>
            <td className="px-6 py-4">{cust}</td>
            <td className="px-6 py-4 text-right text-slate-400 font-mono text-xs">{date}</td>
        </tr>
    );
}
