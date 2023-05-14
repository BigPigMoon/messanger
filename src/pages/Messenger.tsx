import Chat from "../components/Chat";
import ModalSettings from "../components/ModalSettings";
import SideBar from "../components/SideBar";

const Messenger = () => {
  return (
    <>
      <div className="drawer drawer-mobile">
        <input id="chat-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <Chat />
          {/* modal window */}
          <input type="checkbox" id="profile-modal" className="modal-toggle" />
          <div className="modal">
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
          <SideBar />
        </div>
      </div>
    </>
  );
};

export default Messenger;
