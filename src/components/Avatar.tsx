import { useEffect, useState } from "react";
import $api from "../http";
import useSWR from "swr";

type Props = {
  userId: number;
  name: string;
};

const Avatar = ({ userId, name }: Props) => {
  const [avatar, setImgUrl] = useState<string | null>("");
  const fileFetcher = (url: string) =>
    $api.get(url, { responseType: "blob" }).then((res) => res.data);

  const { data, error } = useSWR(
    `/avatar/download?user_id=${userId}`,
    fileFetcher,
    { shouldRetryOnError: false }
  );

  useEffect(() => {
    if (data) {
      setImgUrl(URL.createObjectURL(data));
    } else {
      setImgUrl("");
    }
  }, [data]);

  return (
    <>
      <figure className="flex self-center h-full justify-center">
        {!error && avatar ? (
          <div className="avatar w-16 h-16">
            <div className="rounded-full w-16 h-16">
              <img src={avatar} alt="avatar" />
            </div>
          </div>
        ) : (
          <div className="avatar placeholder h-full items-center">
            <div className="bg-primary text-neutral-content rounded-full w-16 h-16">
              <span className="text-3xl text-base-100">
                {name[0].toUpperCase()}
              </span>
            </div>
          </div>
        )}
      </figure>
    </>
  );
};

export default Avatar;
