import ReactPlayer from "react-player";
import { useState, useCallback } from "react";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";

import lofiBackground from "./assets/images/yes.png";
import NavBottom from "./components/NavBottom";
import Modal from "./components/Modal";

function App() {
  //* use playing param to determine whether the player is paused or not using a seperate button with a function
  //* use volume to adjust volume of the player it can be adjusted by a custom made input range
  //* randomise wallpaper when lofiInfo is updated
  //* custom user input put in localstorage

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
      {isModal ? (
        <Modal setLofiInfo={setLofiInfo} setIsModal={setIsModal} />
      ) : (
        ""
      )}
      <div className="w-screen h-screen flex justify-center items-center">
        <img
          src={lofiBackground}
          alt="background for lofi"
          className="w-screen h-screen absolute object-cover object-center brightness-50"
          onClick={handleStart}
        />

        <div className="-z-50 invisible absolute">
          <ReactPlayer
            url={
              lofiInfo?.youtube_url ||
              "https://www.youtube.com/watch?v=-9gEgshJUuY"
            }
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
