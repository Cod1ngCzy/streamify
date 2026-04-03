import {
  Chat,
  Channel,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";

export default function ChatContainer({ selectedUser, selectedChannel }) {
  return (
    <Channel channel={selectedChannel}>
      <Window>
          <MessageList/>
          <MessageInput/>
      </Window>
      <Thread/>
    </Channel>
  );
}