import Link from 'next/link';

export default function ClientsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">Client Management</h1>
                <Link href="/dashboard/clients/add" className="bg-[#0a2540] hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    + Add Client
                </Link>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-slate-800/50 text-xs uppercase font-semibold text-slate-500">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">ID</th>
                            <th className="p-4">Risk Profile</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        <tr className="hover:bg-slate-800/30 transition-colors">
                            <td className="p-4 text-white font-medium">James K.</td>
                            <td className="p-4 font-mono">USR-2024-001</td>
                            <td className="p-4"><span className="bg-emerald-900/30 text-emerald-400 text-xs px-2 py-1 rounded border border-emerald-900/50">Low Risk</span></td>
                            <td className="p-4">Active</td>
                            <td className="p-4">
                                <Link href="/dashboard/clients/USR-2024-001" className="text-blue-400 hover:text-blue-300 font-medium hover:underline">
                                    View
                                </Link>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-800/30 transition-colors">
                            <td className="p-4 text-white font-medium">Sarah M.</td>
                            <td className="p-4 font-mono">USR-2024-005</td>
                            <td className="p-4"><span className="bg-amber-900/30 text-amber-400 text-xs px-2 py-1 rounded border border-amber-900/50">Medium</span></td>
                            <td className="p-4">Pending</td>
                            <td className="p-4">
                                <Link href="/dashboard/clients/USR-2024-005" className="text-blue-400 hover:text-blue-300 font-medium hover:underline">
                                    View
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="p-4 text-center text-xs text-slate-500 border-t border-slate-800">
                    Showing 2 of 154 clients
                </div>
            </div>
        </div>
    );
}
