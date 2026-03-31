// Components Import
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginPageCard from "../components/LoginPageCard.jsx";
import SignUpPageCard from "../components/SignUpPageCard.jsx";

export default function LoginPage() {
    // "login" or "signup"
    const [mode, setMode] = useState("login"); 
    return (
        <div className="min-h-screen bg-[#080b14] flex items-center justify-center p-8 relative overflow-hidden">
        {/*Parent*/}    
            {/* Grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                }}
            />

            {/* Ambient orbs */}
            <div className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-indigo-600 opacity-10 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full bg-sky-500 opacity-10 blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-violet-600 opacity-10 blur-[100px] pointer-events-none" />

            {/* Card */}
            <div className="relative z-10 flex w-full max-w-4xl min-h-[580px] rounded-3xl overflow-hidden border border-white/5 shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
                {/* Left panel */}
                <div className="flex-1 bg-[#0f1629] p-12 flex flex-col justify-between border-r border-white/5">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <rect x="2" y="2" width="9" height="9" rx="2" fill="#a5b4fc" />
                            <rect x="13" y="2" width="9" height="9" rx="2" fill="#a5b4fc" opacity="0.5" />
                            <rect x="2" y="13" width="9" height="9" rx="2" fill="#a5b4fc" opacity="0.5" />
                            <rect x="13" y="13" width="9" height="9" rx="2" fill="#a5b4fc" />
                        </svg>
                        </div>
                        <span className="text-[#e2e8f0] font-bold text-lg tracking-tight">Streamify</span>
                    </div>

                    {/* Hero */}
                    <div className="flex flex-col gap-5 py-8">
                        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                        <span className="text-emerald-300 text-xs font-medium">12 teammates online</span>
                        </div>

                        <h1 className="text-[#f1f5f9] text-4xl font-bold leading-tight tracking-tight">
                        Work flows<br />
                        <span className="bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
                            better together.
                        </span>
                        </h1>

                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-light">
                        Video calls, messaging, and collaboration — all in one focused workspace.
                        </p>

                        {/* Avatars */}
                        <div className="flex items-center">
                        {[
                            { letter: "A", bg: "bg-indigo-500" },
                            { letter: "B", bg: "bg-sky-500" },
                            { letter: "C", bg: "bg-violet-500" },
                            { letter: "D", bg: "bg-purple-500" },
                        ].map(({ letter, bg }, i) => (
                            <div
                            key={letter}
                            className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center text-white text-xs font-semibold border-2 border-[#080b14] ${i !== 0 ? "-ml-2.5" : ""}`}
                            style={{ zIndex: 4 - i }}
                            >
                            {letter}
                            </div>
                        ))}
                        <span className="text-slate-500 text-xs ml-3">+2,400 teams worldwide</span>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-col gap-3">
                        {[
                        { icon: "▶", label: "HD video calls" },
                        { icon: "⬡", label: "Team channels" },
                        { icon: "◈", label: "File sharing" },
                        ].map(({ icon, label }) => (
                        <div key={label} className="flex items-center gap-3">
                            <span className="text-indigo-400 text-xs w-4">{icon}</span>
                            <span className="text-slate-500 text-sm">{label}</span>
                        </div>
                        ))}
                    </div>

                </div>
                {/* Right Panel*/}
                <div className="w-[420px] bg-[#0b0f1e] flex items-center justify-center p-10">
                <AnimatePresence mode="wait" >
                    {mode === "login" ? (
                        <motion.div
                        key="login"
                        className=""
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.3 }}
                        >
                        <LoginPageCard switchToSignup={() => setMode("signup")} />
                        </motion.div>
                    ) : (
                        <motion.div
                        key="signup"
                        className="flex-1 max-w-md"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.3 }}
                        >
                        <SignUpPageCard switchToLogin={() => setMode("login")} />
                        </motion.div>
                    )}
                </AnimatePresence>
                </div>
            </div>

        {/*Parent*/}                   
        </div>
  );
}