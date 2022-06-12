import {Countdown} from "./Countdown";
import {TimeInput} from "./TimeInput";
import {useState} from "preact/hooks";
import useLocalStorageState from "./useLocalStorageState";
import {useRegisterSW} from 'virtual:pwa-register/preact'
import {Finished} from "./Finished";

enum State {
    Initial,
    Running,
    Finished,
}

export function App() {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered')
        },
        onRegisterError(error) {
            console.error('SW registration error', error)
        },
    })
    const [targetDate, setTargetDate] = useLocalStorageState('targetDate', 0);
    const [state, setState] = useState(targetDate === 0 ? State.Initial : State.Running);

    const start = (duration: number) => {
        Notification.requestPermission().then(result => {
            if (result === "granted") {
                console.log("notification permission granted")
            } else {
                // TODO show error in UI
                console.error("notification permission: " + result)
            }
        })

        setTargetDate(Date.now() + duration)
        setState(State.Running)
    }

    const finished = () => {
        setState(State.Finished)

        new Notification("Timer finished", {
            icon: '/icon.svg'
        })
    }

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
            return <Finished until={targetDate} onReset={reset}/>
    }
}
