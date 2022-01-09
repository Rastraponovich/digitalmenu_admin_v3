import { createEvent, createStore, Event, guard, sample, Store } from "effector"

interface ICreatePaginationFactory {
    (cb?: Event<any>): CreatePaginationReturn
}
type CreatePaginationReturn = {
    setPages: Event<number>
    $pages: Store<number>
    $currentPage: Store<number>
    prevPage: Event<void>
    nextPage: Event<void>
    setPage: Event<number>
}

const createPaginationFactory: ICreatePaginationFactory = (event) => {
    const setPages = createEvent<number>()

    const $pages = createStore<number>(10).on(setPages, (state, value) => value)

    const $currentPage = createStore<number>(1).reset($pages)

    const setPage = createEvent<number>()

    sample({
        clock: setPage,
        fn: (value) => value,
        target: $currentPage,
    })

    const nextPage = createEvent()

    sample({
        clock: nextPage,
        source: $currentPage,
        fn: (value, _) => value + 1,
        target: setPage,
    })

    const prevPage = createEvent()

    sample({
        clock: prevPage,
        source: $currentPage,
        fn: (value, _) => value - 1,
        target: setPage,
    })

    sample({
        clock: event,

        target: nextPage,
    })

    return { setPages, $pages, $currentPage, prevPage, nextPage, setPage }
}

export { createPaginationFactory }
