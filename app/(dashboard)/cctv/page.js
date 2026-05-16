"use client";

import { useState } from "react";
import { Video, Wifi, WifiOff, Link as LinkIcon, Plus, X, Camera, MapPin, ChevronDown } from "lucide-react";

export default function CCTVManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cctvFeeds, setCctvFeeds] = useState([
    { id: 1, name: "Branch A - Gate 1 Cam", stream: "rtsp://192.168.1.100/stream1", status: "online", location: "Branch A" },
    { id: 2, name: "Project Delta - Material Yard", stream: "rtsp://192.168.2.150/stream1", status: "online", location: "Project Delta" },
    { id: 3, name: "Branch B - Office", stream: "rtsp://192.168.3.100/stream2", status: "offline", location: "Branch B" },
    { id: 4, name: "Project Alpha - Site Entrance", stream: "rtsp://192.168.4.200/stream1", status: "online", location: "Project Alpha" },
  ]);

  const updateStream = (id, newStream) => {
    setCctvFeeds(feeds => feeds.map(f => f.id === id ? { ...f, stream: newStream } : f));
  };

  const projects = ["Project Delta", "Project Alpha", "Project Sigma", "Project Omega", "Branch A", "Branch B"];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Live CCTV Hub</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and monitor live security feeds across projects and branches.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-amber-500 text-slate-900 px-4 py-2.5 rounded-lg font-medium hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus size={18} />
          Add Camera
        </button>
      </div>

      {/* CCTV Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cctvFeeds.map((feed) => (
          <div key={feed.id} className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Video Placeholder */}
            <div className="relative h-48 bg-slate-900 flex items-center justify-center text-slate-600">
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/60 px-2.5 py-1 rounded-md">
                {feed.status === "online" ? (
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                ) : (
                  <span className="w-2 h-2 bg-slate-500 rounded-full"></span>
                )}
                <span className="text-xs text-white font-medium">{feed.name}</span>
              </div>
              
              <div className="absolute top-3 right-3 bg-black/60 px-2 py-1 rounded-md text-xs text-slate-300 flex items-center gap-1">
                <MapPin size={12} />
                {feed.location}
              </div>
              
              {feed.status === "online" ? (
                <div className="flex flex-col items-center gap-2">
                  <Wifi size={32} className="text-slate-700" />
                  <span className="text-xs font-medium text-slate-600 font-mono">LIVE</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <WifiOff size={32} className="text-slate-700" />
                  <span className="text-xs font-medium text-slate-600">OFFLINE</span>
                </div>
              )}
            </div>

            {/* Stream Controls */}
            <div className="p-4 bg-white">
              <label className="block text-xs font-medium text-slate-500 mb-1.5">RTSP Stream URL</label>
              <div className="relative">
                <input
                  type="text"
                  value={feed.stream}
                  onChange={(e) => updateStream(feed.id, e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-mono text-slate-700"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <LinkIcon size={14} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Camera Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Add New CCTV Camera</h2>
                <p className="text-slate-500 text-sm mt-0.5">Configure a new live stream feed.</p>
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
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Camera Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Project Delta - Gate 1"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                    <Camera size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">RTSP / Stream URL *</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="rtsp://username:password@ip:port/stream"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-mono"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                    <LinkIcon size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Location / Project *</label>
                <div className="relative">
                  <select
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
                Save Camera
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
