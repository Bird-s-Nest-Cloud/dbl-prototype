"use client";

import { useState } from "react";
import { Plus, Search, Check, ChevronDown, Calendar, HardHat, X, User, Briefcase, FileText, Phone, Mail } from "lucide-react";

export default function HRMLabourLog() {
  const [activeTab, setActiveTab] = useState("employees");
  const [selectedProject, setSelectedProject] = useState("Project Delta");
  const [labourCount, setLabourCount] = useState("");
  const [wageRate, setWageRate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = ["Project Delta", "Project Alpha", "Project Sigma", "Project Omega"];

  const employeeProfiles = [
    { id: 1, name: "Ahmed Ali", designation: "Project Manager", phone: "01711000001", email: "ahmed@dbl.com", joinDate: "2024-01-15" },
    { id: 2, name: "Rahim Uddin", designation: "Site Engineer", phone: "01711000002", email: "rahim@dbl.com", joinDate: "2024-03-01" },
    { id: 3, name: "Karim Khan", designation: "Accountant", phone: "01711000003", email: "karim@dbl.com", joinDate: "2023-11-10" },
    { id: 4, name: "Fatima Begum", designation: "HR Officer", phone: "01711000004", email: "fatima@dbl.com", joinDate: "2025-01-01" },
    { id: 5, name: "Solomon Mia", designation: "Store Keeper", phone: "01711000005", email: "solomon@dbl.com", joinDate: "2024-06-15" },
  ];

  const staffPayrollData = [
    { id: 1, name: "Ahmed Ali", designation: "Project Manager", basic: 50000, bonus: 5000, deduction: 0, net: 55000, status: "Paid", month: "May 2026" },
    { id: 2, name: "Rahim Uddin", designation: "Site Engineer", basic: 35000, bonus: 0, deduction: 1000, net: 34000, status: "Pending", month: "May 2026" },
    { id: 3, name: "Karim Khan", designation: "Accountant", basic: 30000, bonus: 2000, deduction: 0, net: 32000, status: "Paid", month: "May 2026" },
    { id: 4, name: "Fatima Begum", designation: "HR Officer", basic: 28000, bonus: 0, deduction: 0, net: 28000, status: "Pending", month: "May 2026" },
    { id: 5, name: "Solomon Mia", designation: "Store Keeper", basic: 20000, bonus: 0, deduction: 500, net: 19500, status: "Pending", month: "May 2026" },
  ];

  const labourHistory = [
    { date: "2026-05-15", project: "Project Delta", count: 25, rate: 20, total: 500 },
    { date: "2026-05-14", project: "Project Alpha", count: 30, rate: 22, total: 660 },
    { date: "2026-05-14", project: "Project Delta", count: 20, rate: 20, total: 400 },
    { date: "2026-05-13", project: "Project Sigma", count: 15, rate: 18, total: 270 },
  ];

  const totalAutoCalculated = (labourCount && wageRate) ? labourCount * wageRate : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">HRM & Payroll</h1>
        <p className="text-slate-500 text-sm mt-1">Manage employees, monthly salaries, and daily labour records.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg w-full md:w-auto overflow-x-auto inline-flex">
        <button
          onClick={() => setActiveTab("employees")}
          className={`px-4 py-2.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTab === "employees"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Employee List
        </button>
        <button
          onClick={() => setActiveTab("payroll")}
          className={`px-4 py-2.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTab === "payroll"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Monthly Salary (Payroll)
        </button>
        <button
          onClick={() => setActiveTab("labour")}
          className={`px-4 py-2.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTab === "labour"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Daily Labour Log
        </button>
      </div>

      {/* Content for Employee List */}
      {activeTab === "employees" && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search employees..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Search size={16} />
              </div>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-amber-500 text-slate-900 px-4 py-2.5 rounded-lg font-medium hover:bg-amber-600 transition-colors text-sm flex items-center gap-2"
            >
              <Plus size={16} /> Add Employee
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-4 px-6 text-sm font-medium">Name</th>
                  <th className="py-4 px-6 text-sm font-medium">Designation</th>
                  <th className="py-4 px-6 text-sm font-medium">Contact</th>
                  <th className="py-4 px-6 text-sm font-medium">Join Date</th>
                  <th className="py-4 px-6 text-sm font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {employeeProfiles.map((emp, index) => (
                  <tr 
                    key={emp.id} 
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    } hover:bg-slate-100 transition-colors`}
                  >
                    <td className="py-4 px-6 text-sm font-medium text-slate-900">{emp.name}</td>
                    <td className="py-4 px-6 text-sm text-slate-500">{emp.designation}</td>
                    <td className="py-4 px-6 text-sm text-slate-700">
                      <div className="flex flex-col gap-0.5">
                        <span className="flex items-center gap-1 font-mono"><Phone size={12} className="text-slate-400" /> {emp.phone}</span>
                        <span className="flex items-center gap-1 text-xs text-slate-500"><Mail size={12} className="text-slate-400" /> {emp.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-500 font-mono">{emp.joinDate}</td>
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
      )}

      {/* Content for Monthly Salary (Payroll) */}
      {activeTab === "payroll" && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search payroll..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Search size={16} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-slate-200 rounded-lg py-2 pl-4 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer"
                >
                  <option value="May 2026">May 2026</option>
                  <option value="April 2026">April 2026</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-4 px-6 text-sm font-medium">Employee</th>
                  <th className="py-4 px-6 text-sm font-medium">Basic</th>
                  <th className="py-4 px-6 text-sm font-medium">Bonus</th>
                  <th className="py-4 px-6 text-sm font-medium">Deduction</th>
                  <th className="py-4 px-6 text-sm font-medium">Net Payable</th>
                  <th className="py-4 px-6 text-sm font-medium">Status</th>
                  <th className="py-4 px-6 text-sm font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {staffPayrollData.map((staff, index) => (
                  <tr 
                    key={staff.id} 
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    } hover:bg-slate-100 transition-colors`}
                  >
                    <td className="py-4 px-6 text-sm">
                      <div className="font-medium text-slate-900">{staff.name}</div>
                      <div className="text-slate-500 text-xs">{staff.designation}</div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-700">৳{staff.basic.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-emerald-600">+৳{staff.bonus.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-red-600">-৳{staff.deduction.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm font-bold text-slate-900">৳{staff.net.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        staff.status === "Paid" 
                          ? "bg-emerald-100 text-emerald-700" 
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {staff.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm">
                      {staff.status === "Pending" ? (
                        <button className="bg-amber-500 text-slate-900 px-3 py-1.5 rounded-md font-medium hover:bg-amber-600 transition-colors text-xs flex items-center gap-1">
                          <Check size={14} />
                          Pay Now
                        </button>
                      ) : (
                        <button className="text-slate-500 hover:text-slate-700 font-medium text-xs flex items-center gap-1">
                          <FileText size={14} />
                          Slip
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Content for Daily Labour Log */}
      {activeTab === "labour" && (
        <div className="space-y-6">
          {/* Quick Entry Form */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <HardHat size={20} className="text-amber-500" />
              Daily Labour Entry
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Project</label>
                <div className="relative">
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer"
                  >
                    {projects.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Number of Labours</label>
                <input
                  type="number"
                  value={labourCount}
                  onChange={(e) => setLabourCount(e.target.value)}
                  placeholder="e.g. 25"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Daily Wage Rate (৳)</label>
                <input
                  type="number"
                  value={wageRate}
                  onChange={(e) => setWageRate(e.target.value)}
                  placeholder="e.g. 20"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Total Auto-Calculated</label>
                  <div className="bg-slate-100 border border-slate-200 rounded-lg py-2.5 px-4 text-sm font-bold text-slate-900">
                    ৳{totalAutoCalculated.toLocaleString()}
                  </div>
                </div>
                <button className="bg-amber-500 text-slate-900 px-6 py-2.5 rounded-lg font-medium hover:bg-amber-600 transition-colors shadow-sm self-end">
                  Save Entry
                </button>
              </div>
            </div>
          </div>

          {/* History Table */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Labour Log History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="py-4 px-6 text-sm font-medium">Date</th>
                    <th className="py-4 px-6 text-sm font-medium">Project</th>
                    <th className="py-4 px-6 text-sm font-medium">No. of Labour</th>
                    <th className="py-4 px-6 text-sm font-medium">Wage Rate</th>
                    <th className="py-4 px-6 text-sm font-medium">Total Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {labourHistory.map((log, index) => (
                    <tr 
                      key={index} 
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-slate-50"
                      } hover:bg-slate-100 transition-colors`}
                    >
                      <td className="py-4 px-6 text-sm text-slate-500 font-mono flex items-center gap-2">
                        <Calendar size={14} className="text-slate-400" />
                        {log.date}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-slate-900">{log.project}</td>
                      <td className="py-4 px-6 text-sm text-slate-700">{log.count}</td>
                      <td className="py-4 px-6 text-sm text-slate-700">৳{log.rate.toLocaleString()}</td>
                      <td className="py-4 px-6 text-sm font-semibold text-amber-600">৳{log.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Create Employee Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Add New Employee</h2>
                <p className="text-slate-500 text-sm mt-0.5">Add a new staff member to payroll.</p>
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
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Rahim Uddin"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                    <User size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Designation *</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="Project Manager">Project Manager</option>
                    <option value="Site Engineer">Site Engineer</option>
                    <option value="Accountant">Accountant</option>
                    <option value="HR Officer">HR Officer</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Base Salary (৳) *</label>
                <input
                  type="number"
                  placeholder="e.g. 50000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Join Date</label>
                <input
                  type="date"
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
                Save Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
