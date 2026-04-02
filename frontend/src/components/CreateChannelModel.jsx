import {useState} from "react";
import { useSearchParams } from "react-router-dom";
import { useChannelStore } from "../store/useChannelStore.js";

export default function CreateChannelModal({setShowNewChannel}) {
    const {channelList, createChannel, isCreatingChannel} = useChannelStore();
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        members: [],
    })

    const [description, setDescription] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState("");
    const [users, setUsers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);

    const validateChannelFields = () => {
        return;
    }

    const HandleChannelCreate = () => {
        validateChannelFields();
        
        console.log("Create");
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
                        type="radio"
                        name="channelType"
                        value="public"
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
                        type="radio"
                        name="channelType"
                        value="private"
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