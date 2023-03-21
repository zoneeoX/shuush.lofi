import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { TabTitle } from "../TabTitle/TabTitle";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    closeModal();

    TabTitle("shuush.lofi 🎧 " + name);
  }

  function handleDelete() {
    setSavedLofi((oldData) => oldData.filter((element, index) => index !== id));
    var filteredArray = savedLofi.filter((element, index) => index !== id);
    localStorage.setItem("lofiData", JSON.stringify(filteredArray));
    toast.success("Deleted", {
      theme: "dark",
    });
  }

  return (
    <div className="text-white cursor-pointer">
      <ToastContainer />
      <div className="relative h-[34vh]">
        <img
          src={lofi_image}
          onClick={handleLofi}
          alt="lofi placeholder"
          className="w-full object-cover object-center h-full transition-all duration-200 absolute brightness-50 hover:brightness-100 rounded-lg"
        />
        <div className="flex flex-row justify-between items-center px-2 z-40">
          <div className="flex flex-row relative items-center px-2">
            <a href={youtube_url} target="_blank">
              <i className="text-white text-2xl">
                <FiExternalLink />
              </i>
            </a>
            <h1 className="w-[20vw] truncate p-2 font-mono">{name}</h1>
          </div>
          <i
            className="text-xl text-white rounded-full bg-red-700 hover:scale-110 p-1 z-10"
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
