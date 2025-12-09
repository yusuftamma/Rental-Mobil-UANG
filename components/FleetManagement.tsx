import React, { useState, useRef } from 'react';
import { MOCK_VEHICLES } from '../constants';
import { VehicleStatus, Vehicle } from '../types';
import { MapPin, Gauge, Calendar, MoreVertical, Fuel, Upload, Download, X } from 'lucide-react';
import { formatCurrency, parseVehicleCSV } from '../utils';

const FleetManagement: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [newVehicle, setNewVehicle] = useState<Partial<Vehicle>>({
    make: '', model: '', year: 2024, licensePlate: '', category: 'Sedan', dailyRate: 0
  });

  const getStatusColor = (status: VehicleStatus) => {
    switch (status) {
      case VehicleStatus.AVAILABLE: return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case VehicleStatus.RENTED: return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case VehicleStatus.MAINTENANCE: return 'bg-red-500/10 text-red-500 border-red-500/20';
      case VehicleStatus.RESERVED: return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default: return 'bg-slate-500/10 text-slate-500';
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        const newVehicles = parseVehicleCSV(text);
        if (newVehicles.length > 0) {
          setVehicles(prev => [...newVehicles, ...prev]); 
          alert(`Berhasil mengimpor ${newVehicles.length} kendaraan baru!`);
        } else {
          alert('Format CSV tidak valid atau kosong.');
        }
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerFileUpload = () => fileInputRef.current?.click();

  const downloadTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8,Make,Model,Year,LicensePlate,Category,DailyRate\nToyota,Innova Zenix,2024,B 1234 TES,MPV,1200000";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "template_impor_armada.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const vehicleToAdd: Vehicle = {
      id: `V-NEW-${Date.now()}`,
      make: newVehicle.make || 'Unknown',
      model: newVehicle.model || 'Unknown',
      year: newVehicle.year || 2024,
      licensePlate: newVehicle.licensePlate || 'B XXXX XX',
      status: VehicleStatus.AVAILABLE,
      mileage: 0,
      lastServiceDate: new Date().toISOString().split('T')[0],
      dailyRate: newVehicle.dailyRate || 0,
      imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
      category: (newVehicle.category as any) || 'Sedan'
    };
    
    setVehicles(prev => [vehicleToAdd, ...prev]);
    setIsModalOpen(false);
    setNewVehicle({ make: '', model: '', year: 2024, licensePlate: '', category: 'Sedan', dailyRate: 0 });
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-white">Inventaris Armada</h2>
          <p className="text-slate-400">Kelola ketersediaan aset dan status kendaraan (Total: {vehicles.length} Unit)</p>
        </div>
        <div className="flex gap-3">
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".csv" className="hidden" />
          
          <button onClick={downloadTemplate} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg border border-slate-600 hover:bg-slate-700 hover:text-white transition flex items-center gap-2 text-sm">
            <Download size={16} /> Template
          </button>

          <button onClick={triggerFileUpload} className="px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-600 hover:bg-slate-700 transition flex items-center gap-2">
            <Upload size={18} /> Impor CSV
          </button>
          
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition shadow-lg shadow-amber-900/20">
            + Tambah Kendaraan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="group bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 shadow-lg">
            <div className="relative h-48 overflow-hidden">
              <img src={vehicle.imageUrl} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border backdrop-blur-md ${getStatusColor(vehicle.status)}`}>
                  {vehicle.status}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 to-transparent p-4">
                <p className="text-white font-bold text-lg">{vehicle.make} {vehicle.model}</p>
                <p className="text-slate-300 text-sm">{vehicle.year} • {vehicle.category}</p>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex justify-between text-sm">
                <div className="flex items-center text-slate-400">
                  <div className="p-1.5 bg-slate-900 rounded mr-2"><Gauge size={14} className="text-amber-500" /></div>
                  {vehicle.mileage.toLocaleString()} km
                </div>
                <div className="flex items-center text-slate-400">
                  <div className="p-1.5 bg-slate-900 rounded mr-2"><Fuel size={14} className="text-amber-500" /></div>
                  Bensin
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                <div>
                  <p className="text-xs text-slate-500 uppercase">Tarif Harian</p>
                  <p className="text-xl font-bold text-white">{formatCurrency(vehicle.dailyRate)}</p>
                </div>
                <div className="flex flex-col items-end">
                    <p className="text-xs text-slate-500 mb-1">{vehicle.licensePlate}</p>
                    <button className="p-2 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition">
                      <MoreVertical size={20} />
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Tambah Kendaraan */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Tambah Kendaraan Baru</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Merek (Make)</label>
                  <input type="text" required className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none" 
                    value={newVehicle.make} onChange={e => setNewVehicle({...newVehicle, make: e.target.value})} placeholder="Toyota" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Model</label>
                  <input type="text" required className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none" 
                    value={newVehicle.model} onChange={e => setNewVehicle({...newVehicle, model: e.target.value})} placeholder="Alphard" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Tahun</label>
                  <input type="number" required className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none" 
                    value={newVehicle.year} onChange={e => setNewVehicle({...newVehicle, year: parseInt(e.target.value)})} />
                </div>
                <div>
                   <label className="block text-xs text-slate-400 mb-1">Kategori</label>
                   <select className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                    value={newVehicle.category} onChange={e => setNewVehicle({...newVehicle, category: e.target.value as any})}>
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="MPV">MPV</option>
                      <option value="Van">Van</option>
                      <option value="Luxury">Luxury</option>
                   </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Plat Nomor</label>
                <input type="text" required className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none" 
                  value={newVehicle.licensePlate} onChange={e => setNewVehicle({...newVehicle, licensePlate: e.target.value})} placeholder="B 1234 XXX" />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Tarif Harian (IDR)</label>
                <input type="number" required className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none" 
                  value={newVehicle.dailyRate} onChange={e => setNewVehicle({...newVehicle, dailyRate: parseInt(e.target.value)})} />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700">Batal</button>
                <button type="submit" className="flex-1 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium shadow-lg shadow-amber-900/20">Simpan Kendaraan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FleetManagement;
