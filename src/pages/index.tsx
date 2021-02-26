import React from 'react';
import { GetServerSideProps } from 'next';

import Head from 'next/head';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import ExperienceBar from '../components/ExperienceBar';
import { ChallengeBox } from '../components/ChallengeBox';
import { Profile } from '../components/Profile';

import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

import styles from '../styles/pages/Home.module.css';

interface HomeProps {
    name: string;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export default function Home(props: HomeProps) {
    return (
        <>
            <div className={styles.container}>
                <ChallengesProvider
                    name={props.name}
                    level={props.level}
                    currentExperience={props.currentExperience}
                    challengesCompleted={props.challengesCompleted}
                >
                    <Head>
                        <title>Início | move.it</title>
                    </Head>

                    <ExperienceBar />
                    <CountdownProvider>
                        <section className={styles.section}>
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
                </ChallengesProvider>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    const {
        name,
        level,
        currentExperience,
        challengesCompleted,
    } = ctx.req.cookies;

    return {
        props: {
            name: name || null,
            level: Number(level),
            currentExperience: Number(currentExperience),
            challengesCompleted: Number(challengesCompleted),
        },
    };
};
