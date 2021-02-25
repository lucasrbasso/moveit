import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const { level } = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer}>
            <img
                src="https://media-exp1.licdn.com/dms/image/C4E03AQHxKFKD6u-68A/profile-displayphoto-shrink_800_800/0/1610828999294?e=1619654400&v=beta&t=Miq4Q0W8yFWIjlwns3HaX4apy6uOxnO527xhx5zN0o0"
                alt="Lucas Basso"
            />
            <div>
                <strong>Lucas Basso</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                </p>
            </div>
        </div>
    );
}
