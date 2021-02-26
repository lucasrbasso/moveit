import { useContext } from 'react';
import Cookies from 'js-cookie';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/pages/LoginScreen.module.css';

export default function LoginScreen() {
    const { name, inputName, closeLoginScreen } = useContext(ChallengesContext);

    function submit() {
        Cookies.set('name', name);
        closeLoginScreen();
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <img
                    className={styles.logo}
                    src="./icons/logo.svg"
                    alt="MoveIT"
                />
                <strong>Bem-vindo(a)</strong>
                <p>
                    <img src="icons/github.svg" alt="GitHub" />
                    Faça login com seu GitHub para começar
                </p>
                <form>
                    <input
                        placeholder="Digite seu username"
                        value={name}
                        type="text"
                        onChange={e => inputName(e)}
                    />
                    <button type="submit" onClick={submit}>
                        <img src="icons/arrow-composed.svg" alt="Arrow" />
                    </button>
                </form>
            </div>
        </div>
    );
}
