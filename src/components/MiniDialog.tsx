type MiniDialogProps = {
  name: string;
  avatar?: string | null;
  lastMessage?: string | null;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  readed?: boolean;
};
// TODO: large test should cut and replace on "..."

const MiniDialog = ({
  readed,
  name,
  avatar,
  lastMessage,
  onClick,
}: MiniDialogProps) => {
  return (
    <>
      <div onClick={onClick} className="card card-side w-full rounded-none">
        <figure className="flex ml-4 self-center h-full justify-center">
          {avatar ? (
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
                <span className="text-3xl text-base-100">
                  {name[0].toUpperCase()}
                </span>
              </div>
            </div>
          )}
        </figure>
        <div className="card-body">
          <div className="flex">
            <div className="flex flex-col">
              <h2 className="card-title text-ellipsis whitespace-nowrap overflow-hidden">
                {name}
              </h2>
              <p>{lastMessage}</p>
            </div>
            {readed && (
              <div className="flex w-full h-full items-center justify-end ">
                <div className="badge badge-md badge-primary"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MiniDialog;
