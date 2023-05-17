import { Interweave } from "interweave";
import getDate from "../utils/DateFormat";

type Props = {
  name: string;
  message: string;
  createdAt: string;
  left: boolean;
};

const ChatBubble = ({ name, createdAt, message, left }: Props) => {
  const linkify = (text: string) => {
    var urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    return text.replace(urlRegex, (url: string) => {
      return (
        '<a className="links" target="_blank" href="' +
        url +
        '">' +
        url +
        "</a>"
      );
    });
  };

  return (
    <>
      <div className={`chat ${left ? "chat-start" : "chat-end"} mx-4 p-0`}>
        <div className="chat-header">
          {name}
          <time className="text-xs opacity-50"> {getDate(createdAt)}</time>
        </div>
        <div className="chat-bubble bg-primary">
          <Interweave className="text-base-100" content={linkify(message)} />
        </div>
      </div>
    </>
  );
};

export default ChatBubble;
