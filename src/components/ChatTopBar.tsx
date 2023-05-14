const ChatTopBar = () => {
  return (
    <>
      <div className="navbar bg-base-100 h-24">
        <div className="navbar-start">
          <label
            htmlFor="chat-drawer"
            className="btn btn-ghost btn-circle drawer-button lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <figure className="flex ml-4 self-center h-full justify-center">
            {true ? (
              <div className="avatar w-16 h-16">
                <div className="rounded-full w-16 h-16">
                  <img
                    src="https://imgv3.fotor.com/images/gallery/realistic-purple-hair-woman-avatar.jpg"
                    alt=""
                  />
                </div>
              </div>
            ) : (
              <div className="avatar placeholder h-full items-center">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-16 h-16">
                  <span className="text-3xl text-base-100">Михаил Хуила</span>
                </div>
              </div>
            )}
          </figure>
          <h2 className="text-2xl font-bold ml-4">Михаил Хуила</h2>
        </div>
      </div>
    </>
  );
};

export default ChatTopBar;
