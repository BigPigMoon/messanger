import { useEffect, useRef } from "react";
import { fetcher } from "../http";
import useSWR from "swr";
import { MessageType, UserType } from "../types";
import Messages from "./Messages";

type Props = {
  ws: React.MutableRefObject<WebSocket | undefined>;
  userId: number;
};

const MessageLayout = ({ ws, userId }: Props) => {
  const { data: me } = useSWR<UserType>("/users/me", fetcher);
  const { data: other } = useSWR<UserType>(
    `/users/get?user_id=${userId}`,
    fetcher
  );

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({});
  });

  useEffect(() => {
    // Listening on ws new added messages
    if (ws.current) {
      ws.current.onmessage = (event) => {
        const data: MessageType = JSON.parse(event.data);
        // if (messages && me && other) {
        //   if (
        //     (data.sender_id === me.id && data.recipient_id === other.id) ||
        //     (data.sender_id === other.id && data.recipient_id === me.id)
        //   )
        //     messagesMutate([...messages, data]);
        // }
      };
    }
  }, [ws, me, other]);

  return (
    <>
      <div className="h-full scrollbar-hidden overflow-auto space-y-3 mb-2">
        <Messages userId={userId} />
      </div>
      <div ref={bottomRef} />
    </>
  );
};

export default MessageLayout;
