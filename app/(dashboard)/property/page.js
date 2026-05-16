"use client";

import { useState } from "react";
import { Plus, Search, ChevronDown, Calendar, CreditCard, User, Building, X, DollarSign, Users, Phone } from "lucide-react";

export default function PropertyInstallments() {
  const [activeTab, setActiveTab] = useState("inventory");
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTenantModalOpen, setIsTenantModalOpen] = useState(false);

  const flats = [
    { id: "101", building: "Building A", size: "1200 sqft", status: "Available" },
    { id: "102", building: "Building A", size: "1500 sqft", status: "Booked", customer: "John Doe", totalAmount: 150000, paidAmount: 50000 },
    { id: "201", building: "Building A", size: "1200 sqft", status: "Rented", customer: "Jane Smith", rentAmount: 15000, paidAmount: 15000, phone: "01711000001" },
    { id: "202", building: "Building A", size: "1500 sqft", status: "Available" },
    { id: "101", building: "Building B", size: "1000 sqft", status: "Booked", customer: "Mike Johnson", totalAmount: 90000, paidAmount: 30000 },
    { id: "102", building: "Building B", size: "1100 sqft", status: "Rented", customer: "Karim Ali", rentAmount: 12000, paidAmount: 12000, phone: "01711000002" },
    { id: "201", building: "Building B", size: "1200 sqft", status: "Rented", customer: "Sara Begum", rentAmount: 16000, paidAmount: 0, phone: "01711000003" },
  ];

  const installments = [
    { date: "2026-01-01", amount: 10000, status: "Paid" },
    { date: "2026-02-01", amount: 10000, status: "Paid" },
    { date: "2026-03-01", amount: 10000, status: "Paid" },
    { date: "2026-04-01", amount: 10000, status: "Pending" },
    { date: "2026-05-01", amount: 10000, status: "Pending" },
  ];

  const rentHistory = [
    { date: "2026-01-05", amount: 15000, status: "Paid", month: "January" },
    { date: "2026-02-05", amount: 15000, status: "Paid", month: "February" },
    { date: "2026-03-05", amount: 15000, status: "Paid", month: "March" },
    { date: "2026-04-05", amount: 15000, status: "Pending", month: "April" },
    { date: "2026-05-05", amount: 15000, status: "Pending", month: "May" },
  ];

  const selectedFlatData = selectedFlat ? flats.find(f => f.id === selectedFlat.id && f.building === selectedFlat.building) : null;

  const currentLedger = selectedFlatData?.status === "Rented" ? rentHistory : installments;

  const rentedFlats = flats.filter(f => f.status === "Rented");
  const availableFlats = flats.filter(f => f.status === "Available");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Property Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage flat inventory, installments, and tenants.</p>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("inventory")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "inventory"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Inventory & Ledgers
          </button>
          <button
            onClick={() => setActiveTab("tenants")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "tenants"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Tenant List
          </button>
        </div>
      </div>

      {activeTab === "inventory" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Flat Inventory Grid */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Building size={20} className="text-amber-500" />
                Flat Inventory
              </h2>
              
              {/* Building A */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-500 mb-3">Building A</h3>
                <div className="grid grid-cols-2 gap-3">
                  {flats.filter(f => f.building === "Building A").map((flat) => (
                    <button
                      key={`${flat.building}-${flat.id}`}
                      onClick={() => setSelectedFlat({ id: flat.id, building: flat.building })}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selectedFlat && selectedFlat.id === flat.id && selectedFlat.building === flat.building
                          ? "border-amber-500 ring-2 ring-amber-500/20 bg-amber-50"
                          : "border-slate-100 bg-slate-50 hover:border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-900">Flat {flat.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          flat.status === "Available" ? "bg-emerald-100 text-emerald-700" :
                          flat.status === "Booked" ? "bg-amber-100 text-amber-700" :
                          "bg-blue-100 text-blue-700"
                        }`}>
                          {flat.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{flat.size}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Building B */}
              <div>
                <h3 className="text-sm font-semibold text-slate-500 mb-3">Building B</h3>
                <div className="grid grid-cols-2 gap-3">
                  {flats.filter(f => f.building === "Building B").map((flat) => (
                    <button
                      key={`${flat.building}-${flat.id}`}
                      onClick={() => setSelectedFlat({ id: flat.id, building: flat.building })}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selectedFlat && selectedFlat.id === flat.id && selectedFlat.building === flat.building
                          ? "border-amber-500 ring-2 ring-amber-500/20 bg-amber-50"
                          : "border-slate-100 bg-slate-50 hover:border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-900">Flat {flat.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          flat.status === "Available" ? "bg-emerald-100 text-emerald-700" :
                          flat.status === "Booked" ? "bg-amber-100 text-amber-700" :
                          "bg-blue-100 text-blue-700"
                        }`}>
                          {flat.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{flat.size}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Ledger */}
          <div className="lg:col-span-2">
            {selectedFlatData && (selectedFlatData.status === "Booked" || selectedFlatData.status === "Rented") ? (
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Flat {selectedFlatData.id} - {selectedFlatData.building}
                    </h2>
                    <div className="flex items-center gap-2 mt-1 text-slate-500 text-sm">
                      <User size={14} />
                      <span>Customer/Tenant: <span className="font-medium text-slate-700">{selectedFlatData.customer}</span></span>
                    </div>
                  </div>
                  <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium">
                      {selectedFlatData.status === "Rented" ? "Monthly Rent" : "Total Agreed Amount"}
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      ৳{selectedFlatData.status === "Rented" ? selectedFlatData.rentAmount.toLocaleString() : selectedFlatData.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Table */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900">
                      {selectedFlatData.status === "Rented" ? "Rent Collection Ledger" : "Installment Schedule"}
                    </h3>
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="bg-amber-500 text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-amber-600 transition-colors text-sm flex items-center gap-2"
                    >
                      <Plus size={16} /> 
                      {selectedFlatData.status === "Rented" ? "Record Rent" : "Add Payment Receipt"}
                    </button>
                  </div>
                  
                  <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-900 text-white text-sm">
                          <th className="py-3 px-4 font-medium">{selectedFlatData.status === "Rented" ? "Month" : "Due Date"}</th>
                          <th className="py-3 px-4 font-medium">Amount</th>
                          <th className="py-3 px-4 font-medium">Status</th>
                          <th className="py-3 px-4 font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentLedger.map((inst, index) => (
                          <tr key={index} className="border-b border-slate-100 text-sm hover:bg-white transition-colors">
                            <td className="py-3 px-4 text-slate-700 font-mono flex items-center gap-2">
                              <Calendar size={14} className="text-slate-400" />
                              {selectedFlatData.status === "Rented" ? inst.month : inst.date}
                            </td>
                            <td className="py-3 px-4 font-medium text-slate-900">৳{inst.amount.toLocaleString()}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                inst.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                              }`}>
                                {inst.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              {inst.status === "Pending" ? (
                                <button className="text-amber-600 hover:text-amber-700 font-medium text-xs flex items-center gap-1">
                                  <CreditCard size={12} />
                                  {selectedFlatData.status === "Rented" ? "Collect Rent" : "Pay Now"}
                                </button>
                              ) : (
                                <span className="text-slate-400 text-xs">Receipt Issued</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                  <Building size={32} />
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">No Flat Selected or Available</h2>
                <p className="text-slate-500 text-sm max-w-sm">
                  Select a Booked or Rented flat from the inventory to view its ledger.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "tenants" && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search tenants..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Search size={16} />
              </div>
            </div>

            <button 
              onClick={() => setIsTenantModalOpen(true)}
              className="bg-amber-500 text-slate-900 px-4 py-2.5 rounded-lg font-medium hover:bg-amber-600 transition-colors text-sm flex items-center gap-2 shadow-sm"
            >
              <Plus size={16} /> Assign Tenant
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-4 px-6 text-sm font-medium">Tenant Name</th>
                  <th className="py-4 px-6 text-sm font-medium">Flat No</th>
                  <th className="py-4 px-6 text-sm font-medium">Building</th>
                  <th className="py-4 px-6 text-sm font-medium">Monthly Rent</th>
                  <th className="py-4 px-6 text-sm font-medium">Contact</th>
                  <th className="py-4 px-6 text-sm font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {rentedFlats.map((flat, index) => (
                  <tr 
                    key={`${flat.building}-${flat.id}`} 
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    } hover:bg-slate-100 transition-colors`}
                  >
                    <td className="py-4 px-6 text-sm font-medium text-slate-900">{flat.customer}</td>
                    <td className="py-4 px-6 text-sm text-slate-500">Flat {flat.id}</td>
                    <td className="py-4 px-6 text-sm text-slate-500">{flat.building}</td>
                    <td className="py-4 px-6 text-sm font-semibold text-slate-900">৳{flat.rentAmount.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-slate-700 font-mono">{flat.phone}</td>
                    <td className="py-4 px-6 text-sm">
                      <button 
                        onClick={() => {
                          setActiveTab("inventory");
                          setSelectedFlat({ id: flat.id, building: flat.building });
                        }}
                        className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center gap-1"
                      >
                        <CreditCard size={14} />
                        View Ledger
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Payment Receipt / Rent Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {selectedFlatData?.status === "Rented" ? "Record Monthly Rent" : "Add Payment Receipt"}
                </h2>
                <p className="text-slate-500 text-sm mt-0.5">
                  {selectedFlatData?.status === "Rented" ? "Record rent payment for this month." : "Record a payment from the customer."}
                </p>
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
              {selectedFlatData?.status === "Rented" && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">For Month *</label>
                  <div className="relative">
                    <select
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer"
                    >
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Payment Date *</label>
                <input
                  type="date"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Amount (৳) *</label>
                <input
                  type="number"
                  placeholder="e.g. 15000"
                  defaultValue={selectedFlatData?.status === "Rented" ? selectedFlatData.rentAmount : ""}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Payment Method *</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cheque">Cheque</option>
                    <option value="bKash/Nagad">bKash/Nagad</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Receipt/Voucher No</label>
                <input
                  type="text"
                  placeholder="e.g. R-1023"
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
                {selectedFlatData?.status === "Rented" ? "Save Rent" : "Save Receipt"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Tenant Modal */}
      {isTenantModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Assign Tenant to Flat</h2>
                <p className="text-slate-500 text-sm mt-0.5">Rent out an available flat.</p>
              </div>
              <button 
                onClick={() => setIsTenantModalOpen(false)}
                className="text-slate-400 hover:text-slate-500 hover:bg-slate-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Available Flat *</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer"
                  >
                    {availableFlats.map((f) => (
                      <option key={`${f.building}-${f.id}`} value={`${f.building}-${f.id}`}>
                        Flat {f.id} ({f.building}) - {f.size}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tenant Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Asif Mohammed"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                    <User size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Monthly Rent (৳) *</label>
                <input
                  type="number"
                  placeholder="e.g. 15000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Contact Number *</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 01711000000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                    <Phone size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Possession Date</label>
                <input
                  type="date"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50">
              <button 
                onClick={() => setIsTenantModalOpen(false)}
                className="px-4 py-2.5 border border-slate-200 rounded-lg font-medium text-slate-700 hover:bg-white transition-colors text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsTenantModalOpen(false)}
                className="px-4 py-2.5 bg-amber-500 text-slate-900 rounded-lg font-medium hover:bg-amber-600 transition-colors text-sm shadow-sm"
              >
                Assign Tenant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
