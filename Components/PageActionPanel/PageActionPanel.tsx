import clsx from "clsx"
import React, { memo, FC, useEffect, useState } from "react"

interface PageActionPanelProps {}

const PageActionPanel: FC<PageActionPanelProps> = () => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (loading) setLoading((state) => !state)
        }, 3000)

        return () => clearTimeout(timer)
    }, [loading])
    return (
        <div className="btn-group">
            <button
                className={clsx("btn btn-accent ", loading && " loading btn-active")}
                onClick={() => setLoading(true)}
                disabled={loading}
            >
                {!loading && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                    </svg>
                )}
            </button>
            <button className="btn ">создать</button>
            <button className=" btn">удалить</button>
            <button className="btn ">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-4 stroke-current"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    ></path>
                </svg>
            </button>
        </div>
    )
}

export default memo(PageActionPanel)