import React, { useState } from 'react';
import { MAINTENANCE_ALERTS } from '../constants';
import { MaintenanceAlert } from '../types';
import { Wrench, AlertTriangle, CheckCircle, CalendarDays, X } from 'lucide-react';

const Maintenance: React.FC = () => {
  const [alerts, setAlerts] = useState<MaintenanceAlert[]>(MAINTENANCE_ALERTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWO, setNewWO] = useState<Partial<MaintenanceAlert>>({
    vehicleName: '', description: '', severity: 'Medium', dueDate: ''
  });

  const handleAddWO = (e: React.FormEvent) => {
    e.preventDefault();
    const woToAdd: MaintenanceAlert = {
      id: `MA-NEW-${Date.now()}`,
      vehicleId: 'V-UNKNOWN',
      vehicleName: newWO.vehicleName || 'Kendaraan Umum',
      severity: newWO.severity as any,
      description: newWO.description || 'Perawatan Rutin',
      dueDate: newWO.dueDate || new Date().toISOString().split('T')[0]
    };
    setAlerts(prev => [woToAdd, ...prev]);
    setIsModalOpen(false);
    setNewWO({ vehicleName: '', description: '', severity: 'Medium', dueDate: '' });
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold text-white">Perawatan Armada</h2>
          <p className="text-slate-400">Jadwal servis dan work order</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition shadow-lg shadow-amber-900/20">
          + Buat Work Order
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts Section */}
        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={20} />
            Perhatian Diperlukan
          </h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-4 bg-slate-900/80 border-l-4 ${alert.severity === 'High' ? 'border-red-500' : 'border-yellow-500'} rounded-r-lg flex justify-between items-center`}>
                <div>
                  <h4 className="text-white font-bold">{alert.vehicleName}</h4>
                  <p className="text-slate-300 text-sm mt-1">{alert.description}</p>
                  <p className="text-slate-500 text-xs mt-2 flex items-center gap-1">
                    <CalendarDays size={12} /> Jatuh Tempo: {alert.dueDate}
                  </p>
                </div>
                <button className="px-3 py-1.5 bg-slate-800 text-slate-200 text-xs rounded hover:bg-slate-700 border border-slate-600 transition">
                  Detail
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule/Stats Section */}
        <div className="space-y-6">
           <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-medium text-white mb-4">Status Kesehatan Armada</h3>
              <div className="flex items-center justify-center gap-8 py-4">
                 <div className="text-center">
                    <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-emerald-500 bg-emerald-500/10 mb-2">
                       <span className="text-2xl font-bold text-white">92%</span>
                    </div>
                    <span className="text-sm text-slate-400">Kesehatan Prima</span>
                 </div>
                 <div className="space-y-3 w-full max-w-[200px]">
                    <div className="flex justify-between text-xs text-slate-300">
                       <span>Siap Pakai</span>
                       <span>28 Unit</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                       <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>

                    <div className="flex justify-between text-xs text-slate-300">
                       <span>Dalam Perbaikan</span>
                       <span>3 Unit</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                       <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-medium text-white mb-2">Riwayat Servis Terakhir</h3>
              <div className="space-y-3">
                 <div className="flex items-center gap-3 py-2 border-b border-slate-700/50">
                    <CheckCircle size={16} className="text-emerald-500" />
                    <div>
                       <p className="text-white text-sm">Mercedes S-Class - Ganti Oli</p>
                       <p className="text-xs text-slate-500">Selesai 10 Mei 2024</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 py-2 border-b border-slate-700/50">
                    <CheckCircle size={16} className="text-emerald-500" />
                    <div>
                       <p className="text-white text-sm">Lexus LM 350 - Spooring</p>
                       <p className="text-xs text-slate-500">Selesai 08 Mei 2024</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Modal Work Order */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Buat Work Order (WO) Baru</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleAddWO} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Nama Kendaraan</label>
                <input type="text" required className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none" 
                  value={newWO.vehicleName} onChange={e => setNewWO({...newWO, vehicleName: e.target.value})} placeholder="Misal: Toyota Alphard B 1234 ABC" />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Deskripsi Masalah</label>
                <textarea required className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none h-24" 
                  value={newWO.description} onChange={e => setNewWO({...newWO, description: e.target.value})} placeholder="Jelaskan masalah atau kebutuhan servis..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Tingkat Urgensi</label>
                  <select className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                    value={newWO.severity} onChange={e => setNewWO({...newWO, severity: e.target.value as any})}>
                    <option value="Low">Rendah (Low)</option>
                    <option value="Medium">Sedang (Medium)</option>
                    <option value="High">Tinggi (High)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Jatuh Tempo</label>
                  <input type="date" required className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none" 
                    value={newWO.dueDate} onChange={e => setNewWO({...newWO, dueDate: e.target.value})} />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700">Batal</button>
                <button type="submit" className="flex-1 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium shadow-lg shadow-amber-900/20">Buat Jadwal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maintenance;
