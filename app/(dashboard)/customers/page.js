"use client";

import { useState } from "react";
import { Plus, Search, ChevronDown, Calendar, CreditCard, User, Building, X, DollarSign, Users, Phone, Mail } from "lucide-react";

export default function CustomerManagement() {
  const [activeTab, setActiveTab] = useState("buyers");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buyers = [
    { id: 1, name: "Asif Mohammed", flat: "102 (Bldg A)", total: 1500000, paid: 500000, due: 1000000, status: "Active", phone: "01711000000" },
    { id: 2, name: "Rahim Uddin", flat: "202 (Bldg B)", total: 1200000, paid: 1200000, due: 0, status: "Completed", phone: "01711000001" },
    { id: 3, name: "Karim Khan", flat: "301 (Bldg A)", total: 1800000, paid: 200000, due: 1600000, status: "Active", phone: "01711000002" },
  ];

  const renters = [
    { id: 1, name: "Jane Smith", flat: "201 (Bldg A)", rent: 15000, due: 0, status: "Active", phone: "01711000003" },
    { id: 2, name: "Mike Johnson", flat: "101 (Bldg B)", rent: 12000, due: 12000, status: "Due", phone: "01711000004" },
    { id: 3, name: "Sara Begum", flat: "201 (Bldg B)", rent: 16000, due: 0, status: "Active", phone: "01711000005" },
  ];

  const summary = activeTab === "buyers" ? {
    total: buyers.length,
    totalAmount: buyers.reduce((acc, curr) => acc + curr.total, 0),
    totalPaid: buyers.reduce((acc, curr) => acc + curr.paid, 0),
    totalDue: buyers.reduce((acc, curr) => acc + curr.due, 0),
  } : {
    total: renters.length,
    totalRent: renters.reduce((acc, curr) => acc + curr.rent, 0),
    totalDue: renters.reduce((acc, curr) => acc + curr.due, 0),
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customer Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage flat buyers and renters.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-amber-500 text-slate-900 px-4 py-2.5 rounded-lg font-medium hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus size={16} /> Add Customer
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg w-full md:w-auto overflow-x-auto inline-flex">
        <button
          onClick={() => setActiveTab("buyers")}
          className={`px-4 py-2.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTab === "buyers"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Flat Buyers
        </button>
        <button
          onClick={() => setActiveTab("renters")}
          className={`px-4 py-2.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTab === "renters"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Renters (Tenants)
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="text-sm font-medium text-slate-500 mb-2">Total Customers</div>
          <div className="text-2xl font-bold text-slate-900">{summary.total}</div>
        </div>
        {activeTab === "buyers" ? (
          <>
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <div className="text-sm font-medium text-slate-500 mb-2">Total Value</div>
              <div className="text-2xl font-bold text-slate-900">৳{summary.totalAmount.toLocaleString()}</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <div className="text-sm font-medium text-slate-500 mb-2">Total Received</div>
              <div className="text-2xl font-bold text-emerald-600">৳{summary.totalPaid.toLocaleString()}</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <div className="text-sm font-medium text-slate-500 mb-2">Total Due</div>
              <div className="text-2xl font-bold text-red-600">৳{summary.totalDue.toLocaleString()}</div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <div className="text-sm font-medium text-slate-500 mb-2">Monthly Rent Roll</div>
              <div className="text-2xl font-bold text-slate-900">৳{summary.totalRent.toLocaleString()}</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <div className="text-sm font-medium text-slate-500 mb-2">Total Due Rent</div>
              <div className="text-2xl font-bold text-red-600">৳{summary.totalDue.toLocaleString()}</div>
            </div>
          </>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search size={16} />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="py-4 px-6 text-sm font-medium">Customer Name</th>
                <th className="py-4 px-6 text-sm font-medium">Flat</th>
                {activeTab === "buyers" ? (
                  <>
                    <th className="py-4 px-6 text-sm font-medium">Total Amount</th>
                    <th className="py-4 px-6 text-sm font-medium">Paid</th>
                    <th className="py-4 px-6 text-sm font-medium">Due</th>
                  </>
                ) : (
                  <>
                    <th className="py-4 px-6 text-sm font-medium">Monthly Rent</th>
                    <th className="py-4 px-6 text-sm font-medium">Due Rent</th>
                  </>
                )}
                <th className="py-4 px-6 text-sm font-medium">Status</th>
                <th className="py-4 px-6 text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {(activeTab === "buyers" ? buyers : renters).map((cust, index) => (
                <tr 
                  key={cust.id} 
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50"
                  } hover:bg-slate-100 transition-colors`}
                >
                  <td className="py-4 px-6 text-sm">
                    <div className="font-medium text-slate-900">{cust.name}</div>
                    <div className="text-slate-500 text-xs font-mono">{cust.phone}</div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-500">{cust.flat}</td>
                  {activeTab === "buyers" ? (
                    <>
                      <td className="py-4 px-6 text-sm text-slate-700">৳{cust.total.toLocaleString()}</td>
                      <td className="py-4 px-6 text-sm text-emerald-600">৳{cust.paid.toLocaleString()}</td>
                      <td className="py-4 px-6 text-sm text-red-600 font-bold">৳{cust.due.toLocaleString()}</td>
                    </>
                  ) : (
                    <>
                      <td className="py-4 px-6 text-sm text-slate-700">৳{cust.rent.toLocaleString()}</td>
                      <td className="py-4 px-6 text-sm text-red-600 font-bold">৳{cust.due.toLocaleString()}</td>
                    </>
                  )}
                  <td className="py-4 px-6 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      cust.status === "Active" || cust.status === "Completed" 
                        ? "bg-emerald-100 text-emerald-700" 
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {cust.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <button className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center gap-1">
                      <CreditCard size={14} />
                      Ledger
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Add New Customer</h2>
                <p className="text-slate-500 text-sm mt-0.5">Add a new buyer or renter.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-500 hover:bg-slate-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Customer Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Asif Mohammed"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Contact Number *</label>
                <input
                  type="text"
                  placeholder="e.g. 01711000000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Customer Type *</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="Buyer">Flat Buyer</option>
                    <option value="Renter">Renter (Tenant)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Flat No *</label>
                <input
                  type="text"
                  placeholder="e.g. 102 (Bldg A)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Amount / Rent (৳) *</label>
                <input
                  type="number"
                  placeholder="Total price or Monthly rent"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2.5 border border-slate-200 rounded-lg font-medium text-slate-700 hover:bg-white transition-colors text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2.5 bg-amber-500 text-slate-900 rounded-lg font-medium hover:bg-amber-600 transition-colors text-sm shadow-sm"
              >
                Save Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
