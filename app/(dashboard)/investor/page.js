"use client";

import { useState } from "react";
import { Plus, Search, ChevronDown, X, DollarSign, TrendingUp, Wallet, Users } from "lucide-react";

export default function InvestorManagement() {
  const [investors, setInvestors] = useState([
    { id: 1, name: "Rahim Ali", amount: 500000, profitPercentage: 10, paid: 20000 },
    { id: 2, name: "Karim Uddin", amount: 1000000, profitPercentage: 12, paid: 50000 },
    { id: 3, name: "Abul Kashem", amount: 300000, profitPercentage: 8, paid: 10000 },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  
  const [newInvestor, setNewInvestor] = useState({ name: "", amount: "", profitPercentage: "" });
  const [paymentAmount, setPaymentAmount] = useState("");

  // Calculations
  const calculateProfit = (amount, percentage) => (amount * percentage) / 100;
  const calculateDue = (profit, paid) => profit - paid;

  const totalInvested = investors.reduce((sum, inv) => sum + inv.amount, 0);
  const totalProfit = investors.reduce((sum, inv) => sum + calculateProfit(inv.amount, inv.profitPercentage), 0);
  const totalPaid = investors.reduce((sum, inv) => sum + inv.paid, 0);
  const totalDue = totalProfit - totalPaid;

  const handleAddInvestor = () => {
    if (!newInvestor.name || !newInvestor.amount || !newInvestor.profitPercentage) return;
    setInvestors([
      ...investors,
      {
        id: investors.length + 1,
        name: newInvestor.name,
        amount: parseFloat(newInvestor.amount),
        profitPercentage: parseFloat(newInvestor.profitPercentage),
        paid: 0,
      },
    ]);
    setNewInvestor({ name: "", amount: "", profitPercentage: "" });
    setIsAddModalOpen(false);
  };

  const handleMakePayment = () => {
    if (!selectedInvestor || !paymentAmount) return;
    setInvestors(
      investors.map((inv) =>
        inv.id === selectedInvestor.id
          ? { ...inv, paid: inv.paid + parseFloat(paymentAmount) }
          : inv
      )
    );
    setPaymentAmount("");
    setIsPayModalOpen(false);
    setSelectedInvestor(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Investor Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage investors, investments, and profit distributions.</p>
        </div>
        
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-amber-500 text-slate-900 px-4 py-2.5 rounded-lg font-medium hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-sm self-start md:self-auto"
        >
          <Plus size={18} />
          Add Investor
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Invested</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">৳{totalInvested.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Wallet size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Profit</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">৳{totalProfit.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Paid</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">৳{totalPaid.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Due</p>
              <p className="text-2xl font-bold text-red-600 mt-1">৳{totalDue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-red-50 text-red-600 rounded-lg">
              <DollarSign size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="py-4 px-6 text-sm font-medium">Investor Name</th>
                <th className="py-4 px-6 text-sm font-medium">Amount</th>
                <th className="py-4 px-6 text-sm font-medium">Profit %</th>
                <th className="py-4 px-6 text-sm font-medium">Profit Amount</th>
                <th className="py-4 px-6 text-sm font-medium">Paid</th>
                <th className="py-4 px-6 text-sm font-medium">Due</th>
                <th className="py-4 px-6 text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {investors.map((item, index) => {
                const profit = calculateProfit(item.amount, item.profitPercentage);
                const due = calculateDue(profit, item.paid);
                return (
                  <tr 
                    key={item.id} 
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    } hover:bg-slate-100 transition-colors`}
                  >
                    <td className="py-4 px-6 text-sm font-medium text-slate-900">{item.name}</td>
                    <td className="py-4 px-6 text-sm text-slate-700">৳{item.amount.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-slate-700">{item.profitPercentage}%</td>
                    <td className="py-4 px-6 text-sm text-emerald-600 font-medium">৳{profit.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-slate-700">৳{item.paid.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-red-600 font-medium">৳{due.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm">
                      <button 
                        onClick={() => {
                          setSelectedInvestor(item);
                          setIsPayModalOpen(true);
                        }}
                        className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center gap-1"
                      >
                        <DollarSign size={14} />
                        Pay
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Investor Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Add New Investor</h2>
                <p className="text-slate-500 text-sm mt-0.5">Enter investor details.</p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-500 hover:bg-slate-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Investor Name *</label>
                <input
                  type="text"
                  value={newInvestor.name}
                  onChange={(e) => setNewInvestor({ ...newInvestor, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Investment Amount (৳) *</label>
                <input
                  type="number"
                  value={newInvestor.amount}
                  onChange={(e) => setNewInvestor({ ...newInvestor, amount: e.target.value })}
                  placeholder="e.g. 500000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Profit Percentage (%) *</label>
                <input
                  type="number"
                  value={newInvestor.profitPercentage}
                  onChange={(e) => setNewInvestor({ ...newInvestor, profitPercentage: e.target.value })}
                  placeholder="e.g. 10"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50">
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2.5 border border-slate-200 rounded-lg font-medium text-slate-700 hover:bg-white transition-colors text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddInvestor}
                className="px-4 py-2.5 bg-amber-500 text-slate-900 rounded-lg font-medium hover:bg-amber-600 transition-colors text-sm shadow-sm"
              >
                Save Investor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pay Investor Modal */}
      {isPayModalOpen && selectedInvestor && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Make Payment</h2>
                <p className="text-slate-500 text-sm mt-0.5">Record payment for {selectedInvestor.name}.</p>
              </div>
              <button 
                onClick={() => setIsPayModalOpen(false)}
                className="text-slate-400 hover:text-slate-500 hover:bg-slate-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-slate-600">
                  Investor: <span className="font-medium text-slate-900">{selectedInvestor.name}</span>
                </p>
                <p className="text-sm text-slate-600">
                  Total Profit: <span className="font-medium text-emerald-600">৳{calculateProfit(selectedInvestor.amount, selectedInvestor.profitPercentage).toLocaleString()}</span>
                </p>
                <p className="text-sm text-slate-600">
                  Already Paid: <span className="font-medium text-slate-900">৳{selectedInvestor.paid.toLocaleString()}</span>
                </p>
                <p className="text-sm text-slate-600">
                  Current Due: <span className="font-medium text-red-600">৳{calculateDue(calculateProfit(selectedInvestor.amount, selectedInvestor.profitPercentage), selectedInvestor.paid).toLocaleString()}</span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Payment Amount (৳) *</label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="e.g. 10000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50">
              <button 
                onClick={() => setIsPayModalOpen(false)}
                className="px-4 py-2.5 border border-slate-200 rounded-lg font-medium text-slate-700 hover:bg-white transition-colors text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleMakePayment}
                className="px-4 py-2.5 bg-amber-500 text-slate-900 rounded-lg font-medium hover:bg-amber-600 transition-colors text-sm shadow-sm"
              >
                Record Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
