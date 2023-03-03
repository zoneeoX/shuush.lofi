import ReactPlayer from "react-player";
import { useState, useCallback, useEffect } from "react";
import Overlay from "./assets/lofi_overlay/overlay.gif";
import LofiThree from "./assets/lofi_images/LofiThree.gif";
import NavBottom from "./components/NavBottom";
import Modal from "./components/Modal";
import { AnimatePresence } from "framer-motion";
import Pomodoro from "./components/Pomodoro/Pomodoro";
import { useSelector } from "react-redux";

function App() {
  const [playerVolume, setPlayerVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isPomodoro, setIsPomodoro] = useState(false);
  const [isPomodoroSettings, setIsPomodoroSettings] = useState(false);
  const { isFinished } = useSelector((store) => store.post);

  const [lofiInfo, setLofiInfo] = useState({
    name: "",
    youtube_url: "",
    lofi_image: "",
    custom_image: "",
  });
  const [pomodoro, setPomodoro] = useState({
    duration: 25,
    break: 5,
    session: 1,
  });

  // TODO PLEASE FIX THE INTERVAL ZONE FUTURE IM COUNTING ON YOU

  const handleStart = useCallback(() => {
    setIsPlaying((prevState) => !prevState);
  });

  const handlePlaylist = useCallback(() => {
    setIsModal((prevState) => !prevState);
  });

  const handleIsPomodoro = useCallback(() => {
    setIsPomodoro((prevState) => !prevState);
  });

  const handlePomdoroSettings = useCallback(() => {
    setIsPomodoroSettings((prevState) => !prevState);
  });

  useEffect(() => {
    setIsPomodoro(false);
  }, [isFinished]);

  return (
    <>
      <AnimatePresence>
        {isModal ? (
          <Modal setLofiInfo={setLofiInfo} setIsModal={setIsModal} lofiInfo={lofiInfo} />
        ) : (
          ""
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPomodoro ? (
          <Pomodoro isPomodoro={isPomodoro} pomodoro={pomodoro} />
        ) : (
          ""
        )}
      </AnimatePresence>

      {/* <AnimatePresence>
        {isPomodoroSettings ? <PomodoroSettings /> : ""}
      </AnimatePresence> */}

      <div className="w-screen h-screen flex justify-center items-center">
        <img
          src={lofiInfo.custom_image || lofiInfo.lofi_image || LofiThree}
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
          handlePomdoroSettings={handlePomdoroSettings}
          isPomodoroSettings={isPomodoroSettings}
          setPomodoro={setPomodoro}
          setIsPomodoro={setIsPomodoro}
          isPomodoro={isPomodoro}
          setIsPomodoroSettings={setIsPomodoroSettings}
          pomodoro={pomodoro}
          setLofiInfo={setLofiInfo}
        />
      </div>
    </>
  );
}

export default App;
