import Chat from "../components/Chat";
import SideBar from "../components/SideBar";

const Messenger = () => {
  return (
    <>
      <div className="drawer drawer-mobile">
        <input id="chat-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <Chat />
        </div>
        <div className="drawer-side">
          <label htmlFor="chat-drawer" className="drawer-overlay"></label>
          <SideBar />
        </div>
      </div>
    </>
  );
};

export default Messenger;
