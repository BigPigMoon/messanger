import { useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "../http";
import { MessageType, UserType } from "../types";
import ChatBubble from "./ChatBubble";

type Props = {
  userId: number;
  me?: UserType;
  other?: UserType;
  ws: React.MutableRefObject<WebSocket | undefined>;
  scrollRef: React.RefObject<HTMLDivElement>;
};

const Messages = ({ userId, me, other, ws, scrollRef }: Props) => {
  const { data, mutate, setSize } = useSWRInfinite(
    (index) => {
      return `/messages/get?recipient_id=${userId}&limit=50&offset=${index * 50
        }`;
    },
    fetcher,
    {
      revalidateFirstPage: false,
    }
  );

  const messages: Array<MessageType> = data ? [].concat(...data) : [];

  useEffect(() => {
    // Listening on ws new added messages
    if (ws.current) {
      ws.current.onmessage = (event) => {
        const newMessage: MessageType = JSON.parse(event.data);
        if (me && other) {
          if (
            (newMessage.sender_id === me.id &&
              newMessage.recipient_id === other.id) ||
            (newMessage.sender_id === other.id &&
              newMessage.recipient_id === me.id)
          ) {
            mutate();
          }
        }
      };
    }
  }, [ws, me, other]);

  useEffect(() => { }, []);

  return (
    <>
      <button
        onClick={() => {
          setSize((prev) => prev + 1);
        }}
        className="btn"
      >
        Load more...
      </button>
      {messages
        .sort((a: MessageType, b: MessageType) => {
          return Date.parse(a.created_at) - Date.parse(b.created_at);
        })
        .map((val: MessageType) => (
          <ChatBubble
            key={val.id}
            left={val.sender_id === userId}
            message={val.message_text}
            createdAt={val.created_at}
          />
        ))}
    </>
  );
};

export default Messages;
