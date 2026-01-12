'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

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
                    ? 'bg-white/10 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
            >
                <span className="opacity-70 mr-3">{icon}</span>
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
            <aside className="w-64 bg-[#0a2540] border-r border-white/10 flex flex-col fixed h-full z-20">
                <div className="p-5 bg-[#0a2540] border-b border-white/10">
                    <div className="flex items-center mb-4">
                        <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold mr-3 shadow-lg shadow-blue-500/50">
                            K
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-white tracking-wide">KOK RISK</h1>
                            <p className="text-[10px] text-slate-400 uppercase">System v1.0</p>
                        </div>
                    </div>

                    {/* MARKET SWITCHER */}
                    <div className="relative group">
                        <button className="w-full bg-[#0d2f52] hover:bg-[#103a66] border border-blue-900/50 rounded-lg p-2 flex items-center justify-between transition-colors">
                            <div className="flex items-center">
                                <span className="text-lg mr-2">🇬🇭</span>
                                <div className="text-left">
                                    <p className="text-[10px] text-slate-400 uppercase font-bold">Active Market</p>
                                    <p className="text-xs font-bold text-white">Ghana (GHS)</p>
                                </div>
                            </div>
                            <span className="text-slate-500 text-xs">▼</span>
                        </button>

                        {/* Dropdown (Hidden by default, shown on hover/click in a real app) */}
                        <div className="absolute top-full left-0 w-full mt-1 bg-[#0d2f52] border border-blue-900/50 rounded-lg shadow-xl overflow-hidden hidden group-hover:block z-50">
                            {/* Disabled Markets */}
                            <div className="p-2 border-b border-white/5 opacity-50 cursor-not-allowed">
                                <div className="flex items-center">
                                    <span className="text-lg mr-2 text-grayscale">🇳🇬</span>
                                    <div>
                                        <p className="text-xs font-bold text-slate-300">Nigeria</p>
                                        <p className="text-[10px] text-slate-500">Coming Soon</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 opacity-50 cursor-not-allowed">
                                <div className="flex items-center">
                                    <span className="text-lg mr-2 text-grayscale">🇰🇪</span>
                                    <div>
                                        <p className="text-xs font-bold text-slate-300">Kenya</p>
                                        <p className="text-[10px] text-slate-500">Coming Soon</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 bg-blue-600/20 text-center border-t border-white/5">
                                <span className="text-[10px] text-blue-400 font-bold">+ Add Region</span>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-3 py-4 overflow-y-auto">
                    <SectionTitle>Overview</SectionTitle>
                    <NavItem href="/dashboard" icon="📊">Home</NavItem>
                    <NavItem href="/dashboard/reports" icon="📈">Analytics</NavItem>
                    <NavItem href="/dashboard/simulation" icon="🔬">Stress Test</NavItem>

                    <SectionTitle>Product</SectionTitle>
                    <NavItem href="/dashboard/assess" icon="⚡️">New Assessment</NavItem>
                    <NavItem href="/dashboard/insurance" icon="🛡️">Insurance</NavItem>
                    <NavItem href="/dashboard/collections" icon="📢">Collections</NavItem>
                    <NavItem href="/dashboard/clients" icon="👥">Customers</NavItem>
                    <NavItem href="/dashboard/transactions" icon="💳">Transactions</NavItem>

                    {/* ONLY SHOW FOR ADMINS */}
                    {user.role !== 'ANALYST' && (
                        <>
                            <SectionTitle>Developers</SectionTitle>
                            <NavItem href="/dashboard/api" icon="🔌">API Keys</NavItem>
                            <NavItem href="/dashboard/logs" icon="📜">Logs</NavItem>
                            <NavItem href="/dashboard/webhooks" icon="🎣">Webhooks</NavItem>

                            <SectionTitle>Settings</SectionTitle>
                            <NavItem href="/dashboard/settings" icon="⚙️">Configuration</NavItem>
                            <NavItem href="/dashboard/security" icon="🛡️">Security & Audit</NavItem>
                            <NavItem href="/dashboard/billing" icon="💹">Billing & Usage</NavItem>
                        </>
                    )}
                </nav>

                <div className="p-4 border-t border-white/10 bg-[#081e35]">
                    <button
                        onClick={() => { localStorage.clear(); router.push('/login'); }}
                        className="flex items-center text-xs text-slate-400 hover:text-white transition-colors w-full"
                    >
                        <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 mr-2"></div>
                        <div className="text-left flex-1 truncate">
                            <p className="font-medium text-white">{user.email}</p>
                            <p className="text-[10px]">{user.org?.name?.toUpperCase()}</p>
                        </div>
                        <span className="text-slate-500">↗</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 bg-[#f7f9fc] min-h-screen relative">
                {/* Top Navbar (Stripe Search style) */}
                <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
                    <div className="flex-1 max-w-lg">
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
                            <input
                                className="w-full bg-slate-100 border-none rounded-md py-2 pl-10 pr-4 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder-slate-500"
                                placeholder="Search borrowers, logs, or settings..."
                            />
                            <div className="absolute right-3 top-2.5 text-xs text-slate-400 border border-slate-300 rounded px-1.5 shadow-sm">/</div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 ml-4">
                        <button className="text-xs font-medium text-slate-600 hover:text-slate-900">Feedback</button>
                        <button className="text-xs font-medium text-slate-600 hover:text-slate-900">Help</button>
                        <div className="h-4 w-px bg-slate-300 mx-2"></div>
                        <button className="text-xs font-medium text-slate-600 hover:text-slate-900">Docs</button>
                    </div>
                </div>

                {/* Page Content Container */}
                <div className="max-w-7xl mx-auto px-8 py-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
