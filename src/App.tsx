import {Countdown} from "./Countdown";
import {TimeInput} from "./TimeInput";
import {useState} from "preact/hooks";
import useLocalStorageState from "./useLocalStorageState";

enum State {
    Initial,
    Running,
    Finished,
}

export function App() {
    const [targetDate, setTargetDate] = useLocalStorageState('targetDate', 0);
    const [state, setState] = useState(targetDate === 0 ? State.Initial : State.Running);

    const start = (duration: number) => {
        setTargetDate(Date.now() + duration)
        setState(State.Running)
    }

    const finished = () => setState(State.Finished)

    const reset = () => {
        setTargetDate(0)
        setState(State.Initial)
    }

    switch (state) {
        case State.Initial:
            return <TimeInput onStart={start}/>
        case State.Running:
            return <Countdown until={targetDate} onFinished={finished} onReset={reset}/>
        case State.Finished:
            return <div>Finished</div>
    }
}
