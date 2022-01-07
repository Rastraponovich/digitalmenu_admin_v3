import { Event } from "effector"
import { useMemo } from "react"
import { createPagination } from "."

export const usePagination = (cb?: Event<any>) => {
    console.log("render")

    const memoCreatePagination = useMemo(() => createPagination(cb), [createPagination])

    return memoCreatePagination
}
