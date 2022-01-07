import { createDomain, createEffect, createEvent, createStore, Effect, forward, sample } from "effector"

export function createEffectStatus(name: string) {
    const $status = createStore("")

    const change = createEvent<string>()

    sample({
        clock: change,
        fn: (state) => state,
        target: $status,
    })

    $status.watch(console.log)

    return { $status, change }
}

export const $statuses = createStore<any[]>([])

export const addStatus = createEvent<string>()

sample({
    clock: addStatus,
    source: $statuses,
    fn: (arr, state) => [...arr, createEffectStatus(state)],
    target: $statuses,
})

export const $state = $statuses.map((status) => {
    const arr: any[] = []
    status.forEach((item) => arr.push(item.$status))

    return arr
})
