import clsx from "clsx"
import { Event, Store } from "effector"
import { useStore } from "effector-react"
import { useEvent } from "effector-react/scope"
import React, { memo, FC } from "react"

interface PaginationProps {
    currentPage: Store<number>
    pages: Store<number>
    setPage: Event<number>
    prevPage: Event<void>
    nextPage: Event<void>
}

const Pagination: FC<PaginationProps> = (props) => {
    const { setPage, prevPage, nextPage } = props

    const pages = useStore(props.pages)
    const currentPage = useStore(props.currentPage)

    const handleNextPage = useEvent(nextPage)
    const handlePrevPage = useEvent(prevPage)
    const handleSetPage = useEvent(setPage)

    return (
        <div className="btn-group self-center">
            <button className="btn btn-md" onClick={handlePrevPage} disabled={currentPage === 1}>
                Назад
            </button>
            {Array.from(Array(pages).keys()).map((number) => (
                <button
                    key={number}
                    className={clsx("btn btn-md", currentPage === number + 1 && "btn-active")}
                    onClick={() => handleSetPage(number + 1)}
                >
                    {number + 1}
                </button>
            ))}

            {/* <button className="btn btn-md btn-active">2</button>
            <button className="btn btn-md">3</button>
            <button className="btn btn-md">4</button> */}
            <button className="btn btn-md" onClick={handleNextPage} disabled={currentPage === pages}>
                Вперед
            </button>
        </div>
    )
}

export default memo(Pagination)
