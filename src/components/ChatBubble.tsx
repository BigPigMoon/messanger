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
          <time className="text-xs opacity-50"> {createdAt}</time>
        </div>
        <div className="chat-bubble">{message}</div>
      </div>
    </>
  );
};

export default ChatBubble;
