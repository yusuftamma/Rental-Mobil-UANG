import { Vehicle, VehicleStatus, FinancialMetric, MaintenanceAlert, Customer, Transaction, PurchaseOrder } from './types';
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  BrainCircuit, 
  Briefcase, 
  Wrench, 
  CreditCard,
  ShoppingCart
} from 'lucide-react';

// --- GENERATOR DATA ARMADA (50 Unit) ---
const generateVehicles = (): Vehicle[] => {
  const vehicles: Vehicle[] = [];
  const statuses = [VehicleStatus.AVAILABLE, VehicleStatus.AVAILABLE, VehicleStatus.RENTED, VehicleStatus.RENTED, VehicleStatus.MAINTENANCE, VehicleStatus.RESERVED];
  
  // Helper untuk random status
  const getRandomStatus = () => statuses[Math.floor(Math.random() * statuses.length)];
  
  // Helper untuk random mileage
  const getRandomMileage = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);

  // 1. SEDAN (20 Unit) - Mix Luxury & Standard
  // 10 Unit Mercedes-Benz S-Class
  for (let i = 1; i <= 10; i++) {
    vehicles.push({
      id: `V-SED-${i.toString().padStart(3, '0')}`,
      make: 'Mercedes-Benz',
      model: 'S-Class S450',
      year: 2023,
      licensePlate: `B ${1000 + i} RFS`,
      status: getRandomStatus(),
      mileage: getRandomMileage(5000, 25000),
      lastServiceDate: '2024-04-01',
      dailyRate: 7500000,
      imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80', // Black Mercedes
      category: 'Luxury'
    });
  }
  // 10 Unit Toyota Camry
  for (let i = 11; i <= 20; i++) {
    vehicles.push({
      id: `V-SED-${i.toString().padStart(3, '0')}`,
      make: 'Toyota',
      model: 'Camry Hybrid',
      year: 2024,
      licensePlate: `B ${2000 + i} PAA`,
      status: getRandomStatus(),
      mileage: getRandomMileage(1000, 15000),
      lastServiceDate: '2024-03-15',
      dailyRate: 1800000,
      imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?auto=format&fit=crop&w=800&q=80', // White Sedan
      category: 'Sedan'
    });
  }

  // 2. MPV (10 Unit)
  // 5 Unit Toyota Alphard
  for (let i = 1; i <= 5; i++) {
    vehicles.push({
      id: `V-MPV-${i.toString().padStart(3, '0')}`,
      make: 'Toyota',
      model: 'Alphard Transformer',
      year: 2023,
      licensePlate: `B ${8000 + i} ALP`,
      status: getRandomStatus(),
      mileage: getRandomMileage(8000, 40000),
      lastServiceDate: '2024-04-10',
      dailyRate: 3500000,
      imageUrl: 'https://images.unsplash.com/photo-1626388482430-c32f8313463a?auto=format&fit=crop&w=800&q=80', // Luxury MPV vibe
      category: 'MPV'
    });
  }
  // 5 Unit Lexus LM 350
  for (let i = 6; i <= 10; i++) {
    vehicles.push({
      id: `V-MPV-${i.toString().padStart(3, '0')}`,
      make: 'Lexus',
      model: 'LM 350 4-Seater',
      year: 2024,
      licensePlate: `B ${9000 + i} LEX`,
      status: getRandomStatus(),
      mileage: getRandomMileage(2000, 10000),
      lastServiceDate: '2024-05-01',
      dailyRate: 8500000,
      imageUrl: 'https://images.unsplash.com/photo-1698656627529-688a24564c7d?auto=format&fit=crop&w=800&q=80', // Lexus vibe
      category: 'MPV'
    });
  }

  // 3. HIACE (20 Unit)
  // 10 Unit Hiace Premio
  for (let i = 1; i <= 10; i++) {
    vehicles.push({
      id: `V-BUS-${i.toString().padStart(3, '0')}`,
      make: 'Toyota',
      model: 'Hiace Premio',
      year: 2023,
      licensePlate: `B ${7000 + i} HIC`,
      status: getRandomStatus(),
      mileage: getRandomMileage(15000, 60000),
      lastServiceDate: '2024-03-20',
      dailyRate: 1800000,
      imageUrl: 'https://images.unsplash.com/photo-1549830509-58b212f45100?auto=format&fit=crop&w=800&q=80', // White Van
      category: 'Van'
    });
  }
  // 10 Unit Hiace Commuter
  for (let i = 11; i <= 20; i++) {
    vehicles.push({
      id: `V-BUS-${i.toString().padStart(3, '0')}`,
      make: 'Toyota',
      model: 'Hiace Commuter',
      year: 2022,
      licensePlate: `B ${7500 + i} COM`,
      status: getRandomStatus(),
      mileage: getRandomMileage(30000, 80000),
      lastServiceDate: '2024-04-05',
      dailyRate: 1200000,
      imageUrl: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?auto=format&fit=crop&w=800&q=80', // Generic Van
      category: 'Van'
    });
  }

  return vehicles;
};

export const MOCK_VEHICLES: Vehicle[] = generateVehicles();

// Data Keuangan (Dalam Rupiah)
export const FINANCIAL_DATA: FinancialMetric[] = [
  { month: 'Jan', revenue: 1800000000, expenses: 650000000, profit: 1150000000 },
  { month: 'Feb', revenue: 2100000000, expenses: 720000000, profit: 1380000000 },
  { month: 'Mar', revenue: 1650000000, expenses: 780000000, profit: 870000000 },
  { month: 'Apr', revenue: 2400000000, expenses: 825000000, profit: 1575000000 },
  { month: 'Mei', revenue: 2850000000, expenses: 900000000, profit: 1950000000 },
  { month: 'Jun', revenue: 3150000000, expenses: 975000000, profit: 2175000000 },
];

export const MAINTENANCE_ALERTS: MaintenanceAlert[] = [
  {
    id: 'MA-01',
    vehicleId: 'V-SED-003',
    vehicleName: 'Mercedes-Benz S-Class',
    severity: 'High',
    description: 'Kampas rem menipis (Kritis)',
    dueDate: '2024-05-15'
  },
  {
    id: 'MA-02',
    vehicleId: 'V-BUS-005',
    vehicleName: 'Hiace Premio',
    severity: 'Medium',
    description: 'Ganti Oli Berkala (500km lagi)',
    dueDate: '2024-05-20'
  }
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'C-01', name: 'PT Sinergi Tech', company: 'Korporat', status: 'Negosiasi', value: 150000000, lastContact: '2024-05-10' },
  { id: 'C-02', name: 'Budi Santoso', company: 'Pribadi', status: 'Deal', value: 45000000, lastContact: '2024-05-11' },
  { id: 'C-03', name: 'Embassy Event', company: 'Event', status: 'Prospek', value: 300000000, lastContact: '2024-05-12' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'TRX-991', date: '2024-05-12', description: 'Sewa Bulanan Hiace - PT Sinergi', category: 'Pendapatan', amount: 135000000, status: 'Lunas' },
  { id: 'TRX-992', date: '2024-05-11', description: 'Gaji Driver & Staff', category: 'Gaji', amount: -85000000, status: 'Lunas' },
  { id: 'TRX-993', date: '2024-05-10', description: 'Servis Berkala Armada', category: 'Operasional', amount: -12500000, status: 'Pending' },
];

export const MOCK_PO: PurchaseOrder[] = [
  { id: 'PO-2024-001', item: 'Ban Bridgestone Hiace (Set)', vendor: 'AutoTire Official', quantity: 8, totalCost: 18000000, status: 'Menunggu', requestDate: '2024-05-13' },
  { id: 'PO-2024-002', item: 'Oli Mobil 1 Synthetic', vendor: 'Mitra Oli Pusat', quantity: 50, totalCost: 12500000, status: 'Disetujui', requestDate: '2024-05-10' },
];

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'fleet', label: 'Manajemen Armada', icon: Car },
  { id: 'sales', label: 'CRM & Penjualan', icon: Users },
  { id: 'accounting', label: 'Akuntansi', icon: CreditCard },
  { id: 'procurement', label: 'Pengadaan', icon: ShoppingCart },
  { id: 'maintenance', label: 'Perawatan', icon: Wrench },
  { id: 'ai', label: 'UANG AI Advisor', icon: BrainCircuit },
];