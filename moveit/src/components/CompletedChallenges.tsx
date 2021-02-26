import React, { useContext } from "react";
import styles from "@styles/components/CompletedChallenges.module.css";
import { ChallengeContext } from "src/context/ChallengesContext";
import { FiAward } from "react-icons/fi";

export const CompletedChallenges: React.FC = () => {
  const { challengesCompleted } = useContext(ChallengeContext);

  return (
    <div className={styles.completedChallengesContainer}>
      <span>
        <FiAward size={16} />
        Desafios Completos
      </span>

      <span>{challengesCompleted}</span>
    </div>
  );
};
