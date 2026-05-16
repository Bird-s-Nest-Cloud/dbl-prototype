"use client";

import { useState } from "react";
import { Plus, Search, ChevronDown, FileText, Image, File, Archive, Upload, X, Filter, Trash2, Download, Folder, FolderOpen, ArrowLeft } from "lucide-react";

export default function DocumentManagement() {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedUploadProject, setSelectedUploadProject] = useState("Others");

  const folders = ["Project Delta", "Project Alpha", "Project Sigma", "Project Omega", "Others"];

  const files = [
    { name: "Project_Layout.pdf", type: "pdf", size: "2.5 MB", date: "2026-05-15", folder: "Project Delta" },
    { name: "Budget_Spreadsheet.xlsx", type: "excel", size: "1.2 MB", date: "2026-05-14", folder: "Project Alpha" },
    { name: "Site_Photo_1.jpg", type: "image", size: "4.5 MB", date: "2026-05-14", folder: "Project Delta" },
    { name: "Vendor_Agreements.zip", type: "zip", size: "15.0 MB", date: "2026-05-12", folder: "Project Sigma" },
    { name: "Material_Specs.pdf", type: "pdf", size: "1.8 MB", date: "2026-05-10", folder: "Project Omega" },
    { name: "Company_Policy.pdf", type: "pdf", size: "500 KB", date: "2026-05-01", folder: "Others" },
    { name: "Logo_Asset.png", type: "image", size: "1.1 MB", date: "2026-05-02", folder: "Others" },
  ];

  const filteredFiles = selectedFolder 
    ? files.filter(f => f.folder === selectedFolder)
    : [];

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf": return <FileText className="text-red-500" size={24} />;
      case "excel": return <File className="text-emerald-500" size={24} />;
      case "image": return <Image className="text-blue-500" size={24} />;
      case "zip": return <Archive className="text-amber-500" size={24} />;
      default: return <File className="text-slate-500" size={24} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Project Documents</h1>
          <p className="text-slate-500 text-sm mt-1">Manage files and documents by project folders.</p>
        </div>
        
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-amber-500 text-slate-900 px-4 py-2.5 rounded-lg font-medium hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Upload size={18} />
          Upload Document
        </button>
      </div>

      {/* Breadcrumb / Back Button */}
      {selectedFolder && (
        <button 
          onClick={() => setSelectedFolder(null)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Folders
        </button>
      )}

      {/* Main Content Area */}
      {!selectedFolder ? (
        /* Folder Grid View */
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {folders.map((folder) => {
            const fileCount = files.filter(f => f.folder === folder).length;
            return (
              <button
                key={folder}
                onClick={() => setSelectedFolder(folder)}
                className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:border-amber-500 hover:shadow-md transition-all flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                  <Folder size={32} />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{folder}</h3>
                <p className="text-xs text-slate-500">{fileCount} Files</p>
              </button>
            );
          })}
        </div>
      ) : (
        /* File List View for Selected Folder */
        <div className="space-y-6">
          {/* Drag & Drop Area Specific to Folder */}
          <div className="bg-white p-6 rounded-xl border-2 border-dashed border-slate-200 hover:border-amber-500 transition-colors cursor-pointer group">
            <div className="flex flex-col items-center justify-center py-4">
              <Upload size={24} className="text-slate-400 group-hover:text-amber-500 transition-colors mb-2" />
              <h2 className="text-sm font-bold text-slate-900 mb-1">Drop files here to upload to {selectedFolder}</h2>
              <p className="text-slate-500 text-xs">Max size 50MB</p>
            </div>
          </div>

          {/* File Table */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FolderOpen size={20} className="text-amber-500" />
                {selectedFolder}
              </h2>
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search in this folder..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 pl-10 pr-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Search size={14} />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="py-3 px-6 text-sm font-medium">File Name</th>
                    <th className="py-3 px-6 text-sm font-medium">Size</th>
                    <th className="py-3 px-6 text-sm font-medium">Upload Date</th>
                    <th className="py-3 px-6 text-sm font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.length > 0 ? (
                    filteredFiles.map((file, index) => (
                      <tr 
                        key={index} 
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-slate-50"
                        } hover:bg-slate-100 transition-colors`}
                      >
                        <td className="py-3 px-6 text-sm font-medium text-slate-900 flex items-center gap-3">
                          {getFileIcon(file.type)}
                          <span>{file.name}</span>
                        </td>
                        <td className="py-3 px-6 text-sm text-slate-500">{file.size}</td>
                        <td className="py-3 px-6 text-sm text-slate-500 font-mono">{file.date}</td>
                        <td className="py-3 px-6 text-sm">
                          <div className="flex items-center gap-3">
                            <button className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center gap-1">
                              <Download size={14} />
                              Download
                            </button>
                            <button className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center gap-1">
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-slate-500 text-sm">
                        No files in this folder yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Global Upload Modal (Asks for Folder) */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Upload Document</h2>
                <p className="text-slate-500 text-sm mt-0.5">Select a folder to upload your file.</p>
              </div>
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="text-slate-400 hover:text-slate-500 hover:bg-slate-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Target Folder *</label>
                <div className="relative">
                  <select
                    value={selectedUploadProject}
                    onChange={(e) => setSelectedUploadProject(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer"
                  >
                    {folders.map((folder) => (
                      <option key={folder} value={folder}>{folder}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              {/* Upload Area inside Modal */}
              <div className="bg-slate-50 p-6 rounded-xl border-2 border-dashed border-slate-200 hover:border-amber-500 transition-colors cursor-pointer text-center group">
                <Upload size={32} className="text-slate-400 group-hover:text-amber-500 transition-colors mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-900">Choose file or drag here</p>
                <p className="text-xs text-slate-500 mt-1">PDF, Excel, Image, Zip (Max 50MB)</p>
                <input type="file" className="hidden" />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50">
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-2.5 border border-slate-200 rounded-lg font-medium text-slate-700 hover:bg-white transition-colors text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-2.5 bg-amber-500 text-slate-900 rounded-lg font-medium hover:bg-amber-600 transition-colors text-sm shadow-sm flex items-center gap-2"
              >
                <Upload size={16} />
                Upload to {selectedUploadProject}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
