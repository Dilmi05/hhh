import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FaUserPlus, FaGraduationCap, FaEnvelope, FaLock, FaUser, FaTimes, FaUserCheck } from "react-icons/fa";

export default function Register() {
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("Department of Information & Communication Technology");
  const [role, setRole] = useState("student");
  const [location, setLocation] = useState("Matara");
  const [loading, setLoading] = useState(false);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await register({
      name,
      email,
      password,
      department,
      role,
      location,
    });
    setLoading(false);
    if (res.success) {
      navigate("/opportunities");
    }
  };

  const handleGoogleAuthClick = () => {
    setGoogleModalOpen(true);
  };

  const executeGoogleLogin = async (selectedEmail, selectedName) => {
    setLoading(true);
    setGoogleModalOpen(false);
    const res = await googleLogin({
      email: selectedEmail,
      name: selectedName || selectedEmail.split("@")[0],
      googleId: "google_" + Date.now(),
      department: department || "Department of Information & Communication Technology",
    });
    setLoading(false);
    if (res.success) {
      navigate("/opportunities");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4">
      <div className="glass-panel w-full max-w-lg p-8 rounded-3xl border border-slate-200 bg-white shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-rose-700 via-rose-600 to-amber-500 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <FaGraduationCap className="w-8 h-8 text-amber-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-outfit">Create Faculty Account</h1>
          <p className="text-xs text-slate-500">Join OpportunityBridge • University of Ruhuna</p>
        </div>

        {/* Continue with Google Button */}
        <button
          type="button"
          onClick={handleGoogleAuthClick}
          disabled={loading}
          className="w-full py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 shadow-sm transition-all flex items-center justify-center space-x-3 font-outfit"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="bg-white px-3 text-[11px] font-mono text-slate-400 uppercase tracking-wider absolute">or</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <FaUser className="absolute left-3.5 top-3 text-slate-400 text-xs" />
              <input
                type="text"
                required
                placeholder="Kasun Perera"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white text-slate-900 pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-3 text-slate-400 text-xs" />
              <input
                type="email"
                required
                placeholder="name@fot.ruh.ac.lk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white text-slate-900 pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Password *
            </label>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-3 text-slate-400 text-xs" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white text-slate-900 pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-white text-slate-900 px-3 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none text-xs"
              >
                <option value="Department of Information & Communication Technology">Dept of ICT</option>
                <option value="Department of Engineering Technology">Dept of ET</option>
                <option value="Department of Biosystems Technology">Dept of BST</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Account Type
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-white text-slate-900 px-3 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none text-xs"
              >
                <option value="student">Student</option>
                <option value="provider">Opportunity Provider</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all font-outfit flex items-center justify-center space-x-2"
          >
            <FaUserPlus />
            <span>{loading ? "Creating Account..." : "Register Account"}</span>
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Sign In here
          </Link>
        </div>

      </div>

      {/* GOOGLE OAUTH ACCOUNT SELECTOR MODAL */}
      {googleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-slate-200 bg-white space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <h3 className="text-lg font-bold text-slate-900 font-outfit">Sign up with Google</h3>
              </div>
              <button onClick={() => setGoogleModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <FaTimes />
              </button>
            </div>

            <p className="text-xs text-slate-600">Select a Google Account to register on OpportunityBridge:</p>

            {/* Quick Google Profiles */}
            <div className="space-y-2">
              <button
                onClick={() => executeGoogleLogin("student.google@fot.ruh.ac.lk", "Kasun Perera (Google)")}
                className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 flex items-center justify-between text-left transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                    K
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Kasun Perera</p>
                    <p className="text-[11px] text-slate-500 font-mono">student.google@fot.ruh.ac.lk</p>
                  </div>
                </div>
                <FaUserCheck className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => executeGoogleLogin("nimal.tech@gmail.com", "Nimal Silva")}
                className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 flex items-center justify-between text-left transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                    N
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Nimal Silva</p>
                    <p className="text-[11px] text-slate-500 font-mono">nimal.tech@gmail.com</p>
                  </div>
                </div>
                <FaUserCheck className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            {/* Custom Google Email Entry */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Or enter another Google Email:
              </label>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="your.email@gmail.com"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                  className="flex-1 bg-white text-slate-900 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => {
                    if (!customGoogleEmail.trim()) {
                      toast.error("Please enter a valid Google email");
                      return;
                    }
                    executeGoogleLogin(customGoogleEmail.trim(), customGoogleEmail.split("@")[0]);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl font-outfit"
                >
                  Register
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
