"use client";

import { useState } from "react";
import { Plus, Search, ChevronDown, Calendar, Briefcase, MapPin, DollarSign, X } from "lucide-react";

export default function ProjectsManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    { name: "Project Delta", location: "Dhaka", budget: 500000, progress: 70, status: "On Track" },
    { name: "Project Alpha", location: "Chittagong", budget: 800000, progress: 95, status: "Warning" },
    { name: "Project Sigma", location: "Sylhet", budget: 300000, progress: 50, status: "On Track" },
    { name: "Project Omega", location: "Khulna", budget: 1200000, progress: 30, status: "On Track" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and monitor all your construction projects.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-amber-500 text-slate-900 px-4 py-2.5 rounded-lg font-medium hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus size={18} />
          Create Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.name} className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                <Briefcase size={20} />
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                project.status === "On Track" ? "bg-emerald-100 text-emerald-700" :
                project.status === "Warning" ? "bg-amber-100 text-amber-700" :
                "bg-red-100 text-red-700"
              }`}>
                {project.status}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900">{project.name}</h3>
            
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin size={14} />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="font-medium text-slate-700">Budget:</span>
                <span>৳{project.budget.toLocaleString()}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-500">Progress</span>
                <span className="text-slate-700">{project.progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    project.progress > 90 ? "bg-amber-500" : "bg-emerald-500"
                  } rounded-full`} 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Create New Project</h2>
                <p className="text-slate-500 text-sm mt-0.5">Fill in the details to start a new project.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-500 hover:bg-slate-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto flex-1">
              <form className="space-y-5">
                {/* Project Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Project Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. DBL Golden Tower"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                {/* Grid for Location and Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Location *</label>
                    <input
                      type="text"
                      placeholder="e.g. Gulshan, Dhaka"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Estimated Budget (৳) *</label>
                    <input
                      type="number"
                      placeholder="e.g. 5000000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Grid for Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Start Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Expected End Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Branch Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Assign to Branch *</label>
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

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Project Description</label>
                  <textarea
                    rows="3"
                    placeholder="Briefly describe the project scope..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  ></textarea>
                </div>
              </form>
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
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
