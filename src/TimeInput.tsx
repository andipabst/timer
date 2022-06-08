import {useState} from 'preact/hooks';

type TimeInputProps = {
    /**
     * Called when the timer should start.
     * @param duration the duration in milliseconds
     */
    onStart: (duration: number) => void
}

export function TimeInput({onStart}: TimeInputProps) {
    const [time, setTime] = useState("25:00")
    const [timeValid, setTimeValid] = useState(true)
    const timeRegex = /(\d{2}):(\d{2})/

    const start = () => {
        const match = timeRegex.exec(time)
        if (match != null) {
            const minute = parseInt(match[1])
            const second = parseInt(match[2])
            onStart(minute * 60 * 1000 + second * 1000)
        } else {
            setTimeValid(false)
        }
    }

    const onInput = (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
            setTime(e.target.value)
            setTimeValid(timeRegex.test(time))
        }
    }

    return (
        <div id="time-input">
            <input type="text" value={time} onInput={onInput}/>

            <button type="button" onClick={start}>Start</button>
        </div>
    )
}