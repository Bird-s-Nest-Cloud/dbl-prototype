"use client";

import { useState } from "react";
import { Plus, Search, ChevronDown, Calendar, X, Package, ClipboardList } from "lucide-react";

export default function StockOut() {
  const [selectedProject, setSelectedProject] = useState("Project Delta");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = ["Project Delta", "Project Alpha", "Project Sigma", "Project Omega"];

  const stockOutEntries = [
    { date: "2026-05-15", product: "Rod 16mm", qty: 2, unit: "Tons", purpose: "Pillar Construction" },
    { date: "2026-05-14", product: "Cement", qty: 50, unit: "Bags", purpose: "Roof Casting" },
    { date: "2026-05-13", product: "Sand", qty: 200, unit: "Cft", purpose: "Brick Work" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Stock Out</h1>
          <p className="text-slate-500 text-sm mt-1">Record materials consumed in your projects.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Project Selector */}
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

          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-amber-500 text-slate-900 px-4 py-2.5 rounded-lg font-medium hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus size={18} />
            New Stock Out
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="py-4 px-6 text-sm font-medium">Date</th>
                <th className="py-4 px-6 text-sm font-medium">Product</th>
                <th className="py-4 px-6 text-sm font-medium">Qty</th>
                <th className="py-4 px-6 text-sm font-medium">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {stockOutEntries.map((item, index) => (
                <tr 
                  key={index} 
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50"
                  } hover:bg-slate-100 transition-colors`}
                >
                  <td className="py-4 px-6 text-sm text-slate-500 font-mono flex items-center gap-2">
                    <Calendar size={14} className="text-slate-400" />
                    {item.date}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-slate-900">{item.product}</td>
                  <td className="py-4 px-6 text-sm text-slate-700 font-semibold">{item.qty} {item.unit}</td>
                  <td className="py-4 px-6 text-sm text-slate-500">{item.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Stock Out Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Record Stock Out</h2>
                <p className="text-slate-500 text-sm mt-0.5">Deduct materials from inventory for use.</p>
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
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Product *</label>
                  <div className="relative">
                    <select
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer"
                    >
                      <option value="Rod 16mm">Rod 16mm</option>
                      <option value="Cement">Cement</option>
                      <option value="Sand">Sand</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Quantity *</label>
                <input
                  type="number"
                  placeholder="e.g. 10"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Purpose/Location of Use</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 3rd Floor Slab Casting"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                    <ClipboardList size={16} />
                  </div>
                </div>
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
    </div>
  );
}
