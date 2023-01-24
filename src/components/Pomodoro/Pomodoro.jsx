import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import alarm from "../../assets/audio/alarm.mp3";
import { useSelector } from "react-redux";
import { finishedPomodoro } from "../../features/PostPomodoro";

const Pomodoro = ({ pomodoro }) => {
  const [pause, setPause] = useState(false);
  const { isFinished, isPause } = useSelector((store) => store.post);

  //store jika false jngn run if true run

  const [minutes, setMinutes] = useState(pomodoro.duration - 1);
  const [seconds, setSeconds] = useState(59);
  const [displayMessage, setDisplayMessage] = useState(false);

  // function pausePomodoro() {
  //   if (!isPause) {
  //     setSeconds((prevSecond) => prevSecond - 1);
  //     setInterval(interval, 1000);
  //   } else {
  //     clearInterval(interval);
  //   }
  // }

  let interval = null;
  useEffect(() => {
    !isPause
      ? (interval = setInterval(() => {
          clearInterval(interval);

          if (seconds === 0) {
            if (minutes !== 0) {
              setSeconds(59);
              setMinutes((prevState) => prevState - 1);
            } else {
              let minutes = displayMessage
                ? pomodoro.duration
                : pomodoro.break - 1;
              new Audio(alarm).play();
              let seconds = 59;

              setSeconds(seconds);
              setMinutes(minutes);
              setDisplayMessage(!displayMessage);
            }
          } else {
            setSeconds((prevState) => prevState - 1);
          }
        }, 1000))
      : clearInterval(interval);
  }, [seconds, isPause]);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 w-screen h-screen flex justify-center items-center z-40 flex-col gap-4"
    >
      {/* <h1 className="text-white font-mono text-5xl">
        {!isPomodoroFinished && (
          <>
            {timer.minute}:
            {timer.second > 9 ? timer.second : "0" + timer.second}
          </>
        )}
      </h1> */}
      <AnimatePresence>
        {displayMessage && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[#faf8d7] font-mono text-2xl text-center"
          >
            Break time~!, sip a cup of coffee or listen to shuush.lofi 😊
          </motion.h1>
        )}
      </AnimatePresence>
      <div className="text-center">
        <h1
          className={`${
            isPause ? "text-red-400" : "text-[#FFFDD0]"
          } font-mono text-5xl`}
        >
          {timerMinutes}:{timerSeconds}
        </h1>
        <span className="text-3xl font-mono text-red-400">
          {isPause && "Timer has been paused"}
        </span>
      </div>
    </motion.div>
  );
};

export default Pomodoro;
