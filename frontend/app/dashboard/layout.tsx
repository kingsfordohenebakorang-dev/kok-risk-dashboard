'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    BarChart3,
    Activity,
    FileText,
    ShieldCheck,
    Megaphone,
    Users,
    CreditCard,
    Key,
    ScrollText,
    Webhook,
    Settings,
    Lock,
    Receipt
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            router.push('/login');
        } else {
            setUser(JSON.parse(userStr));
        }
    }, [router]);

    if (!user) return null;

    const NavItem = ({ href, children, icon }: any) => {
        const isActive = pathname === href;
        return (
            <Link
                href={href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 transition-colors ${isActive
                    ? 'bg-white/10 text-emerald-400'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
            >
                <span className={`mr-3 ${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'}`}>{icon}</span>
                {children}
            </Link>
        );
    }

    const SectionTitle = ({ children }: any) => (
        <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mt-6 mb-2">
            {children}
        </h3>
    );

    return (
        <div className="flex min-h-screen font-sans bg-[#0a2540] text-slate-200">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0a2540] border-r border-white/10 flex flex-col fixed h-full z-20 shadow-2xl">
                <div className="p-5 bg-[#0a2540] border-b border-white/10">
                    <div className="flex items-center mb-6">
                        <div className="h-8 w-8 bg-emerald-500 rounded-lg flex items-center justify-center text-[#0a2540] font-bold mr-3 shadow-lg shadow-emerald-500/20">
                            K
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-white tracking-wide">KOK RISK</h1>
                            <p className="text-[10px] text-emerald-500 font-mono">v2.4.0-ENTERPRISE</p>
                        </div>
                    </div>

                    {/* MARKET SWITCHER */}
                    <div className="relative group">
                        <button className="w-full bg-[#0d2f52] hover:bg-[#103a66] border border-blue-900/30 rounded-lg p-2 flex items-center justify-between transition-colors">
                            <div className="flex items-center">
                                <span className="text-lg mr-2">🇬🇭</span>
                                <div className="text-left">
                                    <p className="text-[10px] text-slate-400 uppercase font-bold">Active Market</p>
                                    <p className="text-xs font-bold text-white">Ghana (GHS)</p>
                                </div>
                            </div>
                            <span className="text-slate-500 text-xs">▼</span>
                        </button>
                        {/* Dropdown */}
                        <div className="absolute top-full left-0 w-full mt-1 bg-[#0d2f52] border border-blue-900/50 rounded-lg shadow-xl overflow-hidden hidden group-hover:block z-50">
                            <div className="p-2 border-b border-white/5 opacity-50 cursor-not-allowed">
                                <div className="flex items-center">
                                    <span className="text-lg mr-2 grayscale">🇳🇬</span>
                                    <div>
                                        <p className="text-xs font-bold text-slate-300">Nigeria</p>
                                        <p className="text-[10px] text-slate-500">Coming Soon</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 opacity-50 cursor-not-allowed">
                                <div className="flex items-center">
                                    <span className="text-lg mr-2 grayscale">🇰🇪</span>
                                    <div>
                                        <p className="text-xs font-bold text-slate-300">Kenya</p>
                                        <p className="text-[10px] text-slate-500">Coming Soon</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-3 py-4 overflow-y-auto custom-scrollbar">
                    <SectionTitle>Overview</SectionTitle>
                    <NavItem href="/dashboard" icon={<LayoutDashboard size={18} />}>Home</NavItem>
                    <NavItem href="/dashboard/reports" icon={<BarChart3 size={18} />}>Analytics</NavItem>
                    <NavItem href="/dashboard/simulation" icon={<Activity size={18} />}>Stress Test</NavItem>

                    <SectionTitle>Product</SectionTitle>
                    <NavItem href="/dashboard/assess" icon={<FileText size={18} />}>New Assessment</NavItem>
                    <NavItem href="/dashboard/insurance" icon={<ShieldCheck size={18} />}>Insurance</NavItem>
                    <NavItem href="/dashboard/collections" icon={<Megaphone size={18} />}>Collections</NavItem>
                    <NavItem href="/dashboard/clients" icon={<Users size={18} />}>Customers</NavItem>
                    <NavItem href="/dashboard/transactions" icon={<CreditCard size={18} />}>Transactions</NavItem>

                    {/* ONLY SHOW FOR ADMINS */}
                    {user.role !== 'ANALYST' && (
                        <>
                            <SectionTitle>Developers</SectionTitle>
                            <NavItem href="/dashboard/api" icon={<Key size={18} />}>API Keys</NavItem>
                            <NavItem href="/dashboard/logs" icon={<ScrollText size={18} />}>Logs</NavItem>
                            <NavItem href="/dashboard/webhooks" icon={<Webhook size={18} />}>Webhooks</NavItem>

                            <SectionTitle>Settings</SectionTitle>
                            <NavItem href="/dashboard/settings" icon={<Settings size={18} />}>Configuration</NavItem>
                            <NavItem href="/dashboard/security" icon={<Lock size={18} />}>Security & Audit</NavItem>
                            <NavItem href="/dashboard/billing" icon={<Receipt size={18} />}>Billing & Usage</NavItem>
                        </>
                    )}
                </nav>

                <div className="p-4 border-t border-white/10 bg-[#081e35]">
                    <button
                        onClick={() => { localStorage.clear(); router.push('/login'); }}
                        className="flex items-center text-xs text-slate-400 hover:text-white transition-colors w-full group"
                    >
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 mr-2 flex items-center justify-center font-bold text-[#0a2540]">
                            {user.name.charAt(0)}
                        </div>
                        <div className="text-left flex-1 truncate">
                            <p className="font-medium text-white group-hover:text-emerald-400 transition-colors">{user.name}</p>
                            <p className="text-[10px] opacity-70">{user.role}</p>
                        </div>
                        <span className="text-slate-500 group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 bg-slate-50 text-slate-900 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
