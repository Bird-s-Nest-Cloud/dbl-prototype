"use client";

import { useState } from "react";
import { Plus, Search, Filter, Download, ChevronDown, Eye, FileText, X, DollarSign, CreditCard } from "lucide-react";

export default function ProjectAccounting() {
  const [selectedProject, setSelectedProject] = useState("Project Delta");
  const [activeTab, setActiveTab] = useState("expense");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const projects = ["Project Delta", "Project Alpha", "Project Sigma", "Project Omega"];

  const expenseData = [
    { date: "2026-05-15", category: "Procurement", description: "Purchased 10 Tons of Rod", amount: 15000, voucher: "#V-1024" },
    { date: "2026-05-14", category: "Utility", description: "Monthly Electricity Bill", amount: 1200, voucher: "#V-1025" },
    { date: "2026-05-12", category: "Fuel", description: "Diesel for Generator", amount: 800, voucher: "#V-1026" },
    { date: "2026-05-10", category: "Labour", description: "Weekly wage payment", amount: 5000, voucher: "#V-1027" },
  ];

  const incomeData = [
    { date: "2026-05-16", category: "Client Payment", description: "Installment from Mr. X", amount: 50000, voucher: "#R-501" },
    { date: "2026-05-11", category: "Client Payment", description: "Booking money for Flat 4A", amount: 100000, voucher: "#R-502" },
  ];

  const othersExpenseData = [
    { date: "2026-05-15", category: "Office Rent", description: "Head Office Rent (May)", amount: 25000, voucher: "#OE-101", branch: "Branch A" },
    { date: "2026-05-14", category: "Entertainment", description: "Snacks for guest", amount: 500, voucher: "#OE-102", branch: "Branch A" },
    { date: "2026-05-12", category: "Convayence", description: "Staff travel allowance", amount: 1200, voucher: "#OE-103", branch: "Branch B" },
    { date: "2026-05-10", category: "Stationery", description: "Paper and pen for office", amount: 800, voucher: "#OE-104", branch: "Branch B" },
  ];

  const totalIncome = incomeData.reduce((acc, item) => acc + item.amount, 0);
  const totalExpense = expenseData.reduce((acc, item) => acc + item.amount, 0);
  const totalOthersExpense = othersExpenseData.reduce((acc, item) => acc + item.amount, 0);

  const currentData = activeTab === "expense" ? expenseData : activeTab === "income" ? incomeData : othersExpenseData;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Accounting & Finance</h1>
          <p className="text-slate-500 text-sm mt-1">Track project accounts and general company expenses.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Project Selector - Hide when Others Expense is active */}
          {activeTab !== "others" && (
            <div className="relative">
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="appearance-none bg-white border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer shadow-sm"
              >
                {projects.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                <ChevronDown size={16} />
              </div>
            </div>
          )}

          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-amber-500 text-slate-900 px-4 py-2.5 rounded-lg font-medium hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus size={18} />
            {activeTab === "others" ? "Add Expense" : "Add Entry"}
          </button>
        </div>
      </div>

      {/* Tabs & Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg w-full md:w-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab("expense")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === "expense"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Project Expense
          </button>
          <button
            onClick={() => setActiveTab("income")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === "income"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Project Income
          </button>
          <button
            onClick={() => setActiveTab("others")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === "others"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Others Expense (Office)
          </button>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search size={16} />
            </div>
          </div>
          <button className="text-slate-700 bg-white border border-slate-200 p-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="py-4 px-6 text-sm font-medium">Date</th>
                <th className="py-4 px-6 text-sm font-medium">Category</th>
                <th className="py-4 px-6 text-sm font-medium">Description</th>
                {activeTab === "others" && <th className="py-4 px-6 text-sm font-medium">Branch</th>}
                <th className="py-4 px-6 text-sm font-medium">Amount</th>
                <th className="py-4 px-6 text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr 
                  key={index} 
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50"
                  } hover:bg-slate-100 transition-colors`}
                >
                  <td className="py-4 px-6 text-sm text-slate-500 font-mono">{item.date}</td>
                  <td className="py-4 px-6 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      activeTab === "expense" || activeTab === "others" ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
                    }`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-700">{item.description}</td>
                  {activeTab === "others" && (
                    <td className="py-4 px-6 text-sm text-slate-500">{item.branch}</td>
                  )}
                  <td className="py-4 px-6 text-sm font-semibold text-slate-900">
                    ৳{item.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <button 
                      onClick={() => {
                        setSelectedVoucher(item);
                        setIsVoucherModalOpen(true);
                      }}
                      className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
                    >
                      <Eye size={16} />
                      Voucher
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Summary Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
          {activeTab !== "others" ? (
            <>
              <div>
                <p className="text-slate-400 text-sm font-medium">Project Revenue</p>
                <p className="text-2xl font-bold text-emerald-400 mt-1">৳{totalIncome.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">Project Expenses</p>
                <p className="text-2xl font-bold text-red-400 mt-1">৳{totalExpense.toLocaleString()}</p>
              </div>
            </>
          ) : (
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Others Expense</p>
              <p className="text-2xl font-bold text-red-400 mt-1">৳{totalOthersExpense.toLocaleString()}</p>
            </div>
          )}
        </div>
        
        {activeTab !== "others" && (
          <div className="border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-12">
            <p className="text-slate-400 text-sm font-medium">Net Project Profit/Loss</p>
            <p className={`text-3xl font-bold mt-1 ${totalIncome - totalExpense >= 0 ? "text-amber-500" : "text-red-500"}`}>
              ৳{(totalIncome - totalExpense).toLocaleString()}
            </p>
          </div>
        )}
      </div>

      {/* Create Account Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {activeTab === "others" ? "Add Office Expense" : "Add Account Entry"}
                </h2>
                <p className="text-slate-500 text-sm mt-0.5">
                  {activeTab === "others" ? "Record a new general expense." : "Record a new income or expense for project."}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Date *</label>
                  <input
                    type="date"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                {activeTab !== "others" ? (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Type *</label>
                    <div className="relative">
                      <select
                        className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer"
                      >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Branch *</label>
                    <div className="relative">
                      <select
                        className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer"
                      >
                        <option value="Branch A">Branch A</option>
                        <option value="Branch B">Branch B</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Category *</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer"
                  >
                    {activeTab === "others" ? (
                      <>
                        <option value="Office Rent">Office Rent</option>
                        <option value="Utility">Utility</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Convayence">Convayence</option>
                        <option value="Stationery">Stationery</option>
                      </>
                    ) : (
                      <>
                        <option value="Procurement">Procurement</option>
                        <option value="Labour">Labour</option>
                        <option value="Utility">Utility</option>
                        <option value="Client Payment">Client Payment</option>
                        <option value="Investor Payment">Investor Payment</option>
                        <option value="Salary">Salary</option>
                      </>
                    )}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Amount (৳) *</label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                <textarea
                  rows="2"
                  placeholder="Details of the transaction..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                ></textarea>
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
                Save Entry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Voucher Modal */}
      {isVoucherModalOpen && selectedVoucher && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Voucher Details</h2>
                <p className="text-slate-500 text-sm mt-0.5">Voucher No: <span className="font-mono font-medium text-slate-700">{selectedVoucher.voucher}</span></p>
              </div>
              <button 
                onClick={() => setIsVoucherModalOpen(false)}
                className="text-slate-400 hover:text-slate-500 hover:bg-slate-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body - Voucher Design */}
            <div className="p-8 space-y-6 bg-white">
              {/* Company Header */}
              <div className="text-center border-b border-slate-200 pb-4">
                <h1 className="text-2xl font-bold text-slate-900">DBL BUILDERS</h1>
                <p className="text-sm text-slate-500">Project: {selectedProject}</p>
                <div className="mt-2 inline-block bg-slate-900 text-white px-4 py-1 rounded text-sm font-bold uppercase tracking-wider">
                  {activeTab === "income" ? "Credit Voucher" : "Debit Voucher"}
                </div>
              </div>

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p><span className="font-medium text-slate-500">Date:</span> <span className="font-mono">{selectedVoucher.date}</span></p>
                  <p><span className="font-medium text-slate-500">Voucher No:</span> <span className="font-mono">{selectedVoucher.voucher}</span></p>
                </div>
                <div className="text-right">
                  <p><span className="font-medium text-slate-500">Account Category:</span> {selectedVoucher.category}</p>
                  {selectedVoucher.branch && <p><span className="font-medium text-slate-500">Branch:</span> {selectedVoucher.branch}</p>}
                </div>
              </div>

              {/* Table */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
                      <th className="py-3 px-4 text-sm font-medium border-r border-slate-200">Particulars</th>
                      <th className="py-3 px-4 text-sm font-medium text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200 h-24 items-start">
                      <td className="py-3 px-4 text-sm text-slate-700 align-top border-r border-slate-200">
                        {selectedVoucher.description}
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold text-slate-900 text-right align-top">
                        ৳{selectedVoucher.amount.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="py-3 px-4 text-sm font-bold text-slate-900 text-right border-r border-slate-200">Total</td>
                      <td className="py-3 px-4 text-sm font-bold text-slate-900 text-right">
                        ৳{selectedVoucher.amount.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Amount in words */}
              <div className="text-sm text-slate-600 italic">
                <span className="font-medium not-italic text-slate-700">Amount in Words:</span> Taka {selectedVoucher.amount.toLocaleString()} Only.
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-4 gap-4 pt-12 text-center text-xs text-slate-500">
                <div className="border-t border-slate-300 pt-2">Prepared By</div>
                <div className="border-t border-slate-300 pt-2">Checked By</div>
                <div className="border-t border-slate-300 pt-2">Approved By</div>
                <div className="border-t border-slate-300 pt-2">Received By</div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50">
              <button 
                onClick={() => setIsVoucherModalOpen(false)}
                className="px-4 py-2.5 border border-slate-200 rounded-lg font-medium text-slate-700 hover:bg-white transition-colors text-sm"
              >
                Close
              </button>
              <button 
                onClick={() => window.print()}
                className="px-4 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors text-sm shadow-sm flex items-center gap-2"
              >
                <FileText size={16} />
                Print Voucher
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
