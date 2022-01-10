import { Event } from "effector"
import { useMemo } from "react"
import { createPaginationFactory, CreatePaginationReturn } from "."

// export const usePagination = (cb?: Event<any>) => {
//     console.log("render")

//     const memoCreatePagination = useMemo(() => createPaginationFactory(cb), [createPaginationFactory])

//     return memoCreatePagination
// }

export const usePagination = (factory: CreatePaginationReturn) => {
    console.log("render")

    const memoCreatePagination = useMemo(() => factory, [factory])

    return memoCreatePagination
}
