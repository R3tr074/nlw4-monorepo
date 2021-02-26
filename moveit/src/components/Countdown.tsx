import React, { useContext } from "react";
import styles from "@styles/components/Countdown.module.css";
import { CountdownContext } from "src/context/CountdownContext";
import { FiPlayCircle, FiXCircle as FiClose } from "react-icons/fi";

export const Countdown: React.FC = () => {
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    resetCountdown,
    startCountdown,
    totalTime,
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  const percentProgress = 100 - (seconds * 100) / totalTime;

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <>
              <button
                type="button"
                onClick={resetCountdown}
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              >
                Abandonar ciclo
                <FiClose size={22} />
              </button>
              <div
                className={styles.progressBar}
                style={{ width: `${percentProgress}%` }}
              />
            </>
          ) : (
            <button
              type="button"
              onClick={startCountdown}
              className={styles.countdownButton}
            >
              Iniciar um ciclo
              <FiPlayCircle size={22} />
            </button>
          )}
        </>
      )}
    </div>
  );
};
