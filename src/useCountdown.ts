import {useEffect, useState} from 'preact/hooks';

const useCountdown = (targetDate: number) => {
    const targetDateMillis = targetDate;

    const [millisecondsRemaining, setMillisecondsRemaining] = useState(targetDateMillis - Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setMillisecondsRemaining(targetDateMillis - Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDateMillis]);

    return [formatTime(millisecondsRemaining), millisecondsRemaining];
};

const formatTime = (milliseconds: number) => {
    const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    const hourFormat = hours > 0 ? `${hours}:` : "";
    const minuteFormat = minutes >= 10 ? `${minutes}` : `0${minutes}`;
    const secondFormat = seconds >= 10 ? `${seconds}` : `0${seconds}`;
    return `${hourFormat}${minuteFormat}:${secondFormat}`
};

export {useCountdown};
