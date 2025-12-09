import React, { useState } from 'react';
import { MOCK_CUSTOMERS } from '../constants';
import { Customer } from '../types';
import { formatCurrency } from '../utils';
import { Users, Phone, Briefcase, ChevronRight, BarChart, X } from 'lucide-react';

const CRMSales: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
    name: '', company: '', status: 'Prospek', value: 0
  });

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const customerToAdd: Customer = {
      id: `C-NEW-${Date.now()}`,
      name: newCustomer.name || 'Unknown',
      company: newCustomer.company || 'Pribadi',
      status: newCustomer.status as any,
      value: newCustomer.value || 0,
      lastContact: new Date().toISOString().split('T')[0]
    };
    setCustomers(prev => [customerToAdd, ...prev]);
    setIsModalOpen(false);
    setNewCustomer({ name: '', company: '', status: 'Prospek', value: 0 });
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold text-white">CRM & Penjualan</h2>
          <p className="text-slate-400">Kelola prospek pelanggan dan kontrak</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition shadow-lg shadow-amber-900/20">
          + Pelanggan Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pipeline Summary */}
        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <BarChart size={18} className="text-amber-500" />
            Pipeline Penjualan
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
              <span className="text-slate-300">Prospek</span>
              <span className="font-bold text-white">{customers.filter(c => c.status === 'Prospek').length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
              <span className="text-slate-300">Negosiasi</span>
              <span className="font-bold text-amber-500">{customers.filter(c => c.status === 'Negosiasi').length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
              <span className="text-slate-300">Deal</span>
              <span className="font-bold text-emerald-500">{customers.filter(c => c.status === 'Deal' || c.status === 'Pelanggan').length}</span>
            </div>
          </div>
        </div>

        {/* Lead List */}
        <div className="md:col-span-2 bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-medium text-white mb-4">Daftar Pelanggan</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-300">
              <thead className="text-xs text-slate-500 uppercase bg-slate-900/50">
                <tr>
                  <th className="px-6 py-3">Nama Pelanggan</th>
                  <th className="px-6 py-3">Tipe</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Nilai Potensial</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b border-slate-700 hover:bg-slate-700/20">
                    <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                        <Users size={14} className="text-slate-400" />
                      </div>
                      {customer.name}
                    </td>
                    <td className="px-6 py-4">{customer.company}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium border
                        ${customer.status === 'Deal' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                          customer.status === 'Negosiasi' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                          'bg-blue-500/10 text-blue-500 border-blue-500/20'}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white">{formatCurrency(customer.value)}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-white">
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Pelanggan Baru */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Tambah Pelanggan Baru</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleAddCustomer} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Nama Lengkap</label>
                <input type="text" required className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none" 
                  value={newCustomer.name} onChange={e => setNewCustomer({...newCustomer, name: e.target.value})} placeholder="PT Maju Jaya / Bapak Budi" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Perusahaan / Tipe</label>
                  <input type="text" className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none" 
                    value={newCustomer.company} onChange={e => setNewCustomer({...newCustomer, company: e.target.value})} placeholder="Korporat" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Status</label>
                  <select className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                    value={newCustomer.status} onChange={e => setNewCustomer({...newCustomer, status: e.target.value as any})}>
                    <option value="Prospek">Prospek</option>
                    <option value="Negosiasi">Negosiasi</option>
                    <option value="Deal">Deal</option>
                    <option value="Pelanggan">Pelanggan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Nilai Potensial (IDR)</label>
                <input type="number" required className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none" 
                  value={newCustomer.value} onChange={e => setNewCustomer({...newCustomer, value: parseInt(e.target.value)})} />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700">Batal</button>
                <button type="submit" className="flex-1 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium shadow-lg shadow-amber-900/20">Simpan Pelanggan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMSales;
