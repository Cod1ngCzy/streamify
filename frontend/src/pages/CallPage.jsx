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
import { api } from "../lib/axios";
import Loader from "../components/StreamifyLoaderPage.jsx";
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

            if(!data || !authUser) return;

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

                const callinstance = videoClient.call("default", channelId);
                await callinstance.join({create:true});

                setClient(videoClient);
                setCall(callinstance);
            } catch (error){
                toast.error("Cannot connect to call");
            } finally {
                setIsConnecting(false);
            }
        }

        initCall();
    }, [ authUser, channelId])

    if (isConnecting) {
        return (
            <Loader message={"Connecting to call"} showMessage={true}/>
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