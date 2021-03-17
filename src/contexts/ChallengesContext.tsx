/* eslint-disable no-new */
import React, { useState, createContext, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import LoginScreen from '../pages/LoginScreen';

declare const self: any;
declare const clients: any;

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    name: string;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
    inputName: (event) => void;
    closeLoginScreen: () => void;
    openLoginScreen: () => void;
}

interface ChallengesProviderProps {
    name: string;
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
    children,
    ...rest
}: ChallengesProviderProps) {
    const [name, setName] = useState(rest.name ?? '');
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(
        rest.currentExperience ?? 0,
    );
    const [challengesCompleted, setChallengesCompleted] = useState(
        rest.challengesCompleted ?? 0,
    );
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    const [isLoginScreenOpen, setIsLoginScreenOpen] = useState(true);

    // eslint-disable-next-line no-restricted-properties
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    function inputName(event) {
        setName(event.target.value);
    }

    function closeLoginScreen() {
        setIsLoginScreenOpen(false);
    }

    function openLoginScreen() {
        setIsLoginScreenOpen(true);
        Cookies.set('name', '');
    }

    useEffect(() => {
        if (name !== '') {
            setIsLoginScreenOpen(false);
        }
    }, []);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(
            Math.random() * challenges.length,
        );

        const challenge = challenges[randomChallengeIndex];

        new Audio('/notification.mp3').play();

        setActiveChallenge(challenge);

        Notification.requestPermission(function (result) {
            if (result === 'granted') {
                navigator.serviceWorker.ready.then(function (registration) {
                    registration.showNotification('MoveIt 😎', {
                        actions: [
                            {
                                action: 'fechar',
                                title: 'Fechar',
                            },
                        ],
                        body: `Novo desafio Valendo ${challenge.amount} xp!`,
                        icon: 'favicon.png',
                        vibrate: [300, 100, 400],
                        tag: 'notification-sample',
                    });
                });
            }
        });
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience -= experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                challengesCompleted,
                experienceToNextLevel,
                levelUp,
                name,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal,
                inputName,
                closeLoginScreen,
                openLoginScreen,
            }}
        >
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
            {isLoginScreenOpen && <LoginScreen />}
        </ChallengesContext.Provider>
    );
}
