import { useState } from "react";
import {useAuthStore} from "../store/useAuthStore.js";

export default function SignUpPage({switchToLogin }){
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const {signUp, isSigningUp} = useAuthStore();

    // Validate form values
    const validateForm = () => {
        if (!formData.fullName || !formData.email|| !formData.password ){
            console.log("Fields Required");
            return false
        }

        if (formData.password != formData.confirmPassword){
            console.log("Password don't match");
            return false
        }

        return true
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const payload = {
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
        };

        console.log(payload);

        signUp(payload);
    };

    return(
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

            {/* Name */}
            <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 text-xs font-medium">Full Name</label>
                <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="John Doe"
                required
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 text-xs font-medium">Email</label>
                <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@company.com"
                required
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                />
            </div>

            {/* Password */}
            <div className="relative flex flex-col gap-1.5">
                <label className="text-slate-400 text-xs font-medium">Password</label>
                <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                required
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                    {showPassword ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                    ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    )}
                </button>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 text-xs font-medium">Confirm Password</label>
                <input
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                required
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isSigningUp}
                className="w-full mt-2 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-70"
            >
                {isSigningUp ? "Creating account..." : "Create account"}
            </button>

            {/* Switch to login */}
            <p className="text-center text-slate-500 text-sm mt-2">
                Already have an account?{" "}
                <button
                type="button"
                onClick={switchToLogin}
                className="text-indigo-400 hover:text-indigo-300 font-medium"
                >
                Sign in
                </button>
            </p>

        </form>
    )
}