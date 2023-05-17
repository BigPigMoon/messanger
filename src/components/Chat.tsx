import { useEffect, useRef } from "react";
import ChatTopBar from "./ChatTopBar";
import { WS_URL, fetcher } from "../http";
import { UserType } from "../types";
import useSWR from "swr";
import Messages from "./Messages";
import SendInput from "./SendInput";
import TopChatInfo from "./TopChatInfo";

type Props = {
  selectedChat: number | null;
};

const Chat = ({ selectedChat }: Props) => {
  const { data: me } = useSWR<UserType>("/users/me", fetcher);

  const ws = useRef<WebSocket>();

  useEffect(() => {
    if (me) {
      ws.current = new WebSocket(WS_URL + me.id);

      return () => {
        if (ws.current) {
          ws.current.close();
        }
      };
    }
  }, [me, ws]);

  return (
    <>
      {selectedChat !== null && me ? (
        <div className="flex flex-col bg-chat h-screen">
          <ChatTopBar>
            <TopChatInfo userId={selectedChat} />
          </ChatTopBar>
          <Messages userId={selectedChat} ws={ws} />
          <SendInput ws={ws} userId={selectedChat} me={me} />
        </div>
      ) : (
        <ChatTopBar />
      )}
    </>
  );
};

export default Chat;
