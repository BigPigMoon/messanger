import ChatBubble from "./ChatBubble";
import { useEffect, useRef } from "react";
import { fetcher } from "../http";
import useSWR from "swr";
import { MessageType, UserType } from "../types";

const Messages = ({
  ws,
  userId,
}: {
  ws: React.MutableRefObject<WebSocket | undefined>;
  userId: number;
}) => {
  const { data: me } = useSWR<UserType>("/users/me", fetcher);
  const { data: other } = useSWR<UserType>(
    `/users/get?user_id=${userId}`,
    fetcher
  );

  const { data: messages, mutate: messagesMutate } = useSWR<MessageType[]>(
    `/messages/get?recipient_id=${userId}&limit=1000`,
    fetcher
  );

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({});
  });

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    // Listening on ws new added messages
    if (ws.current) {
      ws.current.onmessage = (event) => {
        const data: MessageType = JSON.parse(event.data);
        if (messages && me && other) {
          if (
            (data.sender_id === me.id && data.recipient_id === other.id) ||
            (data.sender_id === other.id && data.recipient_id === me.id)
          )
            messagesMutate([...messages, data]);
        }
      };
    }
  }, [messages, messagesMutate, ws, me, other]);

  return (
    <>
      <div className="h-full scrollbar-hidden overflow-auto mb-2">
        {messages &&
          me &&
          other &&
          messages
            .sort((a, b) => {
              return Date.parse(a.created_at) - Date.parse(b.created_at);
            })
            .map((val: MessageType) => (
              <ChatBubble
                key={val.id}
                name={val.sender_id !== userId ? me.username : other.username}
                left={val.sender_id === userId}
                message={val.message_text}
                createdAt={val.created_at}
              />
            ))}
        <div ref={bottomRef} />
      </div>
    </>
  );
};

export default Messages;
