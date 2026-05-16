"use client";

import { useState } from "react";
import { Plus, Search, Filter, Download, ChevronDown } from "lucide-react";

export default function StockManagement() {
  const [selectedProject, setSelectedProject] = useState("Project Delta");

  const projects = ["Project Delta", "Project Alpha", "Project Sigma", "Project Omega"];

  const stockData = [
    { name: "Rod 16mm", unit: "Tons", received: 50, consumed: 35, balance: 15 },
    { name: "Cement", unit: "Bags", received: 1000, consumed: 850, balance: 150 },
    { name: "Sand", unit: "Cft", received: 5000, consumed: 4800, balance: 200 },
    { name: "Bricks", unit: "Pcs", received: 20000, consumed: 20000, balance: 0 },
    { name: "Stone Chips", unit: "Cft", received: 3000, consumed: 1500, balance: 1500 },
    { name: "Paint", unit: "Liters", received: 500, consumed: 450, balance: 50 },
    { name: "Tiles", unit: "Sqft", received: 10000, consumed: 9500, balance: 500 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Stock & Inventory</h1>
          <p className="text-slate-500 text-sm mt-1">Manage material inventory for your projects.</p>
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

          <button className="bg-amber-500 text-slate-900 px-4 py-2.5 rounded-lg font-medium hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-sm">
            <Plus size={18} />
            Add Material Entry
          </button>
        </div>
      </div>

      {/* Controls & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search materials..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search size={16} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-slate-700 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Filter size={16} />
            Filters
          </button>
          <button className="text-slate-700 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="py-4 px-6 text-sm font-medium">Material Name</th>
                <th className="py-4 px-6 text-sm font-medium">Unit</th>
                <th className="py-4 px-6 text-sm font-medium">Received Qty</th>
                <th className="py-4 px-6 text-sm font-medium">Consumed Qty</th>
                <th className="py-4 px-6 text-sm font-medium">Real-time Balance</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((item, index) => (
                <tr 
                  key={item.name} 
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50"
                  } hover:bg-slate-100 transition-colors`}
                >
                  <td className="py-4 px-6 text-sm font-medium text-slate-900">{item.name}</td>
                  <td className="py-4 px-6 text-sm text-slate-500">{item.unit}</td>
                  <td className="py-4 px-6 text-sm text-slate-700">{item.received.toLocaleString()}</td>
                  <td className="py-4 px-6 text-sm text-slate-700">{item.consumed.toLocaleString()}</td>
                  <td className="py-4 px-6 text-sm font-semibold">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.balance === 0 
                        ? "bg-red-100 text-red-700" 
                        : item.balance < 100 
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                    }`}>
                      {item.balance.toLocaleString()} {item.unit}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
