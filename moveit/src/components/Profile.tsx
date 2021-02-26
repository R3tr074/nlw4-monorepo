import React, { useContext } from "react";
import styles from "@styles/components/Profile.module.css";
import { ChallengeContext } from "src/context/ChallengesContext";

export const Profile: React.FC = () => {
  const { level } = useContext(ChallengeContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/R3tr074.png" alt="R3tr0" />
      <div>
        <strong>Jorge Buzeti</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
};
