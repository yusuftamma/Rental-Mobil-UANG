import React from 'react';
import { MOCK_TRANSACTIONS } from '../constants';
import { formatCurrency } from '../utils';
import { CreditCard, TrendingUp, TrendingDown, FileText, Download } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

const Accounting: React.FC = () => {
  const expenseData = [
    { name: 'Operasional', value: 350000000 },
    { name: 'Gaji', value: 250000000 },
    { name: 'Pemasaran', value: 80000000 },
    { name: 'Lainnya', value: 45000000 },
  ];

  const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#64748b'];

  const handleDownloadReport = () => {
    // Generate CSV Content
    const headers = "ID,Tanggal,Deskripsi,Kategori,Jumlah,Status\n";
    const rows = MOCK_TRANSACTIONS.map(trx => 
      `${trx.id},${trx.date},"${trx.description}",${trx.category},${trx.amount},${trx.status}`
    ).join("\n");
    
    const csvContent = "data:text/csv;charset=utf-8," + headers + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Laporan_Keuangan_UANG_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert("Laporan keuangan berhasil diunduh.");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold text-white">Akuntansi</h2>
          <p className="text-slate-400">Laporan keuangan dan arus kas real-time</p>
        </div>
        <button 
          onClick={handleDownloadReport}
          className="px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-600 hover:bg-slate-700 transition flex items-center gap-2"
        >
          <Download size={16} />
          Unduh Laporan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Expense Chart */}
        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-medium text-white mb-4">Distribusi Pengeluaran</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                   formatter={(value: number) => formatCurrency(value)}
                   contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#fff' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-medium text-white mb-4">Transaksi Terakhir</h3>
          <div className="space-y-4">
            {MOCK_TRANSACTIONS.map((trx) => (
              <div key={trx.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-slate-500 transition">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${trx.amount > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                    {trx.amount > 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{trx.description}</h4>
                    <p className="text-xs text-slate-500">{trx.date} • {trx.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${trx.amount > 0 ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {trx.amount > 0 ? '+' : ''}{formatCurrency(trx.amount)}
                  </p>
                  <span className={`text-xs px-2 py-0.5 rounded ${trx.status === 'Lunas' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                    {trx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-sm text-slate-400 hover:text-white text-center">
            Lihat semua transaksi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Accounting;