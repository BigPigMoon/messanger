import Messages from "./Messages";

type Props = {
  userId: number;
  ws: React.MutableRefObject<WebSocket | undefined>;
};

const MessageLayout = ({ ws, userId }: Props) => {
  return (
    <>
      <div className="h-full overflow-scroll space-y-3 mb-2">
        <Messages userId={userId} ws={ws} />
      </div>
    </>
  );
};

export default MessageLayout;
