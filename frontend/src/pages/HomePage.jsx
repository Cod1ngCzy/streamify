import { useState, useEffect } from "react";

// Local Imports
import ChatContainer from "../components/ChatContainer.jsx";
import CreateChannelModal from "../components/CreateChannelModel.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";
import { useChannelStore } from "../store/useChannelStore.js";
import {
  Chat,
  Channel,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";


const users = [
  { id: 1, name: "Alex Rivera", status: "online", avatar: "AR", color: "bg-indigo-500" },
  { id: 2, name: "Sam Chen", status: "online", avatar: "SC", color: "bg-sky-500" },
  { id: 3, name: "Jordan Lee", status: "idle", avatar: "JL", color: "bg-violet-500" },
  { id: 4, name: "Morgan Wu", status: "offline", avatar: "MW", color: "bg-slate-500" },
  { id: 5, name: "Taylor Kim", status: "online", avatar: "TK", color: "bg-emerald-500" },
];

const statusColors = {
  online: "bg-emerald-400",
  idle: "bg-amber-400",
  offline: "bg-slate-600",
};

export default function HomePage() {
  const { authUser, signOut } = useAuthStore();
  const {chatClient, isClientConnecting, initChat, disconnectChat} = useChatStore();
  const {isGettingChannelList, channelList, getSubscribedChannels} = useChannelStore();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [search, setSearch] = useState("");
  const [channelsOpen, setChannelsOpen] = useState(true);
  const [dmsOpen, setDmsOpen] = useState(true);
  const [showNewChannel, setShowNewChannel] = useState(false);

  // For Stream API 
  useEffect(() => {
    if (authUser) {
      initChat(authUser);
      getSubscribedChannels();
    }
    return () => disconnectChat();
  }, [authUser?._id]);

  //
  if (isClientConnecting || !chatClient) return;

  const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const onlineCount = users.filter((u) => u.status === "online").length;

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setSelectedChannel(null);
  };

  const handleSelectChannel = (channel) => {
    setSelectedChannel(channel);
    setSelectedUser(null);
    // Clear unread on select
    setChannels((prev) =>
      prev.map((c) => (c.id === channel.id ? { ...c, unread: 0 } : c))
    );
  };

  return (
    <div className="flex h-screen bg-[#080b14] overflow-hidden">
      <Chat client={ chatClient }>
        {showNewChannel && (
          <CreateChannelModal
            onClose={() => setShowNewChannel(false)}
            onCreate={(channel) => {
              setChannels((prev) => [...prev, channel]);
              setSelectedChannel(channel);
              setSelectedUser(null);
            }}
            setShowNewChannel={setShowNewChannel}
          />
        )}
        {/* Left Sidebar */}
        <div className="w-72 flex flex-col bg-[#0b0f1e] border-r border-white/5 flex-shrink-0">

          {/* Top — App header + search */}
          <div className="px-4 py-4 border-b border-white/5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="9" height="9" rx="2" fill="#a5b4fc" />
                  <rect x="13" y="2" width="9" height="9" rx="2" fill="#a5b4fc" opacity="0.5" />
                  <rect x="2" y="13" width="9" height="9" rx="2" fill="#a5b4fc" opacity="0.5" />
                  <rect x="13" y="13" width="9" height="9" rx="2" fill="#a5b4fc" />
                </svg>
              </div>
              <span className="text-slate-200 font-bold text-sm tracking-tight">Streamify</span>
            </div>

            {/* Search */}
            <div className="relative flex items-center">
              <svg className="absolute left-3 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Find a conversation..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg pl-8 pr-3 py-2 text-xs text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all duration-200"
              />
            </div>
          </div>

          {/* Middle — Scrollable list */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5 scrollbar-thin">

            {/* ── Channels section ── */}
            <div className="mb-1">
              <button
                onClick={() => setChannelsOpen(!channelsOpen)}
                className="w-full flex items-center justify-between px-2 py-2 group"
              >
                <div className="flex items-center gap-1.5">
                  {/* Collapse arrow */}
                  <svg
                    width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5"
                    className={`transition-transform duration-200 ${channelsOpen ? "rotate-90" : "rotate-0"}`}
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <span className="text-slate-600 text-[10px] font-semibold uppercase tracking-widest">
                    Channels
                  </span>
                </div>
                
                {/* Add channel button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowNewChannel(!showNewChannel);
                    setChannelsOpen(true);
                  }}
                  className="relative flex items-center justify-center w-6 h-6 rounded-md 
                            border border-white/10 bg-white/[0.03] 
                            hover:border-indigo-400/50 hover:bg-indigo-500/10 
                            transition-all duration-200 group overflow-hidden"
                  title="Add channel"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="text-slate-500 group-hover:text-indigo-300 transition-colors"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </button>


              {/* Channel list */}
              {channelsOpen && (
                <div className="space-y-0.5">
                  {channelList.map((channel) => (
                    <button
                      key={channel._id}
                      onClick={() => handleSelectChannel(channel)}
                      className={`w-full flex items-center gap-2 px-2 py-2 rounded-xl transition-all duration-150 group text-left ${
                        selectedChannel?.id === channel._id
                          ? "bg-indigo-500/15 border border-indigo-500/20"
                          : "hover:bg-white/[0.04] border border-transparent"
                      }`}
                    >
                      <span className={`text-sm font-medium ${selectedChannel?.id === channel._id ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-400"}`}>
                        #
                      </span>
                      <span className={`flex-1 text-sm truncate ${selectedChannel?.id === channel._id ? "text-indigo-300 font-medium" : "text-slate-400 group-hover:text-slate-300"}`}>
                        {channel.name}
                      </span>
                      {channel.unread > 0 && (
                        <span className="w-4 h-4 rounded-full bg-indigo-500 text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0">
                          {channel.unread}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.04] mx-2 my-2" />

            {/* ── Direct Messages section ── */}
            <div>
              <button
                onClick={() => setDmsOpen(!dmsOpen)}
                className="w-full flex items-center justify-between px-2 py-2 mb-1 group"
              >
                <div className="flex items-center gap-1.5">
                  <svg
                    width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5"
                    className={`transition-transform duration-200 ${dmsOpen ? "rotate-90" : "rotate-0"}`}
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <span className="text-slate-600 text-[10px] font-semibold uppercase tracking-widest">
                    Direct Messages
                  </span>
                </div>
                <span className="text-slate-700 text-[10px]">{onlineCount} online</span>
              </button>

              {dmsOpen && (
                <div className="space-y-0.5">
                  {filtered.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-slate-600 text-xs">No users found</p>
                    </div>
                  )}

                  {filtered.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleSelectUser(user)}
                      className={`w-full flex items-center gap-3 px-2 py-2.5 rounded-xl transition-all duration-150 group text-left ${
                        selectedUser?.id === user.id
                          ? "bg-indigo-500/15 border border-indigo-500/20"
                          : "hover:bg-white/[0.04] border border-transparent"
                      }`}
                    >
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className={`w-9 h-9 rounded-full ${user.color} flex items-center justify-center text-white text-xs font-semibold`}>
                          {user.avatar}
                        </div>
                        <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${statusColors[user.status]} border-2 border-[#0b0f1e]`} />
                      </div>

                      {/* Name + status */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${selectedUser?.id === user.id ? "text-indigo-300" : "text-slate-300 group-hover:text-slate-200"}`}>
                          {user.name}
                        </p>
                        <p className="text-[11px] text-slate-600 capitalize">{user.status}</p>
                      </div>

                      {/* Unread badge */}
                      {user.id === 2 && (
                        <span className="w-4 h-4 rounded-full bg-indigo-500 text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0">
                          3
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom — Account bar */}
          <div className="p-3 border-t border-white/5">
            <div className="flex items-center gap-3 px-2 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
              <div className="relative flex-shrink-0">
                <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-semibold">
                  {authUser?.fullName?.slice(0, 2).toUpperCase() ?? "ME"}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0b0f1e]" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-slate-200 text-xs font-semibold truncate">
                  {authUser?.fullName ?? "You"}
                </p>
                <p className="text-slate-600 text-[10px] truncate">
                  {authUser?.email ?? ""}
                </p>
              </div>

              <button
                onClick={signOut}
                title="Sign out"
                className="flex-shrink-0 text-slate-600 hover:text-red-400 transition-colors duration-150 cursor-pointer p-1 rounded-lg hover:bg-red-500/10"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <ChatContainer
          selectedUser={selectedUser}
          selectedChannel={selectedChannel}
        />
      </Chat>
    </div>
  );
}