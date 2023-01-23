import ReactPlayer from "react-player";
import { useState, useCallback } from "react";
import Overlay from "./assets/lofi_overlay/overlay.gif";
import lofiBackground from "./assets/images/yes.png";
import LofiThree from "./assets/lofi_images/LofiThree.gif";
import NavBottom from "./components/NavBottom";
import Modal from "./components/Modal";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerVolume, setPlayerVolume] = useState(0.5);
  const [isModal, setIsModal] = useState(false);
  const [lofiInfo, setLofiInfo] = useState({
    name: "",
    youtube_url: "",
    lofi_image: "",
  });

  const handleStart = useCallback(() => {
    setIsPlaying((prevState) => !prevState);
  });

  const handlePlaylist = useCallback(() => {
    setIsModal((prevState) => !prevState);
  });

  return (
    <>
      <AnimatePresence>
        {isModal ? (
          <Modal setLofiInfo={setLofiInfo} setIsModal={setIsModal} />
        ) : (
          ""
        )}
      </AnimatePresence>
      <div className="w-screen h-screen flex justify-center items-center">
        <img
          src={lofiInfo.lofi_image || LofiThree}
          alt="background for lofi"
          className="w-screen h-screen absolute object-cover object-center brightness-50"
          onClick={handleStart}
        />
        <img
          src={Overlay}
          className="w-screen h-screen object-bottom object-cover z-40 opacity-30"
        />

        <div className="-z-50 invisible absolute">
          <ReactPlayer
            url={
              lofiInfo?.youtube_url ||
              "https://www.youtube.com/watch?v=jfKfPfyJRdk"
            }
            loop={true}
            playing={isPlaying}
            volume={playerVolume}
            config={{
              youtube: {
                playerVars: { showinfo: 0 },
              },
            }}
          />
        </div>
        <NavBottom
          isPlaying={isPlaying}
          handleStart={handleStart}
          setPlayerVolume={setPlayerVolume}
          handlePlaylist={handlePlaylist}
          lofiInfo={lofiInfo}
        />
      </div>
    </>
  );
}

export default App;
