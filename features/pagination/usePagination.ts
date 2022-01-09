import { Event } from "effector"
import { useMemo } from "react"
import { createPaginationFactory } from "."

export const usePagination = (cb?: Event<any>) => {
    console.log("render")

    const memoCreatePagination = useMemo(() => createPaginationFactory(cb), [createPaginationFactory])

    return memoCreatePagination
}
