import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const { level, name, openLoginScreen } = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer}>
            <img src={`https://github.com/${name}.png`} alt={name} />
            <div>
                <strong>{name}</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                    <button type="button" onClick={openLoginScreen}>
                        Sair
                    </button>
                </p>
            </div>
        </div>
    );
}
