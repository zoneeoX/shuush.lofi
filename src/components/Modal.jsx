import React from "react";
import { LofiPlaylist } from "../data/LofiPlaylist";
import PlaylistCard from "./PlaylistCard/PlaylistCard";
const Modal = ({ setLofiInfo, setIsModal }) => {
  function closeModal() {
    setIsModal(false);
  }

  return (
    <div
      onClick={closeModal}
      className="bg-slate-900/50 backdrop-hue-rotate-90 w-screen h-screen absolute inset-0 z-50 grid xl:grid-cols-3 md:grid-cols-2 justify-center gap-10 items-start p-10"
    >
      {LofiPlaylist.map(({ name, youtube_url, lofi_image }) => (
        <PlaylistCard
          name={name}
          youtube_url={youtube_url}
          lofi_image={lofi_image}
          setLofiInfo={setLofiInfo}
        />
      ))}
    </div>
  );
};

export default Modal;
