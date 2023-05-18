import { Interweave } from "interweave";
import getDate from "../utils/DateFormat";

type Props = {
  name: string;
  message: string;
  createdAt: string;
  left: boolean;
};

const ChatBubble = ({ createdAt, message, left }: Props) => {
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
        <div className="chat-bubble bg-primary flex flex-col w-2/3 max-w-fit">
          {/* {left && ( */}
          {/*   <div className="text-base-100 font-bold text-lg self-start mb-2"> */}
          {/*     {name} */}
          {/*   </div> */}
          {/* )} */}
          <Interweave
            className="text-base-100 break-words"
            content={linkify(message)}
          />
          <time className="text-xs text-base-100 opacity-100 self-end mt-2">
            {getDate(createdAt)}
          </time>
        </div>
      </div>
    </>
  );
};

export default ChatBubble;
