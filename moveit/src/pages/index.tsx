import Head from "next/head";
import { GetServerSideProps } from "next";

import { Profile } from "@components/Profile";
import { Countdown } from "src/components/Countdown";
import { ChallengeBox } from "src/components/ChallengeBox";
import { ExperienceBar } from "@components/ExperienceBar";
import { CompletedChallenges } from "src/components/CompletedChallenges";
import { ChallengeProvider } from "@context/ChallengesContext";

import styles from "@styles/pages/Home.module.css";
import { CountdownProvider } from "src/context/CountdownContext";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home({
  level,
  currentExperience,
  challengesCompleted,
}: HomeProps) {
  return (
    <ChallengeProvider
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengeProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { level, currentExperience, challengesCompleted } = context.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
