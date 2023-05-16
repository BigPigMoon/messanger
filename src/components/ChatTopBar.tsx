type Props = {
  children?: string | JSX.Element | JSX.Element[];
};

const ChatTopBar = ({ children }: Props) => {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <label
            htmlFor="chat-drawer"
            className="btn btn-ghost btn-circle drawer-button lg:hidden mr-4"
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
          {children}
        </div>
      </div>
    </>
  );
};

export default ChatTopBar;
