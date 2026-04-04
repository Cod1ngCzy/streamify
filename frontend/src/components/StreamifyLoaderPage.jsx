import { useEffect, useRef } from "react";

export default function Loader({ message = "", showMessage = true }) {
  const barRef = useRef(null);

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.animation = "progress 2.2s cubic-bezier(0.4,0,0.2,1) forwards";
    }
  }, []);

  return (
    <div className="flex h-screen bg-[#080b14] flex-col items-center justify-center gap-8">
      
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="9" height="9" rx="2" fill="#a5b4fc"/>
            <rect x="13" y="2" width="9" height="9" rx="2" fill="#a5b4fc" opacity="0.5"/>
            <rect x="2" y="13" width="9" height="9" rx="2" fill="#a5b4fc" opacity="0.5"/>
            <rect x="13" y="13" width="9" height="9" rx="2" fill="#a5b4fc"/>
          </svg>
        </div>
        <span className="text-slate-200 font-bold text-2xl tracking-tight">Streamify</span>
      </div>

      {/* Bouncing dots — hidden when message only */}
      {showMessage && (
        <div className="flex gap-2.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-indigo-500"
              style={{ animation: `bounce 1.2s ease-in-out ${i * 0.18}s infinite` }}
            />
          ))}
        </div>
      )}

      {showMessage && (
        <p className="text-slate-500 text-sm tracking-wide">{message}</p>
      )}

    
    </div>
  );
}