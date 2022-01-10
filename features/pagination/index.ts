import { QueryParams } from "@/types/dictonary.types"
import { createEvent, createStore, Event, guard, sample, Store } from "effector"

type PaginationProps = {
    cb: Event<QueryParams | void>
    totalItems: Store<number>
}

interface ICreatePaginationFactory {
    (props: PaginationProps): CreatePaginationReturn
}
export type CreatePaginationReturn = {
    setPages: Event<number>
    $pages: Store<number>
    $currentPage: Store<number>
    prevPage: Event<void>
    nextPage: Event<void>
    setPage: Event<number>
    $itemsPerPage: Store<number>
}

const createPaginationFactory: ICreatePaginationFactory = ({ cb, totalItems }) => {
    const $itemsPerPage = createStore<number>(2)

    const setPages = createEvent<number>()

    const $pages = createStore<number>(0).on(setPages, (state, value) => value)

    sample({
        clock: totalItems,
        source: $itemsPerPage,
        fn: (itemsPerPage, items) => Math.ceil(items / itemsPerPage),
        target: $pages,
    })

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
        clock: setPage,
        source: $itemsPerPage,
        fn: (limit, page) => ({ paranoid: true, offset: (page - 1) * limit, limit }),
        target: cb,
    })

    return { setPages, $pages, $currentPage, prevPage, nextPage, setPage, $itemsPerPage }
}

export { createPaginationFactory }
