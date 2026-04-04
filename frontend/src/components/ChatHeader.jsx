import { useChannelStateContext } from "stream-chat-react";
import { Hash, Lock, Users, Pin, Video, X } from "lucide-react";
import { useState } from "react";

export default function ChatHeader() {
  const { channel } = useChannelStateContext();
  const [showMembers, setShowMembers] = useState(false);
  const [pinnedMessages, setPinnedMessages] = useState([]);
  const [showPinned, setShowPinned] = useState(false);

  const members = Object.values(channel.state.members);
  const memberCount = members.length;
  const isPrivate = channel.data?.private;
  const channelName = channel.data?.name || channel.data?.id;

  const handleShowPinned = async () => {
    const state = await channel.query();
    setPinnedMessages(state.pinned_messages || []);
    setShowPinned(true);
  };

  const handleVideoCall = async () => {
    const callUrl = `${"http://192.168.5.137:5173"}/call/${channel.id}`;
    await channel.sendMessage({
      text: `📹 I've started a video call. Join here: ${callUrl}`,
    });
  };

  return (
    <>
      {/* Header */}
      <div className="h-14 flex items-center px-4 justify-between border-b border-white/5 bg-[#0b0f1e] flex-shrink-0">
        <div className="flex items-center gap-2">
          {isPrivate ? (
            <Lock className="w-4 h-4 text-slate-500" />
          ) : (
            <Hash className="w-4 h-4 text-slate-500" />
          )}
          <span className="text-slate-200 font-semibold text-sm">{channelName}</span>
          {isPrivate && (
            <span className="text-[10px] bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-1.5 py-0.5 rounded-full">
              Private
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowMembers(true)}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] transition-all"
          >
            <Users className="w-4 h-4" />
            <span className="text-xs">{memberCount}</span>
          </button>

          <button
            onClick={handleShowPinned}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] transition-all"
          >
            <Pin className="w-4 h-4" />
          </button>

          <button
            onClick={handleVideoCall}
            className="p-1.5 rounded-lg text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 transition-all"
          >
            <Video className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Members Modal */}
      {showMembers && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-[#0b0f1e] border border-white/10 rounded-xl w-80 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-slate-200 text-sm font-semibold">Members ({memberCount})</h3>
              <button onClick={() => setShowMembers(false)} className="text-slate-500 hover:text-slate-300">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {members.map((m) => (
                <div key={m.user.id} className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/[0.04]">
                  {m.user.image ? (
                    <img src={m.user.image} className="w-8 h-8 rounded-full object-cover" alt={m.user.name} />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-semibold">
                      {m.user.name?.slice(0, 2).toUpperCase() ?? "??"}
                    </div>
                  )}
                  <div>
                    <p className="text-slate-300 text-xs font-medium">{m.user.name ?? m.user.id}</p>
                    <p className="text-slate-600 text-[10px]">{m.user.online ? "online" : "offline"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pinned Messages Modal */}
      {showPinned && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-[#0b0f1e] border border-white/10 rounded-xl w-96 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-slate-200 text-sm font-semibold">Pinned Messages</h3>
              <button onClick={() => setShowPinned(false)} className="text-slate-500 hover:text-slate-300">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {pinnedMessages.length === 0 ? (
                <p className="text-slate-600 text-xs text-center py-4">No pinned messages</p>
              ) : (
                pinnedMessages.map((msg) => (
                  <div key={msg.id} className="px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <p className="text-indigo-400 text-[10px] font-medium mb-1">{msg.user?.name ?? msg.user?.id}</p>
                    <p className="text-slate-300 text-xs">{msg.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}