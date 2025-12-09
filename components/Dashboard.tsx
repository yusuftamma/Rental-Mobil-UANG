import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { FINANCIAL_DATA, MAINTENANCE_ALERTS } from '../constants';
import { ArrowUpRight, AlertTriangle, Activity, DollarSign } from 'lucide-react';
import { formatCurrency } from '../utils';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI Cards */}
        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Pendapatan</p>
              <h3 className="text-2xl font-bold text-white mt-2">{formatCurrency(3150000000)}</h3>
            </div>
            <div className="p-2 bg-amber-500/20 rounded-lg text-amber-500">
              <DollarSign size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-emerald-400 text-sm">
            <ArrowUpRight size={16} className="mr-1" />
            <span>+12.5% vs bulan lalu</span>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Utilitas Armada</p>
              <h3 className="text-3xl font-bold text-white mt-2">82.4%</h3>
            </div>
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-500">
              <Activity size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-emerald-400 text-sm">
            <ArrowUpRight size={16} className="mr-1" />
            <span>+5.2% vs bulan lalu</span>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Sewa Aktif</p>
              <h3 className="text-3xl font-bold text-white mt-2">42</h3>
            </div>
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-500">
              <Activity size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-slate-400 text-sm">
            <span>24 Menunggu persetujuan</span>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Perawatan</p>
              <h3 className="text-3xl font-bold text-white mt-2">3</h3>
            </div>
            <div className="p-2 bg-red-500/20 rounded-lg text-red-500">
              <AlertTriangle size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-red-400 text-sm">
            <span>2 Peringatan Kritis</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-serif text-white mb-6">Performa Pendapatan</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={FINANCIAL_DATA}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" tickFormatter={(value) => `${value / 1000000000}M`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#fff' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Area type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Maintenance Feed */}
        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-serif text-white mb-6">Peringatan Perawatan</h3>
          <div className="space-y-4">
            {MAINTENANCE_ALERTS.map((alert) => (
              <div key={alert.id} className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg flex gap-3">
                <div className={`mt-1 h-2 w-2 rounded-full ${alert.severity === 'High' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                <div>
                  <h4 className="text-white font-medium">{alert.vehicleName}</h4>
                  <p className="text-slate-400 text-sm mt-1">{alert.description}</p>
                  <p className="text-slate-500 text-xs mt-2">Jatuh Tempo: {alert.dueDate}</p>
                </div>
              </div>
            ))}
            <button className="w-full py-2 text-sm text-slate-300 hover:text-amber-500 transition-colors border-t border-slate-700 mt-2">
              Lihat Semua Work Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
