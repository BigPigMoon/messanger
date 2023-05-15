import { useEffect, useRef } from "react";
import ChatTopBar from "./ChatTopBar";
import { WS_URL, fetcher } from "../http";
import { UserType } from "../types";
import useSWR from "swr";
import Messages from "./Messages";
import SendInput from "./SendInput";

const Chat = ({ selectedChat }: { selectedChat: number | null }) => {
  const { data: me } = useSWR<UserType>("/users/me", fetcher);

  const ws = useRef<WebSocket>();

  useEffect(() => {
    if (me) {
      ws.current = new WebSocket(WS_URL + me.id);

      ws.current.onopen = () => {
        console.log("Connection opened");
      };

      return () => {
        console.log("Cleaning up...");
        if (ws.current) {
          ws.current.close();
        }
      };
    }
  }, [me, ws]);

  return (
    <>
      {selectedChat && me ? (
        <div className="flex flex-col bg-chat h-screen">
          <ChatTopBar userId={selectedChat} />
          <Messages userId={selectedChat} ws={ws} />
          <SendInput ws={ws} userId={selectedChat} me={me} />
        </div>
      ) : (
        <ChatTopBar userId={selectedChat} />
      )}
    </>
  );
};

export default Chat;
