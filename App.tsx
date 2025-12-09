import React, { useState } from 'react';
import { NAV_ITEMS } from './constants';
import Dashboard from './components/Dashboard';
import FleetManagement from './components/FleetManagement';
import AiAdvisor from './components/AiAdvisor';
import CRMSales from './components/CRMSales';
import Accounting from './components/Accounting';
import Procurement from './components/Procurement';
import Maintenance from './components/Maintenance';
import { Bell, Search, Menu } from 'lucide-react';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'fleet':
        return <FleetManagement />;
      case 'sales':
        return <CRMSales />;
      case 'accounting':
        return <Accounting />;
      case 'procurement':
        return <Procurement />;
      case 'maintenance':
        return <Maintenance />;
      case 'ai':
        return <AiAdvisor />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
            <h2 className="text-2xl font-serif text-slate-300 mb-2">Modul Dalam Pengembangan</h2>
            <p>Modul {NAV_ITEMS.find(n => n.id === activeModule)?.label} akan tersedia segera.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col z-20`}
      >
        <div className="h-16 flex items-center justify-center border-b border-slate-800 relative">
          {isSidebarOpen ? (
            <h1 className="text-2xl font-serif font-bold tracking-widest text-white">
              UANG<span className="text-amber-500">.</span>
            </h1>
          ) : (
            <span className="text-2xl font-serif font-bold text-amber-500">U</span>
          )}
        </div>

        <nav className="flex-1 py-6 space-y-2 px-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center ${isSidebarOpen ? 'justify-start px-4' : 'justify-center px-2'} py-3 rounded-lg transition-all duration-200 group relative
                  ${isActive 
                    ? 'bg-amber-600/10 text-amber-500 border border-amber-600/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
              >
                <Icon size={20} className={isActive ? 'text-amber-500' : 'text-slate-400 group-hover:text-white'} />
                {isSidebarOpen && (
                  <span className="ml-3 font-medium text-sm">{item.label}</span>
                )}
                {!isSidebarOpen && (
                  <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none transition-opacity">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <img src="https://picsum.photos/40/40" alt="Admin" className="w-10 h-10 rounded-full border border-slate-600" />
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate">Prof Maxvel</p>
                <p className="text-xs text-slate-500 truncate">Admin Sistem</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-medium text-white">
              {NAV_ITEMS.find(n => n.id === activeModule)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Pencarian Global..." 
                className="bg-slate-950 border border-slate-700 rounded-full pl-10 pr-4 py-1.5 text-sm text-slate-300 focus:border-amber-500 focus:outline-none w-64 transition-all"
              />
            </div>
            <button className="relative p-2 hover:bg-slate-800 rounded-full text-slate-400 transition">
              <Bell size={20} />
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6 bg-gradient-to-br from-slate-950 to-slate-900">
          {renderModule()}
        </main>
      </div>
    </div>
  );
};

export default App;