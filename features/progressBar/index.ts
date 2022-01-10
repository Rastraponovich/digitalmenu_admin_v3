import { createEffect, createEvent, createStore, forward, guard, sample, scopeBind } from "effector"

const changeProgressBarStatus = createEvent()
const setProgressBarStatus = createEvent<boolean>()

const startPB = createEvent()
const stopPB = createEvent()
const resetPB = createEvent()

const $isEnableProgressBar = createStore<boolean>(false)
    .on(changeProgressBarStatus, (state, _) => !state)
    .on(setProgressBarStatus, (state, payload) => payload)

const $progressValue = createStore<number>(0).reset([changeProgressBarStatus, stopPB, resetPB])
const changeProgressBarValue = createEvent<number>()

sample({
    clock: changeProgressBarValue,
    source: $progressValue,
    fn: (state, value) => state + value,
    target: $progressValue,
})

const startProgressBarFx = createEffect(() => {
    const callChangeProgressBarValue = scopeBind(changeProgressBarValue)
    const timer = setInterval(() => {
        callChangeProgressBarValue(Math.floor(Math.random() * 10) + Math.random() * 10)
    }, Math.floor(Math.random() * 10) + 300)

    return timer
})

const $timerId = createStore<any>(null)

sample({
    source: startProgressBarFx.doneData,
    target: $timerId,
})

const clearTimer = createEvent()

sample({
    clock: clearTimer,
    source: $timerId,
    fn: (timerId) => clearInterval(timerId),
})

guard({
    clock: $isEnableProgressBar,
    filter: (state) => state,
    target: startProgressBarFx,
})

guard({
    clock: $isEnableProgressBar,
    filter: (state) => !state,
    target: stopPB,
})

sample({
    clock: stopPB,
    target: clearTimer,
})

sample({
    clock: resetPB,
    fn: () => clearTimer(),
    target: startProgressBarFx,
})

guard({
    clock: changeProgressBarValue,
    source: $progressValue,
    filter: (state, _) => state >= 100,
    target: resetPB,
})

export { $isEnableProgressBar, $progressValue, startPB, stopPB, resetPB, changeProgressBarStatus, setProgressBarStatus }
