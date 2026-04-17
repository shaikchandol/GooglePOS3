import { useState } from 'react';
import { 
  Compass, 
  Terminal, 
  Layers, 
  Database, 
  Layout, 
  FileCode, 
  ShieldCheck, 
  Box,
  ChevronRight,
  Download,
  FileText,
  Boxes
} from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Architecture Map');

  const navItems = [
    { name: 'Architecture Map', icon: Compass },
    { name: 'Module Contracts', icon: Layers },
    { name: 'Data Schemas', icon: Database },
    { name: 'Solution Structure', icon: Layout },
    { name: 'Visio Manifests', icon: FileCode },
    { name: 'SDLC Prompt Library', icon: Terminal },
  ];

  return (
    <div className="flex h-screen w-full font-sans bg-[var(--bg-primary)] overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-60 bg-[var(--bg-sidebar)] flex flex-col p-6 border-r border-[var(--border-subtle)]">
        <div className="flex items-center gap-2 mb-10 text-white">
          <Boxes className="w-6 h-6 text-[var(--accent-blue)]" />
          <span className="font-extrabold text-lg tracking-tight">POS.MODERN</span>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <div
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`nav-item flex items-center gap-3 ${activeTab === item.name ? 'nav-item-active' : ''}`}
            >
              <item.icon className="w-4 h-4 opacity-70" />
              {item.name}
            </div>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/10 pt-6">
          <div className="card-label !text-slate-400">Active Tenant</div>
          <div className="flex items-center gap-2 text-[0.85rem] text-slate-100">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Multi-Tenant Admin (Root)
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 grid grid-rows-[60px_1fr_180px]">
        {/* Header */}
        <header className="bg-white border-b border-[var(--border-subtle)] flex items-center justify-between px-8">
          <div className="text-[1.1rem] font-bold text-[var(--text-main)]">Retail POS Modular Monolith Blueprint</div>
          <div className="flex items-center gap-3">
            <button className="btn flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" />
              Export Word
            </button>
            <button className="btn flex items-center gap-2">
              <Layout className="w-3.5 h-3.5" />
              Export PPT
            </button>
            <button className="btn btn-primary flex items-center gap-2 shadow-sm shadow-blue-500/20">
              <Box className="w-3.5 h-3.5" />
              Scaffold .NET Solution
            </button>
          </div>
        </header>

        {/* Viewport Content */}
        <div className="grid grid-cols-[2fr_1fr] gap-6 p-6 overflow-hidden">
          {/* Architecture Mapping (Large Card) */}
          <div className="card flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="card-label">System Landscape (Cloud Agnostic)</div>
              <span className="text-[0.65rem] font-mono text-[var(--accent-blue)] flex items-center gap-1">
                v1.0.0-draft
              </span>
            </div>
            
            <div className="relative flex-1 bg-slate-50 border border-dashed border-slate-300 rounded p-5 grid grid-cols-3 grid-rows-2 gap-4 place-items-center">
              {[
                { name: 'Inventory.Core', desc: 'Stock Mgmt', color: 'border-t-red-500' },
                { name: 'Sales.Core', desc: 'Checkout', color: 'border-t-blue-500' },
                { name: 'Loyalty.Core', desc: 'Rewards', color: 'border-t-emerald-500' },
                { name: 'Tenancy.Core', desc: 'Isolation', color: 'border-t-amber-500' },
                { name: 'Auth.Core', desc: 'Identity', color: 'border-t-violet-500' },
                { name: 'Shared.Kernel', desc: 'Abstractions', color: 'bg-slate-100 border-dashed border-slate-400' },
              ].map((mod) => (
                <motion.div 
                  whileHover={{ y: -2 }}
                  key={mod.name} 
                  className={`module-box w-full h-full flex flex-col justify-center border-t-4 ${mod.color}`}
                >
                  <div className="text-[0.8rem] font-bold leading-tight">{mod.name}</div>
                  <div className="text-[0.65rem] opacity-60 font-normal">{mod.desc}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-8 border-t border-[var(--border-subtle)] pt-4">
              <div>
                <div className="card-label">Primary Stack</div>
                <div className="text-[0.75rem] text-[var(--text-muted)] space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full" />
                    MediatR (In-Process Messaging)
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full" />
                    FluentValidation (Guard Rails)
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full" />
                    EF Core + PostgreSQL (Cloud-Agnostic)
                  </div>
                </div>
              </div>
              <div>
                <div className="card-label">Messaging Strategy</div>
                <div className="text-[0.75rem] text-[var(--text-muted)] space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                    Internal: MediatR Events
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                    External: Outbox Pattern
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                    Bridge: Modular Bus Interface
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Explorer (Small Card) */}
          <div className="card flex flex-col overflow-hidden">
            <div className="card-label">.NET 9 Solution Layout</div>
            <div className="flex-1 bg-white border border-slate-100 rounded p-4 font-mono text-[0.75rem] leading-relaxed text-slate-700 overflow-y-auto">
              <div className="flex items-center gap-2 font-bold text-slate-900 border-b border-slate-100 pb-2 mb-2">
                <Boxes className="w-3.5 h-3.5 text-blue-500" />
                RetailPOS.sln
              </div>
              <div className="pl-2 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold">
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                  RetailPOS.WebApi
                </div>
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <ChevronRight className="w-3 h-3 rotate-90 text-slate-400" />
                  Modules/
                </div>
                <div className="pl-4 space-y-1.5 border-l border-slate-200 ml-1.5">
                  <div className="flex items-center gap-2 font-semibold">
                    <ChevronRight className="w-3 h-3 rotate-90 text-slate-400" />
                    Inventory/
                  </div>
                  <div className="pl-4 text-slate-500 opacity-80">
                    RetailPOS.Inventory.Api<br/>
                    RetailPOS.Inventory.Application<br/>
                    RetailPOS.Inventory.Domain<br/>
                    RetailPOS.Inventory.Infrastructure
                  </div>
                  <div className="flex items-center gap-2 font-semibold">
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                    Sales/
                  </div>
                  <div className="flex items-center gap-2 font-semibold">
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                    Catalog/
                  </div>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                  Shared.Kernel/
                </div>
              </div>
            </div>
            
            <button className="mt-4 btn w-full flex items-center justify-center gap-2 !border-none !bg-slate-50 text-[var(--accent-blue)] font-bold">
              <Download className="w-3.5 h-3.5" />
              Download Full YAML Specs
            </button>
          </div>
        </div>

        {/* Console / SDLC Bar */}
        <div className="mx-6 mb-6 bg-slate-950 text-white rounded-lg p-5 font-mono flex flex-col gap-2 relative overflow-hidden group shadow-xl">
          <div className="absolute top-0 right-0 p-3 opacity-20">
            <Terminal className="w-20 h-20 -mr-6 -mt-6" />
          </div>
          
          <div className="flex items-center gap-3 text-emerald-400 text-[0.75rem]">
            <span className="opacity-50 font-bold">$</span>
            architecture-agent --generate-prompts --project="retail-pos-modulith"
          </div>
          
          <div className="text-[0.7rem] text-white/50 mt-2 mb-1 pl-4 border-l border-emerald-500/30">
            Recommended SDLC Commands for Module Implementation:
          </div>
          
          <div className="flex flex-wrap gap-2 pl-4">
            {[
              'PROMPT_1: Generate Product Domain Logic',
              'PROMPT_2: Scaffold Inventory AdjustHandlers',
              'PROMPT_3: Generate Multi-Tenant EF Mappings',
              'PROMPT_4: Seed Sample Tenant Metadata'
            ].map((p, idx) => (
              <div key={idx} className="bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded text-[0.65rem] text-emerald-300 hover:bg-emerald-500/20 cursor-pointer transition-colors max-w-fit">
                {p}
              </div>
            ))}
          </div>

          <div className="mt-3 text-white text-[0.7rem] font-bold flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Visio Shape Manifest Exported: 42 connections, 12 layers synchronized.
          </div>
        </div>
      </main>
    </div>
  );
}
