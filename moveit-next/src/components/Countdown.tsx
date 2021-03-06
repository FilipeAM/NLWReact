import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const { startNewChallenge } = useContext(ChallengesContext);


    const [time, setTime] = useState(0.1 * 60)
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60); //usado pra calcular os minutos
    const seconds = time % 60; //resto da divisão = segundos

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); // o split vai pegar a conversão e separar cada numero em uma array diferente, o padstart verifica se tem 2 caracteres e preenche com 0 a esquerda 
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


    function resetCountdown() {
        clearTimeout(countdownTimeout); //utilizando uma variavel global para evitar que se execute mais uma vez ex: clicou aos 24:58 e desceu para 24:57
        setIsActive(false);
        setTime(0.1 * 60);
    }


    function startCountdown() {
        setIsActive(true);

    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

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
                <button
                    disabled
                    className={styles.countdownButton}
                >
                    Ciclo encerrado
                </button>
            ) : (
                    <>
                        { isActive ? (
                            <button
                                type="button"
                                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                                onClick={resetCountdown}
                            >
                                Abandonar ciclo
                            </button>

                        ) : (
                                <button
                                    type="button"
                                    className={styles.countdownButton}
                                    onClick={startCountdown}
                                >
                                    Iniciar um ciclo
                                </button>
                            )}
                    </>

                )}


        </div >
    );
}