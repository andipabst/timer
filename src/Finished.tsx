type FinishedProps = {
    until: number,
    onReset: () => void,
}

export function Finished({until, onReset}: FinishedProps) {

    const reset = () => onReset()

    return <div>
        <p>
            Finished
        </p>
        <button class='btn' onClick={reset}>reset</button>
    </div>
}