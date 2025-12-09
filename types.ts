export enum VehicleStatus {
  AVAILABLE = 'Tersedia',
  RENTED = 'Disewa',
  MAINTENANCE = 'Perawatan',
  RESERVED = 'Dipesan'
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  status: VehicleStatus;
  mileage: number;
  lastServiceDate: string;
  dailyRate: number;
  imageUrl: string;
  category: 'Luxury' | 'SUV' | 'Sports' | 'Sedan' | 'MPV' | 'Van';
}

export interface FinancialMetric {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface MaintenanceAlert {
  id: string;
  vehicleId: string;
  vehicleName: string;
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  dueDate: string;
}

export enum AppModule {
  DASHBOARD = 'dashboard',
  FLEET = 'fleet',
  SALES = 'sales',
  AI_ADVISOR = 'ai',
  ACCOUNTING = 'accounting',
  PROCUREMENT = 'procurement',
  MAINTENANCE = 'maintenance'
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}

// New Types for added modules
export interface Customer {
  id: string;
  name: string;
  company: string;
  status: 'Prospek' | 'Negosiasi' | 'Deal' | 'Pelanggan';
  value: number;
  lastContact: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: 'Pendapatan' | 'Operasional' | 'Gaji' | 'Pemasaran';
  amount: number;
  status: 'Lunas' | 'Pending';
}

export interface PurchaseOrder {
  id: string;
  item: string;
  vendor: string;
  quantity: number;
  totalCost: number;
  status: 'Menunggu' | 'Disetujui' | 'Selesai';
  requestDate: string;
}