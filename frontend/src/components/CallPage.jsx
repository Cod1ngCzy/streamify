import {useEffect, useState} from "react";
import {useParams, useNavigate, data} from "react-router";
import toast from "react-hot-toast";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

// Local Imports
import { useAuthStore } from "../store/useAuthStore";
import { useChannelStore } from "../store/useChannelStore";
import { api } from "../lib/axios";
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

export default function CallPage(){
    const {channelId} = useParams();
    const {authUser} = useAuthStore();

    const [client, setClient] = useState(null);
    const [call, setCall] = useState(null);
    const [isConnecting, setIsConnecting] = useState(true);

    useEffect(() => {
        const initCall = async () => {
            // Fetch Token
            const { data } = await api.get("/chat/token");

            console.log(data, authUser);
            if(!data || !authUser) return;
            console.log("initiating call sequence");

            try {
                setIsConnecting(true);
                
                const videoClient = new StreamVideoClient({
                    apiKey: STREAM_API_KEY,
                    user: {
                        id: authUser._id,
                        name: authUser.name,
                        image: undefined
                    },
                    token: data.token
                })

                console.log(authUser._id, data.token, STREAM_API_KEY);

                const callinstance = videoClient.call("default", channelId);
                await callinstance.join({create:true});

                console.log(callinstance);

                setClient(videoClient);
                setCall(callinstance);
            } catch (error){
                toast.error("Cannot connect to call");
                console.log(error);
            } finally {
                setIsConnecting(false);
            }
        }

        initCall();
    }, [ authUser, channelId])

    if (isConnecting) {
        return (
        <div className="flex h-screen bg-[#080b14] items-center justify-center">
            <div className="text-slate-500 text-sm">Connecting to call...</div>
        </div>
        )
    }

    return(
        <div className="h-screen flex flex-col item-center justify-center bg-gray-100">
            <div className="relative w-full max-w-4xl mx-auto">
                {client && call ? (
                    <StreamVideo client={client}>
                        <StreamCall call={call}>
                            <CallContent/>
                        </StreamCall>
                    </StreamVideo>
                ) : (
                    <div>
                        <p>Could not Call</p>
                    </div>
                )}
            </div>
        </div>   
    );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();
  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) return navigate("/");

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};