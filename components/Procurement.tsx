import React, { useState } from 'react';
import { MOCK_PO } from '../constants';
import { PurchaseOrder } from '../types';
import { formatCurrency } from '../utils';
import { ShoppingCart, Package, CheckCircle, Clock, Truck, X } from 'lucide-react';

const Procurement: React.FC = () => {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(MOCK_PO);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPO, setNewPO] = useState<Partial<PurchaseOrder>>({
    item: '', vendor: '', quantity: 1, totalCost: 0
  });

  const handleAddPO = (e: React.FormEvent) => {
    e.preventDefault();
    const poToAdd: PurchaseOrder = {
      id: `PO-NEW-${Date.now().toString().slice(-4)}`,
      item: newPO.item || 'Item Umum',
      vendor: newPO.vendor || 'Vendor Umum',
      quantity: newPO.quantity || 1,
      totalCost: newPO.totalCost || 0,
      status: 'Menunggu',
      requestDate: new Date().toISOString().split('T')[0]
    };
    setPurchaseOrders(prev => [poToAdd, ...prev]);
    setIsModalOpen(false);
    setNewPO({ item: '', vendor: '', quantity: 1, totalCost: 0 });
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold text-white">Pengadaan</h2>
          <p className="text-slate-400">Manajemen pembelian suku cadang dan aset</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition shadow-lg shadow-amber-900/20">
          + Purchase Order
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-500"><Package size={24} /></div>
                <span className="text-2xl font-bold text-white">124</span>
            </div>
            <p className="text-slate-400 text-sm">Item Stok Suku Cadang</p>
        </div>
        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-amber-500/20 rounded-lg text-amber-500"><Clock size={24} /></div>
                <span className="text-2xl font-bold text-white">{purchaseOrders.filter(p => p.status === 'Menunggu').length}</span>
            </div>
            <p className="text-slate-400 text-sm">PO Menunggu Persetujuan</p>
        </div>
        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-500"><Truck size={24} /></div>
                <span className="text-2xl font-bold text-white">3</span>
            </div>
            <p className="text-slate-400 text-sm">Pengiriman Dalam Perjalanan</p>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-medium text-white mb-6">Daftar Purchase Order</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="text-xs text-slate-500 uppercase bg-slate-900/50">
              <tr>
                <th className="px-6 py-3">ID PO</th>
                <th className="px-6 py-3">Item</th>
                <th className="px-6 py-3">Vendor</th>
                <th className="px-6 py-3">Total Biaya</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map((po) => (
                <tr key={po.id} className="border-b border-slate-700 hover:bg-slate-700/20">
                  <td className="px-6 py-4 font-mono text-amber-500">{po.id}</td>
                  <td className="px-6 py-4 font-medium text-white">
                    {po.item}
                    <span className="block text-xs text-slate-500">Qty: {po.quantity}</span>
                  </td>
                  <td className="px-6 py-4">{po.vendor}</td>
                  <td className="px-6 py-4 text-white">{formatCurrency(po.totalCost)}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 ${po.status === 'Disetujui' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {po.status === 'Disetujui' ? <CheckCircle size={14} /> : <Clock size={14} />}
                      {po.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{po.requestDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Purchase Order */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Buat Purchase Order Baru</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleAddPO} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Nama Barang / Suku Cadang</label>
                <input type="text" required className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none" 
                  value={newPO.item} onChange={e => setNewPO({...newPO, item: e.target.value})} placeholder="Misal: Ban Bridgestone" />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Nama Vendor</label>
                <input type="text" required className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none" 
                  value={newPO.vendor} onChange={e => setNewPO({...newPO, vendor: e.target.value})} placeholder="PT Vendor Jaya" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Jumlah (Qty)</label>
                  <input type="number" required min="1" className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none" 
                    value={newPO.quantity} onChange={e => setNewPO({...newPO, quantity: parseInt(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Estimasi Biaya (IDR)</label>
                  <input type="number" required className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none" 
                    value={newPO.totalCost} onChange={e => setNewPO({...newPO, totalCost: parseInt(e.target.value)})} />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700">Batal</button>
                <button type="submit" className="flex-1 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium shadow-lg shadow-amber-900/20">Ajukan PO</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Procurement;
