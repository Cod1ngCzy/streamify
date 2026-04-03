import {useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import { useChannelStore } from "../store/useChannelStore.js";
import { useChatContext } from "stream-chat-react";
import toast from "react-hot-toast";

export default function CreateChannelModal({setShowNewChannel}) {
    const {chatClient, channelList, createChannel, isCreatingChannel} = useChannelStore();
    const {client, setActiveChannel} = useChatContext();
    const [description, setDescription] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [search, setSearch] = useState("")
    const [users, setUsers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [channelType, setChannelType] = useState("public");

    const [formData, setFormData] = useState({
        name: "",
        type: "",
    })

    // fetch user for member selection [TODO: Implement Friendship System]
    useEffect(() => {
        const fetchUsers = async () => {
            if(!client?.user) return;
            
            try{
                const response = await client.queryUsers(
                    {id: {$ne: client?.user?.id}},
                    {name: 1},
                    {limit:100}
                );

                setUsers(response?.users || []);

            } catch (error){
                toast.error("Error Loading Users");
                setUsers([]);
            }
        }

        fetchUsers();
    }, [client]);

    const validateChannelFields = (formData) => {
        if (formData.name.length < 5) {
            toast.error("Channel name too short")
            return;
        } else if (formData.type != "private" || formData.type != "public"){
            toast.error("Channel type error");
            return;
        }
    }

    const toggleMember = (id) => {
        setSelectedMembers((prev) => 
            prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
        );
    };

    const HandleChannelCreate = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            members: selectedMembers,
        };
        createChannel(payload);
        console.log("Created", payload);
    }

    return(
        <div className="fixed inset-0 z-[9999] bg-black/10 backdrop-blur-sm flex justify-center items-center">
            <div className="w-[600px]">
                <form className="bg-[#0b0f1e] border border-white/5 p-5 rounded-xl" onSubmit={HandleChannelCreate}>
                    {/* Title */}
                    <h2 className="text-sm font-semibold text-slate-200 mb-4">
                        Create Channel
                    </h2>

                    {/* Channel Name */}
                    <div className="mb-4">
                        <label className="block text-xs text-slate-400 mb-1">
                        Channel Name
                        </label>
                        <input
                        type="text"
                        value = {formData.name}
                        onChange = {(e) => setFormData({...formData, name:e.target.value})}
                        placeholder="channel-name"
                        className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    {/* Channel Type */}
                    <div className="mb-4">
                        <label className="block text-xs text-slate-400 mb-2">
                        Channel Type
                        </label>

                        <div className="grid grid-cols-2 gap-2">
                        {/* Public */}
                        <label className="cursor-pointer">
                            <input
                            onClick = {() => setChannelType("public")}
                            type="radio"
                            value = "public"
                            onChange = {(e) => setFormData({...formData, type:e.target.value})}
                            name="channelType"
                            className="hidden peer"
                            defaultChecked
                            />

                            <div className="flex items-start gap-2 p-3 rounded-lg border border-white/10 bg-white/[0.03] 
                                            peer-checked:border-indigo-500/50 peer-checked:bg-indigo-500/10 
                                            hover:border-indigo-400/40 transition-all">
                            <div className="mt-0.5 text-slate-400 peer-checked:text-indigo-400">
                                🌍
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-200">Public</p>
                                <p className="text-[10px] text-slate-500">Anyone can join this channel</p>
                            </div>
                            </div>
                        </label>

                        {/* Private */}
                        <label className="cursor-pointer">
                            <input
                            onClick = {() => setChannelType("private")}
                            type="radio"
                            value = "private"
                            onChange = {(e) => setFormData({...formData, type:e.target.value})}
                            name="channelType"
                            className="hidden peer"
                            />

                            <div className="flex items-start gap-2 p-3 rounded-lg border border-white/10 bg-white/[0.03] 
                                            peer-checked:border-indigo-500/50 peer-checked:bg-indigo-500/10 
                                            hover:border-indigo-400/40 transition-all">
                            <div className="mt-0.5 text-slate-400 peer-checked:text-indigo-400">
                                🔒
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-200">Private</p>
                                <p className="text-[10px] text-slate-500">Only selected members can join</p>
                            </div>
                            </div>
                        </label>

                        </div>
                    </div>

                    {/* Users */}
                    {channelType === "private" && (
                    <>
                        <div className="relative flex items-center mb-2">
                            <svg className="absolute left-3 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input 
                                type="text"
                                placeholder="Find Members"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg pl-8 pr-3 py-2 text-xs text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all duration-200"
                            />
                        </div>
                        <div className="w-full mb-2 rounded-lg border border-white/10 bg-white/[0.03] overflow-hidden max-h-40 overflow-y-auto">
                            {users.filter(user =>
                                (user.name || "").toLowerCase().includes(search.toLowerCase())
                            )
                            .map((user) => {
                            const isSelected = selectedMembers?.includes(user.id);
                            return (
                                <div
                                    key={user.id}
                                    onClick={() => toggleMember(user.id)}
                                    className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-all duration-150 border-b border-white/[0.04] last:border-b-0 ${
                                        isSelected ? "bg-indigo-500/10" : "hover:bg-white/[0.04]"
                                    }`}
                                >
                                    {/* Avatar */}
                                    <div className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}>
                                        {user.avatar}
                                    </div>

                                    {/* Name */}
                                    <span className={`flex-1 text-sm truncate ${isSelected ? "text-indigo-300 font-medium" : "text-slate-300"}`}>
                                        {user.name}
                                    </span>

                                    {/* Checkbox */}
                                    <div className={`w-4 h-4 rounded flex items-center justify-center border flex-shrink-0 transition-all duration-150 ${
                                        isSelected
                                        ? "bg-indigo-500 border-indigo-500"
                                        : "border-white/20 bg-transparent"
                                    }`}>
                                        {isSelected && (
                                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        )}
                                    </div>
                                </div>
                            );
                            })}
                        </div>
                    </>
                    )}

                    {/* Description */}
                    <div className="mb-5">
                        <label className="block text-xs text-slate-400 mb-1">
                        Channel Description
                        </label>
                        <textarea
                        placeholder="Optional..."
                        rows={3}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 resize-none focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2">
                        <button
                        type="button"
                        onClick={() => setShowNewChannel(false)}
                        className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
                        >
                        Cancel
                        </button>

                        <button
                        type="submit"
                        className="px-3 py-1.5 text-xs bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg transition"
                        >
                        Create Channel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};