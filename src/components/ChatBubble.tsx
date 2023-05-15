import getDate from "../utils/DateFormat";

type ChatBubbleProps = {
  name: string;
  message: string;
  createdAt: string;
  left: boolean;
};

const ChatBubble = ({ name, createdAt, message, left }: ChatBubbleProps) => {
  return (
    <>
      <div className={`chat ${left ? "chat-start" : "chat-end"} mx-4 p-0`}>
        <div className="chat-header">
          {name}
          <time className="text-xs opacity-50"> {getDate(createdAt)}</time>
        </div>
        <div className="chat-bubble bg-primary">
          <p className="text-base-100">{message}</p>
        </div>
      </div>
    </>
  );
};

export default ChatBubble;
