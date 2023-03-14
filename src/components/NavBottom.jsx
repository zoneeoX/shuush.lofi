import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { RiPlayListFill } from "react-icons/ri";
import { MdTimer } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pausePomodoro, finishedPomodoro } from "../features/PostPomodoro";
import debounce from "lodash.debounce";

const NavBottom = ({
  isPlaying,
  handleStart,
  handlePlaylist,
  setPlayerVolume,
  lofiInfo,
  handlePomdoroSettings,
  isPomodoroSettings,
  setPomodoro,
  pomodoro,
  setIsPomodoro,
  setIsPomodoroSettings,
  isPomodoro,
  setLofiInfo,
  playerVolume
}) => {
  const dispatch = useDispatch();
  const { isPause } = useSelector((store) => store.post);

  const [ready, setReady] = useState("");
  const [customImage, setCustomImage] = useState("");

  function setVolume(e) {
    setPlayerVolume(e.currentTarget.value);
  }

  const onChange = (e) => {
    setPomodoro((prevData) => ({
      ...prevData,
      [e.target.name]: Number(e.target.value),
    }));
  };

  function handlePomodoro() {
    setIsPomodoro(true);
    setIsPomodoroSettings(false);
  }

  function exit() {
    setIsPomodoroSettings(false);
  }

  function handlePause() {
    dispatch(pausePomodoro());
  }

  function pomodoroFinished() {
    dispatch(finishedPomodoro());
  }

  function handleChangeBackground(e) {
    setCustomImage(e.target.value);
  }

  function handleDeleteValue() {
    setCustomImage("");
  }

  function setCustomBackground() {
    setLofiInfo((lofiInfo) => ({ ...lofiInfo, custom_image: customImage }));
  }

  function handleDefaultBackground() {
    setLofiInfo((lofiInfo) => ({ ...lofiInfo, custom_image: "" }));
    setCustomImage("");
  }

  useEffect(() => {
    handleChangeBackground;
  }, [lofiInfo.custom_image, customImage]);

  // useEffect(() => {
  //   setLofiInfo((lofiInfo) => ({ ...lofiInfo, custom_image: customImage }));
  //   console.log(lofiInfo)
  // }, [customImage]);

  const debounceHandlePause = debounce(handlePause, 300);

  return (
    <div className="w-screen h-[10vh] bottom-0 left-0 absolute flex flex-row justify-between items-center gap-2 px-10 text-white z-40">
      <div className="w-full h-fit flex text-3xl flex-col">
        <div className="flex flex-row gap-4">
          <button className="text-white rounded-full" onClick={handleStart}>
            <i>{isPlaying ? <BsPauseFill /> : <BsPlayFill />}</i>
          </button>
          <button className="text-white rounded-full">
            <i className="text-2xl" onClick={handlePlaylist}>
              <RiPlayListFill />
            </i>
          </button>
          <div className="relative">
            <AnimatePresence>
              {isPomodoroSettings ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-slate-900/50 filter backdrop-blur-md w-80 min-h-40 absolute bottom-10 rounded text-lg font-mono p-4 flex flex-col gap-2 -right-48 sm:left-0"
                  onMouseLeave={exit}
                >
                  <fieldset className="w-fit h-fit text-center mb-4 border-white/30 border-b-[1px]">
                    <legend className="opacity-50">
                      Set custom background! (url)
                    </legend>
                    <label>
                      <input
                        type="url"
                        className="w-full focus:outline-none active:outline-none outline-none bg-transparent border-[1px] border-white"
                        value={customImage}
                        onClick={handleDeleteValue}
                        onChange={handleChangeBackground}
                      />
                      <div className="mb-10 mt-10 flex flex-col">
                        <button
                          onClick={setCustomBackground}
                          className="hover:scale-110 transition-all duration-150 "
                        >
                          Set background
                        </button>

                        <button
                          onClick={handleDefaultBackground}
                          className="hover:scale-110 transition-all duration-150 opacity-50"
                        >
                          Default background
                        </button>
                      </div>
                    </label>
                  </fieldset>
                  {!isPomodoro ? (
                    <>
                      <fieldset className="flex flex-row gap-4">
                        <legend className="opacity-50">
                          work/study duration (minutes){" "}
                        </legend>
                        <div>
                          <label
                            htmlFor=""
                            className="flex flex-row items-center gap-2"
                          >
                            <input
                              type="range"
                              min={25}
                              max={50}
                              defaultValue={pomodoro?.duration}
                              step={5}
                              name="duration"
                              onChange={onChange}
                              className="slider border-2 border-white/40 w-52 focus:outline-none active:outline-none outline-none border-none bg-slate-700"
                            />
                            <span className="bg-slate-700 w-5 h-5 text-sm rounded-full items-center flex justify-center">
                              {pomodoro?.duration}
                            </span>
                          </label>
                        </div>
                      </fieldset>
                      {/* <fieldset>
                    <legend className="opacity-50">sessions</legend>
                    <input
                      type="number"
                      min={1}
                      defaultValue={1}
                      onChange={onChange}
                      name="session"
                      className="border-2 border-white/40 px-2 w-44 focus:outline-none active:outline-none outline-none border-none bg-slate-700"
                    />
                  </fieldset> */}
                      <fieldset className="flex flex-row items-center gap-2">
                        <legend className="opacity-50">
                          break duration (minutes)
                        </legend>
                        <input
                          type="range"
                          min={5}
                          max={10}
                          step={1}
                          defaultValue={pomodoro?.break}
                          onChange={onChange}
                          name="break"
                          className="slider border-2 border-white/40 w-52 focus:outline-none active:outline-none outline-none border-none bg-slate-700"
                        />
                        <span className="bg-slate-700 w-5 h-5 text-sm rounded-full items-center flex justify-center">
                          {pomodoro?.break}
                        </span>
                      </fieldset>
                      <div className="w-full h-full items-center flex justify-center mt-4">
                        <button
                          className="p-1 hover:scale-110 duration-75 animate-pulse hover:text-green-400"
                          onMouseEnter={() => {
                            setReady(true);
                          }}
                          onMouseOut={() => {
                            setReady(false);
                          }}
                          onClick={handlePomodoro}
                        >
                          {ready ? "Hope you the best.~" : "Ok, im ready."}
                        </button>
                      </div>
                      <p className="text-sm opacity-50 border-t-[1px] border-white/50 p-1 mt-5">
                        Note: pause, continue, stop button will be here after
                        you start the timer.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col justify-start">
                        <div className="flex flex-col mb-5 gap-2">
                          <button
                            onClick={debounceHandlePause}
                            className={`${
                              isPause ? "text-green-400" : "text-red-400"
                            } w-fit m-auto hover:scale-110 duration-100`}
                          >
                            {isPause ? "Continue" : "Pause"}
                          </button>
                          <button
                            onClick={pomodoroFinished}
                            className="w-fit m-auto text-red-900 hover:scale-110 duration-100"
                          >
                            Stop timer
                          </button>
                        </div>
                        <p className="text-sm border-t-[1px] border-white/50 p-1 mt-5">
                          <a
                            href="https://twitter.com/zoneeoX"
                            target="_blank"
                            className="text-white brightness-100 cursor-pointer"
                          >
                            @zoneeoX
                          </a>{" "}
                          <span className="opacity-50">
                            was here 1/24/2023 and still probably is because i
                            have a big upcoming kind of like "SAT" test coming
                            up in 3 months.
                          </span>
                        </p>
                      </div>
                    </>
                  )}
                </motion.div>
              ) : (
                ""
              )}
            </AnimatePresence>
            <button
              className={`${
                isPomodoroSettings ? "text-[#FFFDD0]" : "text-white"
              } rounded-full`}
            >
              <i className="text-2xl" onClick={handlePomdoroSettings}>
                <MdTimer />
              </i>
            </button>
          </div>
          {/* <button className="text-white rounded-full">
            <i className="text-2xl" onClick={handlePlaylist}>
              <BsBook />
            </i>
          </button> */}
          <label htmlFor="" className="flex items-center gap-4 group">
            <input
              type="range"
              className="sm:w-96 xs:w-40 bg-slate-800 focus:bg-slate-800 active:bg-slate-800"
              min={0}
              max={1}
              step={0.001}
              defaultValue={0.5}
              onChange={(e) => setVolume(e)}
            />
            <p className="text-sm font-mono bg-slate-900 w-10 text-center h-10 flex group-hover:opacity-100 items-center justify-center rounded-full opacity-0 transition-all duration-200">{(playerVolume * 100).toFixed(0)}%</p>
          </label>
        </div>
        <p
          className="font-mono animate-pulse cursor-pointer sm:text-lg text-sm flex items-center"
          onClick={handlePlaylist}
        >
          {lofiInfo?.name || "lofi hip hop radio - beats to relax/study to"}
        </p>
      </div>
      {/* <div className="flex flex-row gap-3 items-center opacity-50">
        <i className="font-mono text-4xl cursor-pointer">
          <MdTimer />
        </i>
        <i className="font-mono text-4xl cursor-pointer">
          <BsBook />
        </i>
      </div> */}
    </div>
  );
};

export default NavBottom;
