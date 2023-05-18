import useSWRInfinite from "swr/infinite";
import { fetcher } from "../http";
import { MessageType } from "../types";
import ChatBubble from "./ChatBubble";

const Messages = ({ userId }: { userId: number }) => {
  const { data, setSize } = useSWRInfinite(
    (index) => {
      return `/messages/get?recipient_id=${userId}&limit=5&offset=${index * 5}`;
    },
    fetcher,
    {
      revalidateFirstPage: false,
    }
  );

  const messages = data ? [].concat(...data) : [];

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
