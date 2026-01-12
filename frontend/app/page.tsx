'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">

      {/* 🔹 HERO SECTION */}
      <section className="bg-slate-900 text-white py-24 px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl translate-y-12 -translate-x-12"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-4">KOK Risk</h2>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            The Risk & Insurance Engine <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 font-extrabold">for African Lending</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            We help banks and fintechs make better credit decisions, reduce defaults, and protect their loan portfolios using AI, alternative data, and automated insurance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/dashboard">
              <button className="px-8 py-3 bg-emerald-500 text-slate-900 font-bold rounded-lg hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-900/50">
                Request Demo
              </button>
            </Link>
            <Link href="/dashboard/settings">
              <button className="px-8 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 border border-white/20 transition-colors">
                View Docs
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 🔹 TRUST / POSITIONING STRIP */}
      <section className="bg-slate-50 border-b border-slate-200 py-8 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Built for</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-slate-800 font-bold text-lg md:text-xl">
            <span>Banks</span> <span className="text-slate-300">•</span>
            <span>Fintechs</span> <span className="text-slate-300">•</span>
            <span>BNPL</span> <span className="text-slate-300">•</span>
            <span>Microfinance</span> <span className="text-slate-300">•</span>
            <span>Insurtech</span>
          </div>
          <p className="mt-4 text-sm text-slate-500">Designed for Africa’s currencies, regulations, and informal economy.</p>
        </div>
      </section>

      {/* 🔹 THE PROBLEM */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 border-l-4 border-rose-500 pl-4">The Problem: Credit in Africa is Broken.</h2>
          <p className="text-lg text-slate-600 mb-8">Banks and fintechs lose millions every year because:</p>

          <ul className="space-y-4 mb-8">
            <ProblemItem text="Risk models don’t understand informal income." />
            <ProblemItem text="Good borrowers are rejected, bad borrowers are approved." />
            <ProblemItem text="Inflation and currency devaluation silently destroy loan value." />
            <ProblemItem text="Insurance claims are slow, manual, and disputed." />
            <ProblemItem text="Regulators demand explainability and audit trails most systems can’t provide." />
          </ul>

          <div className="bg-rose-50 border border-rose-100 p-6 rounded-lg text-rose-800 font-medium text-center">
            "Africa doesn’t have a capital problem. It has a risk infrastructure problem."
          </div>
        </div>
      </section>

      {/* 🔹 THE SOLUTION */}
      <section className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">The Solution</h2>
            <h3 className="text-xl text-emerald-400 font-bold mb-6">One platform for risk, insurance, and compliance.</h3>
            <p className="text-slate-300 mb-6">KOK Risk is a cloud platform that:</p>
            <ul className="space-y-3">
              <SolutionItem text="Calculates true credit risk (PD, LGD, Expected Loss)" />
              <SolutionItem text="Uses alternative data (mobile money, airtime, gig income)" />
              <SolutionItem text="Prices loans across African currencies with inflation protection" />
              <SolutionItem text="Automatically triggers insurance payouts on default" />
              <SolutionItem text="Produces explainable, regulator-ready decisions" />
              <SolutionItem text="Provides APIs and widgets for easy integration" />
            </ul>
          </div>
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-2xl">
            <div className="flex items-center space-x-2 mb-6 border-b border-slate-700 pb-4">
              <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-xs text-slate-500 ml-2">risk-engine.exe</span>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="h-2 bg-slate-700 rounded w-3/4"></div>
                <div className="h-2 bg-slate-700 rounded w-1/2"></div>
              </div>
              <div className="p-4 bg-emerald-900/20 border border-emerald-500/30 rounded flex items-center justify-between">
                <span className="text-emerald-400 font-mono text-sm">Status: APPROVED</span>
                <span className="text-white font-bold">Score: 785</span>
              </div>
              <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded">
                <span className="text-blue-300 text-xs block mb-1">Recommended Action</span>
                <span className="text-white font-medium text-sm">Disburse GHS 5,000 @ 3.5% Interest</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 HOW IT WORKS */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
            <p className="text-slate-500">Simple for lenders. Powerful under the hood.</p>
          </div>
          <div className="grid md:grid-cols-5 gap-4 text-center">
            <WorkStep num="1" title="Integrate" desc="Lender connects API or Dashboard" />
            <div className="hidden md:flex items-center justify-center text-slate-300 text-2xl">→</div>
            <WorkStep num="2" title="Apply" desc="Borrower applies for loan" />
            <div className="hidden md:flex items-center justify-center text-slate-300 text-2xl">→</div>
            <WorkStep num="3" title="Analyze" desc="Engine returns decision in milliseconds" />
          </div>
          <div className="grid md:grid-cols-5 gap-4 text-center mt-8">
            <div className="col-span-2 md:col-start-2">
              <WorkStep num="4" title="Price" desc="Loan priced with risk & insurance included" />
            </div>
            <div className="col-span-2">
              <WorkStep num="5" title="Protect" desc="Auto-payout triggered if default happens" />
            </div>
          </div>
        </div>
      </section>


      {/* 🔹 PRODUCT MODULES */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Product Modules</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ModuleCard icon="🧠" title="The Brain" subtitle="Risk Engine" desc="AI credit scoring, shadow models, explainable decisions." />
            <ModuleCard icon="🔐" title="The Shield" subtitle="Security & Compliance" desc="Encrypted data, role-based access, immutable audit logs." />
            <ModuleCard icon="🗄" title="The Data Layer" subtitle=" Aggregation" desc="Mobile money, airtime, bank, and business data." />
            <ModuleCard icon="🔗" title="The Trust Layer" subtitle="Insurance" desc="Automated, parametric insurance and verifiable payout records." />
            <ModuleCard icon="⚙️" title="The Scale Layer" subtitle="Developer Tools" desc="APIs, sandbox, developer docs, embedded checkout." />
            <ModuleCard icon="🌍" title="Expansion" subtitle="Multi-Country" desc="Built for Ghana & Nigeria, expanding across Africa." />
          </div>
        </div>
      </section>

      {/* 🔹 WHY KOK RISK */}
      <section className="bg-slate-900 text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Why KOK Risk?</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            <CheckItem text="Built for African realities" />
            <CheckItem text="Designed for regulation trends" />
            <CheckItem text="Infrastructure, not just an app" />
            <CheckItem text="Turns risk into an asset" />
          </div>
        </div>
      </section>

      {/* 🔹 CALL TO ACTION */}
      <section className="py-24 px-6 bg-emerald-500 text-slate-900 text-center">
        <h2 className="text-4xl font-extrabold mb-6">Start making better credit decisions today.</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/dashboard">
            <button className="px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors shadow-xl">
              Request Demo
            </button>
          </Link>
          <a href="mailto:sales@kok-risk.com?subject=Enterprise%20Inquiry%20-%20KOK%20Risk">
            <button className="px-8 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition-colors">
              Contact Sales
            </button>
          </a>
        </div>
      </section>

      {/* 🔹 FOOTER */}
      <footer className="bg-slate-950 text-slate-500 py-12 px-6 text-center text-sm">
        <p className="text-white font-bold text-lg mb-2">KOK Risk</p>
        <p className="mb-8">Risk & Insurance Infrastructure for African Credit</p>
        <div className="mb-8 space-x-6">
          <span className="cursor-pointer hover:text-white">API Docs</span>
          <span className="cursor-pointer hover:text-white">Privacy</span>
          <span className="cursor-pointer hover:text-white">Terms</span>
        </div>
        <p>Built by Kingsford Oheneba Korang</p>
        <p>© 2026 KOK Risk. All rights reserved.</p>
      </footer>

    </div>
  );
}

// --- SUBCOMPONENTS ---

function ProblemItem({ text }: { text: string }) {
  return (
    <li className="flex items-start">
      <span className="text-rose-500 mr-3 font-bold">✖</span>
      <span>{text}</span>
    </li>
  )
}

function SolutionItem({ text }: { text: string }) {
  return (
    <li className="flex items-start">
      <span className="text-emerald-400 mr-3 font-bold">✓</span>
      <span>{text}</span>
    </li>
  )
}

function WorkStep({ num, title, desc }: any) {
  return (
    <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
      <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">{num}</div>
      <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
  )
}

function ModuleCard({ icon, title, subtitle, desc }: any) {
  return (
    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-bold text-slate-900">{title}</h3>
      <p className="text-xs font-bold text-emerald-600 uppercase mb-2">{subtitle}</p>
      <p className="text-sm text-slate-600">{desc}</p>
    </div>
  )
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center bg-slate-800 p-4 rounded-lg border border-slate-700">
      <span className="text-emerald-400 text-xl mr-4">✔</span>
      <span className="font-bold">{text}</span>
    </div>
  )
}
