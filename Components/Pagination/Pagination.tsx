import clsx from "clsx"
import React, { memo, FC } from "react"

interface PaginationProps {
    currentPage: number
    pages: number
    onClick(pageNumber: number): void
    prevPage(): void
    nextPage(): void
}

const Pagination: FC<PaginationProps> = ({ currentPage, pages, onClick, prevPage, nextPage }) => {
    return (
        <div className="btn-group self-center">
            <button className="btn btn-md" onClick={prevPage} disabled={currentPage === 1}>
                Назад
            </button>
            {Array.from(Array(pages).keys()).map((number) => (
                <button
                    key={number}
                    className={clsx("btn btn-md", currentPage === number + 1 && "btn-active")}
                    onClick={() => onClick(number + 1)}
                >
                    {number + 1}
                </button>
            ))}

            {/* <button className="btn btn-md btn-active">2</button>
            <button className="btn btn-md">3</button>
            <button className="btn btn-md">4</button> */}
            <button className="btn btn-md" onClick={nextPage} disabled={currentPage === pages}>
                Вперед
            </button>
        </div>
    )
}

export default memo(Pagination)
