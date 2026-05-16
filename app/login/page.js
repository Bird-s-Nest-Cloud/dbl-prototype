"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, ChevronDown, Building } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Side: Image & Brand */}
      <div className="relative md:w-1/2 lg:w-3/5 bg-slate-900 hidden md:block">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/login_bg.png"
            alt="Construction Site"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded flex items-center justify-center font-bold text-slate-900 text-xl">
              DBL
            </div>
            <span className="font-bold text-2xl tracking-tight">DBL Builders</span>
          </div>
          
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Building the Future, <span className="text-amber-500">Restoring the Past.</span>
            </h1>
            <p className="text-slate-300 text-lg">
              Access the central management system for DBL Builders Limited. Manage projects, inventory, accounts, and human resources across all branches.
            </p>
          </div>
          
          <div className="text-sm text-slate-400">
            © 2026 DBL Builders Limited. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 lg:p-24 bg-slate-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-8 md:hidden justify-center">
            <div className="w-10 h-10 bg-amber-500 rounded flex items-center justify-center font-bold text-slate-900 text-xl">
              DBL
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-900">DBL Builders</span>
          </div>

          <div className="text-center md:text-left mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
            <p className="text-slate-500 mt-2">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email/Username */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email or Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <Mail size={18} />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <Lock size={18} />
                </div>
              </div>
            </div>

            {/* Branch Access */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Branch Access
              </label>
              <div className="relative">
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-12 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none cursor-pointer text-slate-700"
                  required
                >
                  <option value="" disabled>Select Branch</option>
                  <option value="Branch A">Branch A</option>
                  <option value="Branch B">Branch B</option>
                </select>
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <Building size={18} />
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm font-medium text-amber-600 hover:text-amber-700">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-slate-900 text-white rounded-lg py-3 font-medium hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            Need help? Contact system administrator at <a href="mailto:support@dbl.com" className="text-amber-600 font-medium">support@dbl.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}
