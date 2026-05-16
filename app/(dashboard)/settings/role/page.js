"use client";

import { useState } from "react";
import { Plus, Search, ChevronDown, X, Shield, Lock } from "lucide-react";

export default function RoleSettings() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const roles = [
    { name: "Super Admin", permissions: "All Access", status: "Active" },
    { name: "Project Manager", permissions: "Project Specific", status: "Active" },
    { name: "Accountant", permissions: "Accounts Only", status: "Active" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Role Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Manage user roles and permissions.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-amber-500 text-slate-900 px-4 py-2.5 rounded-lg font-medium hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus size={18} />
          Add Role
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="py-4 px-6 text-sm font-medium">Role Name</th>
                <th className="py-4 px-6 text-sm font-medium">Permissions</th>
                <th className="py-4 px-6 text-sm font-medium">Status</th>
                <th className="py-4 px-6 text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((item, index) => (
                <tr 
                  key={item.name} 
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50"
                  } hover:bg-slate-100 transition-colors`}
                >
                  <td className="py-4 px-6 text-sm font-medium text-slate-900">{item.name}</td>
                  <td className="py-4 px-6 text-sm text-slate-500">{item.permissions}</td>
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

      {/* Create Role Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Add New Role</h2>
                <p className="text-slate-500 text-sm mt-0.5">Create a new user access role.</p>
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
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Role Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Site Supervisor"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                    <Shield size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Permission Level *</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="All Access">All Access</option>
                    <option value="Project Specific">Project Specific</option>
                    <option value="Accounts Only">Accounts Only</option>
                    <option value="View Only">View Only</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                    <ChevronDown size={16} />
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
                Save Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
