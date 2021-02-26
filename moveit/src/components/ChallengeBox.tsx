import React, { useContext } from "react";
import styles from "@styles/components/ChallengeBox.module.css";
import { ChallengeContext } from "src/context/ChallengesContext";
import { CountdownContext } from "src/context/CountdownContext";

export const ChallengeBox: React.FC = () => {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(
    ChallengeContext
  );
  const { resetCountdown } = useContext(CountdownContext);
  const hasActiveChallenge = !!activeChallenge;

  function handleChallengeSucceed() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {hasActiveChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              onClick={handleChallengeFailed}
              className={styles.challengeFailedButton}
              type="button"
            >
              Falhei
            </button>
            <button
              onClick={handleChallengeSucceed}
              className={styles.challengeSucceedButton}
              type="button"
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            <span>Avançe de level completando desafios</span>
          </p>
        </div>
      )}
    </div>
  );
};
