export default function ChatSkeleton(){
    return(
        <div className="flex flex-col h-full bg-[#080b14]">
            
            {/* Header skeleton */}
            <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
            <div className="w-4 h-4 rounded bg-white/5 animate-pulse"/>
            <div className="w-32 h-4 rounded bg-white/5 animate-pulse"/>
            </div>

            {/* Messages skeleton */}
            <div className="flex-1 px-4 py-4 flex flex-col gap-4 overflow-hidden">
            {[...Array(6)].map((_, i) => (
                <div key={i} className={`flex items-start gap-3 ${i % 3 === 2 ? "flex-row-reverse" : ""}`}>
                {/* Avatar */}
                {i % 3 !== 2 && (
                    <div className="w-9 h-9 rounded-full bg-white/5 animate-pulse flex-shrink-0"/>
                )}
                <div className={`flex flex-col gap-1.5 ${i % 3 === 2 ? "items-end" : "items-start"}`}>
                    {/* Name */}
                    {i % 3 !== 2 && (
                    <div className="w-20 h-3 rounded bg-white/5 animate-pulse"/>
                    )}
                    {/* Bubble */}
                    <div
                    className="h-8 rounded-2xl bg-white/5 animate-pulse"
                    style={{ width: `${120 + (i * 37) % 100}px`, animationDelay: `${i * 0.1}s` }}
                    />
                    {/* Second line for some */}
                    {i % 2 === 0 && (
                    <div
                        className="h-8 rounded-2xl bg-white/5 animate-pulse"
                        style={{ width: `${80 + (i * 29) % 80}px`, animationDelay: `${i * 0.15}s` }}
                    />
                    )}
                </div>
                </div>
            ))}
            </div>

            {/* Input skeleton */}
            <div className="px-4 pb-4 pt-2">
            <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3">
                <div className="w-5 h-5 rounded bg-white/5 animate-pulse"/>
                <div className="flex-1 h-4 rounded bg-white/5 animate-pulse"/>
                <div className="w-5 h-5 rounded bg-white/5 animate-pulse"/>
            </div>
            </div>

        </div>
    )
}