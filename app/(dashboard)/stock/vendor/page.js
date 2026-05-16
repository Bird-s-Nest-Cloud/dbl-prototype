"use client";

import { useState } from "react";
import { Plus, Search, ChevronDown, X, Phone, MapPin, Package } from "lucide-react";

export default function VendorManagement() {
  const [selectedProject, setSelectedProject] = useState("Project Delta");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = ["Project Delta", "Project Alpha", "Project Sigma", "Project Omega"];

  const vendors = [
    { name: "Abul Khair Steel", material: "Rod", contact: "01711223344", status: "Active" },
    { name: "Lafarge Holcim", material: "Cement", contact: "01811223344", status: "Active" },
    { name: "Local Sand Supplier", material: "Sand", contact: "01911223344", status: "Active" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vendors</h1>
          <p className="text-slate-500 text-sm mt-1">Manage material vendors for your projects.</p>
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
            Add Vendor
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="py-4 px-6 text-sm font-medium">Vendor Name</th>
                <th className="py-4 px-6 text-sm font-medium">Primary Material</th>
                <th className="py-4 px-6 text-sm font-medium">Contact</th>
                <th className="py-4 px-6 text-sm font-medium">Status</th>
                <th className="py-4 px-6 text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((item, index) => (
                <tr 
                  key={item.name} 
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50"
                  } hover:bg-slate-100 transition-colors`}
                >
                  <td className="py-4 px-6 text-sm font-medium text-slate-900">{item.name}</td>
                  <td className="py-4 px-6 text-sm text-slate-500">{item.material}</td>
                  <td className="py-4 px-6 text-sm text-slate-700 font-mono">{item.contact}</td>
                  <td className="py-4 px-6 text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <button className="text-amber-600 hover:text-amber-700 font-medium text-sm">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Vendor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Add New Vendor</h2>
                <p className="text-slate-500 text-sm mt-0.5">Add a new supplier to the system.</p>
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
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Vendor Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Abul Khair Steel"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Primary Material *</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Rod, Cement, Sand"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                    <Package size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Contact Number *</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 01711223344"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                    <Phone size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Address</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Uttara, Dhaka"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                    <MapPin size={16} />
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
                Save Vendor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
