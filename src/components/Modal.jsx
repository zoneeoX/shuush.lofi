import { motion } from "framer-motion";
import { LofiPlaylist } from "../data/LofiPlaylist";
import PlaylistCard from "./PlaylistCard/PlaylistCard";
const Modal = ({ setLofiInfo, setIsModal, lofiInfo }) => {
  function closeModal() {
    setIsModal(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={closeModal}
      className="bg-slate-900/50 backdrop-hue-rotate-90 w-screen min-h-screen max-h-full overflow-y-scroll absolute inset-0 z-50 filter backdrop-blur-md"
    >
      <div className="grid lg:grid-cols-3 grid-cols-2 justify-center items-center gap-6 mt-4 mx-4 h-[130vh]">
        {LofiPlaylist.map(({ name, youtube_url, lofi_image }, idx) => (
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
