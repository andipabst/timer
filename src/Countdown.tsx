import {useEffect} from "preact/hooks";
import {useCountdown} from "./useCountdown";

type CountdownProps = {
    until: number,
    onFinished: () => void,
    onReset: () => void,
}

export function Countdown({until, onFinished, onReset}: CountdownProps) {
    const [format, millis] = useCountdown(until)

    useEffect(() => {
        if (millis <= 0) {
            onFinished()
        }
    }, [millis])

    const reset = () => onReset()

    return <div>
        <p>
            {format}
        </p>
        <button class='btn' onClick={reset}>reset</button>
    </div>
}