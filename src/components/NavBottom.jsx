import { BsPlayFill, BsPauseFill, BsFullscreen } from "react-icons/bs";
import { RiPlayListFill } from "react-icons/ri";
import { MdTimer } from "react-icons/md";

const NavBottom = ({
  isPlaying,
  handleStart,
  handlePlaylist,
  setPlayerVolume,
  lofiInfo,
}) => {
  function setVolume(e) {
    setPlayerVolume(e.currentTarget.value);
  }

  return (
    <div className="w-screen h-[10vh] bottom-0 left-0 absolute flex flex-row justify-between items-center gap-2 px-10 text-white">
      <div className="w-full h-fit flex filter backdrop-blur-sm text-3xl flex-col">
        <div className="flex flex-row gap-4">
          <button className="text-white rounded-full" onClick={handleStart}>
            <i>{isPlaying ? <BsPauseFill /> : <BsPlayFill />}</i>
          </button>
          <button className="text-white rounded-full">
            <i className="text-2xl" onClick={handlePlaylist}>
              <RiPlayListFill />
            </i>
          </button>
          <label htmlFor="" className="flex justify-start items-center">
            <input
              type="range"
              className="slider w-96 bg-slate-800"
              min={0}
              max={1}
              step={0.001}
              defaultValue={0.5}
              onChange={(e) => setVolume(e)}
            />
          </label>
        </div>
        <p className="font-mono animate-pulse cursor-pointer text-lg" onClick={handlePlaylist}>
          {lofiInfo?.name ||
            "Japanese Lofi Radio 24/7 🔴 Aesthetic Lofi Hip Hop Music"}
        </p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <i className="font-mono text-4xl cursor-pointer">
          <MdTimer />
        </i>
      </div>
    </div>
  );
};

export default NavBottom;