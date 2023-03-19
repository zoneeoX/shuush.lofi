import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { TabTitle } from "../TabTitle/TabTitle";
import { AiOutlineClose } from "react-icons/ai";

const PlaylistCard = ({
  name,
  youtube_url,
  lofi_image,
  setLofiInfo,
  lofiInfo,
  setIsPlaying,
  id,
  setSavedLofi,
  savedLofi,
  closeModal,
}) => {
  function handleLofi() {
    setIsPlaying(true);

    setLofiInfo((lofiInfo) => ({
      ...lofiInfo,
      name: name,
      youtube_url: youtube_url,
      lofi_image: lofi_image,
    }));

    TabTitle("shuush.lofi 🎧 " + name);
  }

  function handleDelete() {
    setSavedLofi(oldData => oldData.filter((element, index) => index !== id))
    var filteredArray = savedLofi.filter((element, index) => index !== id);
    localStorage.setItem("lofiData", JSON.stringify(filteredArray));
  }

  return (
    <div className="text-white cursor-pointer" onClick={handleLofi}>
      <div className="relative h-[34vh]">
        <img
          src={lofi_image}
          onClick={closeModal}
          alt="lofi placeholder"
          className="w-full object-cover object-center h-full transition-all duration-200 absolute brightness-50 hover:brightness-100"
        />
        <div className="flex flex-row justify-between items-center px-2">
          <div className="flex flex-row relative items-center px-2">
            <a href={youtube_url} target="_blank">
              <i className="text-white text-2xl">
                <FiExternalLink />
              </i>
            </a>
            <h1 className="w-[20vw] truncate p-2 font-mono">{name}</h1>
          </div>
          <i
            className="text-xl text-white rounded-full bg-red-700 z-40 hover:scale-110 p-1"
            onClick={handleDelete}
          >
            <AiOutlineClose />
          </i>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
