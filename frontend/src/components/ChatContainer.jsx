export default function ChatContainer({ selectedUser, selectedChannel }) {
  return (
    <div className="flex-1 flex items-center justify-center bg-[#080b14]">
      {selectedChannel ? (
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-indigo-400 text-2xl font-light">#</span>
          </div>
          <p className="text-slate-300 font-semibold text-lg">
            # {selectedChannel.name}
          </p>
          <p className="text-slate-600 text-sm mt-1">
            Channel chat coming soon...
          </p>
        </div>
      ) : selectedUser ? (
        <div className="text-center">
          <div
            className={`w-16 h-16 rounded-full ${selectedUser.color} flex items-center justify-center text-white text-xl font-bold mx-auto mb-4`}
          >
            {selectedUser.avatar}
          </div>
          <p className="text-slate-300 font-semibold text-lg">
            {selectedUser.name}
          </p>
          <p className="text-slate-600 text-sm mt-1">
            DM chat coming soon...
          </p>
        </div>
      ) : (
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6366f1"
              strokeWidth="1.5"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <p className="text-slate-400 font-medium text-sm">
            Select a conversation
          </p>
          <p className="text-slate-600 text-xs mt-1">
            Choose a channel or direct message
          </p>
        </div>
      )}
    </div>
  );
}