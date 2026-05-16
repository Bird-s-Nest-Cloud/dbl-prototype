"use client";

import { Globe, ExternalLink, Smartphone, Tablet, Monitor, Building } from "lucide-react";
import { useState } from "react";

export default function WebsitePreview() {
  const [device, setDevice] = useState("desktop");

  return (
    <div className="space-y-6 h-[calc(100vh-120px)] flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Public Website Preview</h1>
          <p className="text-slate-500 text-sm mt-1">Preview how your public website looks to visitors.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setDevice("mobile")}
              className={`p-2 rounded-md ${device === "mobile" ? "bg-white shadow-sm text-slate-900" : "text-slate-500"}`}
            >
              <Smartphone size={18} />
            </button>
            <button
              onClick={() => setDevice("tablet")}
              className={`p-2 rounded-md ${device === "tablet" ? "bg-white shadow-sm text-slate-900" : "text-slate-500"}`}
            >
              <Tablet size={18} />
            </button>
            <button
              onClick={() => setDevice("desktop")}
              className={`p-2 rounded-md ${device === "desktop" ? "bg-white shadow-sm text-slate-900" : "text-slate-500"}`}
            >
              <Monitor size={18} />
            </button>
          </div>

          <button className="bg-amber-500 text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-sm text-sm">
            <ExternalLink size={16} />
            Open Live Site
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center p-6">
        <div 
          className={`bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-300 flex flex-col ${
            device === "mobile" ? "w-[375px] h-[667px]" :
            device === "tablet" ? "w-[768px] h-[1024px] max-h-full" :
            "w-full h-full"
          }`}
        >
          {/* Browser Chrome */}
          <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 bg-red-400 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              <span className="w-3 h-3 bg-emerald-400 rounded-full"></span>
            </div>
            <div className="flex-1 max-w-md mx-auto bg-white border border-slate-200 rounded-full py-1 px-4 text-xs text-slate-500 flex items-center gap-2">
              <Globe size={12} className="text-slate-400" />
              <span>www.dblbuilders.com</span>
            </div>
          </div>

          {/* Website Content Mock */}
          <div className="flex-1 overflow-y-auto bg-white">
            {/* Hero Section */}
            <div className="bg-slate-900 text-white py-16 px-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[url('/login_bg.png')] bg-cover bg-center"></div>
              <div className="relative z-10">
                <span className="text-amber-500 text-sm font-bold uppercase tracking-wider">Premium Construction</span>
                <h2 className="text-3xl font-bold mt-2 mb-4">Shaping Skylines, Building Dreams</h2>
                <p className="text-slate-400 max-w-lg mx-auto text-sm">
                  We deliver world-class infrastructure and residential projects with uncompromising quality.
                </p>
                <button className="mt-6 bg-amber-500 text-slate-900 px-6 py-2 rounded-full font-medium text-sm hover:bg-amber-600 transition-colors">
                  Explore Projects
                </button>
              </div>
            </div>

            {/* Featured Projects */}
            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-slate-900">Featured Projects</h3>
                <p className="text-slate-500 text-xs mt-1">Our latest and greatest achievements</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-slate-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-40 bg-slate-200 flex items-center justify-center text-slate-400">
                    <Building size={32} />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-slate-900 text-sm">Project Delta Tower</h4>
                    <p className="text-xs text-slate-500 mt-1">Commercial Office Space • Completed 2025</p>
                  </div>
                </div>
                <div className="border border-slate-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-40 bg-slate-200 flex items-center justify-center text-slate-400">
                    <Building size={32} />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-slate-900 text-sm">Alpha Residential Complex</h4>
                    <p className="text-xs text-slate-500 mt-1">Luxury Apartments • Under Construction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
