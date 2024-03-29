import { motion } from "framer-motion";
import { LofiPlaylist } from "../data/LofiPlaylist";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import PlaylistCard from "./PlaylistCard/PlaylistCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = ({
  setLofiInfo,
  setIsModal,
  lofiInfo,
  isPlaying,
  setIsPlaying,
  isModal,
}) => {
  const [lofiData, setLofiData] = useState(LofiPlaylist);
  const [savedLofi, setSavedLofi] = useState([]);
  const [newLofi, setNewLofi] = useState({
    name: "",
    youtube_url: "",
    lofi_image: "",
  });
  const [subModal, setSubModal] = useState(false);
  const [collapsed, setCollapsed] = useState(Boolean);

  useEffect(() => {
    var storedData = JSON.parse(localStorage.getItem("lofiData"));
    setSavedLofi(storedData);
  }, [lofiData]);

  function closeModal() {
    setIsModal(false);
  }

  function closeSubModal() {
    setSubModal(false);
  }

  function newLofiInput(e) {
    setNewLofi((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubModal() {
    setSubModal((isCondition) => !isCondition);
  }

  function handleAddLofi() {
    if (
      newLofi.name === "" ||
      newLofi.youtube_url === "" ||
      newLofi.lofi_image === ""
    ) {
      toast.error("Please enter all the value.", {
        theme: "dark",
      });
      throw new Error("Please enter a value");
    }

    setSavedLofi((oldData) => [...oldData, newLofi]);
    var storedData = JSON.parse(localStorage.getItem("lofiData"));
    localStorage.setItem("lofiData", JSON.stringify([...storedData, newLofi]));
    setSubModal(false);

    toast.success("Enjoy~", {
      theme: "dark",
    });

    setNewLofi((prevState) => ({
      ...prevState,
      name: "",
      youtube_url: "",
      lofi_image: "",
    }));
  }

  useEffect(() => {
    if (collapsed) {
      return;
    }

    function handleKeyUp(event) {
      switch (event.key) {
        case "Escape":
          setCollapsed(true);
          closeModal();
          break;
      }
    }

    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [collapsed]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900/50 w-screen min-h-screen max-h-full overflow-y-scroll absolute inset-0 z-50 filter overflow-x-hidden"
    >
      <ToastContainer />
      <div className="w-screen h-fit bg-gradient-to-b from-slate-900/100 to-transparent text-white font-mono">
        <div className="fixed bottom-0 w-screen z-30 flex justify-center items-center bg-gradient-to-t from-bg-slate-700/40 to-transparent">
          <div className="gap-2 flex">
            <div className="flex flex-col gap-2 w-fit border-b-[1px] border-white/50 pb-6 p-2">
              <p className="w-fit p-1 text-sm rounded-full flex items-center justify-center text-center">
                You can also add your favorite songs / stream or even playlist!
              </p>
              <button
                className="bg-slate-700/50 text-sm p-2 z-50 hover:bg-slate-700 border-white/50 border-[1px] rounded-full w-fit m-auto"
                onClick={handleSubModal}
              >
                <i className="text-2xl">
                  <AiOutlinePlus />
                </i>
              </button>
            </div>
          </div>
          {subModal && (
            <div className="flex flex-col items-center justify-center fixed z-50 overflow-y-hidden w-screen h-screen bg-black/70 top-0 left-0">
              <div className="bg-white w-[30vw] h-[6vh] bg-slate-700/80 rounded-t flex justify-end items-center p-2">
                <i
                  className="text-xl text-white rounded-full bg-red-700 z-50 hover:scale-110 p-1 cursor-pointer"
                  onClick={closeSubModal}
                >
                  <AiOutlineClose />
                </i>
              </div>
              <div className="bg-slate-800/80 h-[35vh] w-[30vw] p-4 flex flex-col gap-10">
                <div className="flex flex-col gap-6">
                  <label htmlFor="">
                    <p className="opacity-50">Name (any)</p>
                    <input
                      type="text"
                      name="name"
                      value={newLofi.name}
                      onChange={(e) => newLofiInput(e)}
                      className="w-[100%] h-[1.8rem] bg-white/10 text-white rounded-lg px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                    />
                  </label>
                  <label htmlFor="">
                    <p className="opacity-50">Link (url, playlist, stream)</p>
                    <input
                      name="youtube_url"
                      value={newLofi.youtube_url}
                      onChange={(e) => newLofiInput(e)}
                      type="text"
                      className="w-[100%] h-[1.8rem] bg-white/10 text-white rounded-lg px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                    />
                  </label>
                  <label htmlFor="">
                    <p className="opacity-50">Image (url)</p>
                    <input
                      type="text"
                      name="lofi_image"
                      value={newLofi.lofi_image}
                      onChange={(e) => newLofiInput(e)}
                      className="w-[100%] h-[1.8rem] bg-white/10 text-white rounded-lg px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                    />
                  </label>
                </div>
                <div className="p-2 w-full flex items-center justify-center">
                  <label htmlFor="">
                    <button
                      type="text"
                      className="rounded bg-sky-200/20 w-[10vw] h-[3vh] border-white/30 border-[1px] hover:scale-110 duration-100"
                      onClick={handleAddLofi}
                    >
                      Add
                    </button>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-2 justify-center items-center gap-6 mt-4 mb-4 mx-4 h-fit">
        {savedLofi.map(({ name, youtube_url, lofi_image }, idx) => (
          <PlaylistCard
            key={idx}
            name={name}
            setIsPlaying={setIsPlaying}
            youtube_url={youtube_url}
            lofi_image={lofi_image}
            setLofiInfo={setLofiInfo}
            lofiInfo={lofiInfo}
            setSavedLofi={setSavedLofi}
            savedLofi={savedLofi}
            id={idx}
            closeModal={closeModal}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Modal;
