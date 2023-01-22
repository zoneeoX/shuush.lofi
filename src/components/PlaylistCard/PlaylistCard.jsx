import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { TabTitle } from "../TabTitle/TabTitle";

const PlaylistCard = ({ name, youtube_url, lofi_image, setLofiInfo }) => {
  function handleLofi() {
    setLofiInfo({
      name,
      youtube_url,
      lofi_image,
    });

    TabTitle("shuush.lofi 🎧 " + name);
  }

  return (
    <div className="text-white cursor-pointer" onClick={handleLofi}>
      <div className="relative">
        <img
          src={lofi_image}
          alt="lofi placeholder"
          className="w-full object-cover object-center h-[25vh] transition-all duration-200 absolute brightness-50 hover:brightness-100"
        />
        <div className="flex flex-row relative items-center px-2">
          <a href={youtube_url} target="_blank">
            <i className="text-white text-2xl">
              <FiExternalLink />
            </i>
          </a>
          <h1 className="w-96 truncate p-2 font-mono">{name}</h1>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
