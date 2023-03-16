import { motion } from "framer-motion";
import { LofiPlaylist } from "../data/LofiPlaylist";
import { useEffect, useState } from "react";
import PlaylistCard from "./PlaylistCard/PlaylistCard";
const Modal = ({ setLofiInfo, setIsModal, lofiInfo }) => {
  const [lofiData, setLofiData] = useState(LofiPlaylist);
  const [savedLofi, setSavedLofi] = useState([]);
  const [newLofi, setNewLofi] = useState({
    name: "",
    youtube_url: "",
    lofi_image: "",
  });
  useEffect(() => {
    var storedData = JSON.parse(localStorage.getItem("lofiData"));
    setSavedLofi(storedData);
  }, [lofiData]);

  function closeModal() {
    setIsModal(false);
  }

  function newLofiInput(e) {
    setNewLofi((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleAddLofi() {
    if (
      newLofi.name === "" ||
      newLofi.youtube_url === "" ||
      newLofi.lofi_image === ""
    ) {
      throw new Error("Please enter a value");
    }

    setSavedLofi((oldData) => [...oldData, newLofi]);
    var storedData = JSON.parse(localStorage.getItem("lofiData"));
    localStorage.setItem("lofiData", JSON.stringify([...storedData, newLofi]));

    setNewLofi((prevState) => ({
      ...prevState,
      name: "",
      youtube_url: "",
      lofi_image: "",
    }));
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900/50 backdrop-hue-rotate-90 w-screen min-h-screen max-h-full overflow-y-scroll absolute inset-0 z-50 filter backdrop-blur-md overflow-x-hidden"
    >
      <div className="w-screen h-[10vh] bg-violet-700/30 text-white font-mono p-2">
        <div className="gap-2">
          <p className="w-fit p-1 text-sm rounded-full flex items-center justify-center">
            Add Stream/audio
          </p>
          <div className="flex flex-row gap-6 items-end">
            <label htmlFor="">
              <p className="opacity-50">Link</p>
              <input
                name="youtube_url"
                value={newLofi.youtube_url}
                onChange={(e) => newLofiInput(e)}
                type="text"
                className="w-50 bg-violet-700/20 border-white border-[1px] h-6"
              />
            </label>
            <label htmlFor="">
              <p className="opacity-50">Image</p>
              <input
                type="text"
                name="lofi_image"
                value={newLofi.lofi_image}
                onChange={(e) => newLofiInput(e)}
                className="w-50 bg-violet-700/20 border-white border-[1px] h-6"
              />
            </label>
            <label htmlFor="">
              <p className="opacity-50">Name</p>
              <input
                type="text"
                name="name"
                value={newLofi.name}
                onChange={(e) => newLofiInput(e)}
                className="w-50 bg-violet-700/20 border-white border-[1px] h-6"
              />
            </label>
            <label htmlFor="">
              <button
                type="text"
                className="w-50 bg-violet-700/20 border-white border-[1px] h-6 px-2"
                onClick={handleAddLofi}
              >
                Add
              </button>
            </label>
          </div>
        </div>
      </div>
      <div
        className="grid lg:grid-cols-3 grid-cols-2 justify-center items-center gap-6 mt-4 mx-4 h-[130vh]"
        onClick={closeModal}
      >
        {savedLofi.map(({ name, youtube_url, lofi_image }, idx) => (
          <PlaylistCard
            key={idx}
            name={name}
            youtube_url={youtube_url}
            lofi_image={lofi_image}
            setLofiInfo={setLofiInfo}
            lofiInfo={lofiInfo}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Modal;
