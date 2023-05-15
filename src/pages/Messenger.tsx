import { useRef, useState } from "react";
import Chat from "../components/Chat";
import ModalSettings from "../components/ModalSettings";
import SideBar from "../components/SideBar";

const Messenger = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const drawerCheckbox = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="drawer drawer-mobile">
        <input
          id="chat-drawer"
          type="checkbox"
          className="drawer-toggle"
          ref={drawerCheckbox}
        />
        <div className="drawer-content flex flex-col">
          <Chat selectedChat={selectedChat} />
          {/* modal window */}
          <input type="checkbox" id="profile-modal" className="modal-toggle" />
          <div className="modal z-40">
            <div className="modal-box relative">
              <label
                htmlFor="profile-modal"
                className="btn btn-sm btn-primary btn-circle absolute right-2 top-2"
              >
                X
              </label>
              <ModalSettings />
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="chat-drawer" className="drawer-overlay"></label>
          <SideBar
            setSelectedChat={setSelectedChat}
            selectedChat={selectedChat}
            drawerCheckbox={drawerCheckbox}
          />
        </div>
      </div>
    </>
  );
};

export default Messenger;
