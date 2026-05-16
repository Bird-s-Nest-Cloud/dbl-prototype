"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Boxes,
  Calculator,
  Users,
  Building,
  Video,
  Globe,
  ChevronDown,
  Bell,
  User,
  LogOut,
  Search,
  Settings,
  Briefcase,
  FileText
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { 
    name: "Stock Management", 
    icon: Boxes,
    children: [
      { name: "Vendor", href: "/stock/vendor" },
      { name: "Product", href: "/stock/product" },
      { name: "Stock In", href: "/stock/in" },
      { name: "Stock Status", href: "/stock/status" },
      { name: "Stock Out", href: "/stock/out" },
      { name: "Product Transfer", href: "/stock/transfer" },
    ]
  },
  { name: "Project Accounts", href: "/accounts", icon: Calculator },
  { name: "HRM & Labour Log", href: "/hrm", icon: Users },
  { name: "Property & Installments", href: "/property", icon: Building },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Site Media & CCTV", href: "/cctv", icon: Video },
  { name: "Website Preview", href: "/preview", icon: Globe },
  { 
    name: "Settings", 
    icon: Settings,
    children: [
      { name: "Branch", href: "/settings/branch" },
      { name: "Designation", href: "/settings/designation" },
      { name: "Role", href: "/settings/role" },
    ]
  },
];

export default function LayoutWrapper({ children }) {
  // Set default to true so it's open on PC by default
  const [sidebarOpen, setSidebarOpen] = useState(true); 
  const [activeBranch, setActiveBranch] = useState("Branch A");
  const [timestamp, setTimestamp] = useState("");
  const [openMenus, setOpenMenus] = useState({});
  const pathname = usePathname();

  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      setTimestamp(now.toLocaleString());
    };
    updateTimestamp();
    const interval = setInterval(updateTimestamp, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check screen size on mount to close sidebar on mobile
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, []);

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`bg-slate-900 text-white flex flex-col fixed inset-y-0 z-50 transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 
          ${sidebarOpen ? "w-64" : "md:w-20 w-64"}
        `}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center font-bold text-slate-900">
              DBL
            </div>
            <span className={`font-semibold text-lg overflow-hidden whitespace-nowrap transition-all duration-300 ${
              !sidebarOpen ? "md:hidden" : "block"
            }`}>
              DBL Builders
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 overflow-y-auto py-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {navigation.map((item) => {
            const Icon = item.icon;
            const hasChildren = item.children && item.children.length > 0;
            const isMenuOpen = openMenus[item.name] || false;
            
            // Check if any child is active
            const isChildActive = hasChildren && item.children.some(child => pathname === child.href);
            const isParentActive = pathname === item.href || isChildActive;

            return (
              <div key={item.name}>
                {hasChildren ? (
                  <div>
                    <button
                      onClick={() => setOpenMenus(prev => ({ ...prev, [item.name]: !isMenuOpen }))}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                        isParentActive ? "bg-amber-500 text-slate-900" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={20} />
                        <span className={`transition-all duration-300 ${!sidebarOpen ? "md:hidden" : "block"}`}>
                          {item.name}
                        </span>
                      </div>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""} ${!sidebarOpen ? "md:hidden" : "block"}`} 
                      />
                    </button>
                    
                    {/* Submenu */}
                    {isMenuOpen && (sidebarOpen || typeof window !== "undefined" && window.innerWidth < 768) && (
                      <div className="bg-slate-800/50 py-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`flex items-center pl-12 pr-4 py-2 text-sm font-medium transition-colors ${
                              pathname === child.href
                                ? "text-amber-500"
                                : "text-slate-400 hover:text-white hover:bg-slate-800"
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? "bg-amber-500 text-slate-900"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />
                      <span className={`transition-all duration-300 ${!sidebarOpen ? "md:hidden" : "block"}`}>
                        {item.name}
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center font-bold text-white">
              S
            </div>
            <div className={`flex-1 min-w-0 transition-all duration-300 ${!sidebarOpen ? "md:hidden" : "block"}`}>
              <p className="font-medium text-sm truncate">Super Admin</p>
              <p className="text-xs text-slate-400 truncate">admin@dbl.com</p>
            </div>
            <button className={`text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 ${!sidebarOpen ? "md:hidden" : "block"}`}>
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ease-in-out flex-1 flex flex-col min-h-screen min-w-0
          ${sidebarOpen ? "md:ml-64" : "md:ml-20"} 
          ml-0
        `}
      >
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-slate-50 text-slate-500 md:hidden"
            >
              <Menu size={24} />
            </button>

            {/* Branch Indicator */}
            <div className="relative">
              <select
                value={activeBranch}
                onChange={(e) => setActiveBranch(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2 pl-4 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer"
              >
                <option value="Branch A">Branch A</option>
                <option value="Branch B">Branch B</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                <ChevronDown size={16} />
              </div>
            </div>

            {/* Timestamp */}
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 font-mono">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              {timestamp}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className="bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-64"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Search size={16} />
              </div>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center font-bold text-slate-900 text-sm">
                A
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-slate-900">Admin</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 flex-1 bg-slate-50 min-w-0">{children}</main>
      </div>
    </div>
  );
}
