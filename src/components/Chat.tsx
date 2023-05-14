import ChatTopBar from "./ChatTopBar";
import Messages from "./Messages";
import SendInput from "./SendInput";

const Chat = () => {
  return (
    <>
      <div className="flex flex-col bg-chat h-screen">
        <ChatTopBar />
        <Messages />
        <SendInput />
      </div>
    </>
  );
};

export default Chat;
