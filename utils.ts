import { Vehicle, VehicleStatus } from './types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const parseVehicleCSV = (csvText: string): Vehicle[] => {
  const lines = csvText.split('\n');
  const vehicles: Vehicle[] = [];
  
  // Lewati header (baris pertama) dan loop baris data
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Asumsi format CSV: Make,Model,Year,LicensePlate,Category,DailyRate
    // Contoh: Toyota,Camry,2024,B 1234 ABC,Sedan,1500000
    const parts = line.split(',');
    
    if (parts.length >= 6) {
      // Mapping sederhana status secara acak atau default
      const vehicle: Vehicle = {
        id: `CSV-${Date.now()}-${i}`,
        make: parts[0].trim(),
        model: parts[1].trim(),
        year: parseInt(parts[2].trim()) || new Date().getFullYear(),
        licensePlate: parts[3].trim(),
        status: VehicleStatus.AVAILABLE, // Default status
        mileage: 0, // Default mileage
        lastServiceDate: new Date().toISOString().split('T')[0],
        dailyRate: parseInt(parts[5].trim()) || 1000000,
        imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80', // Default image placeholder
        category: (parts[4].trim() as any) || 'Sedan'
      };
      vehicles.push(vehicle);
    }
  }
  return vehicles;
};
