import { $sortType } from "@/features/items"
import { SortTypes, TSortType } from "@/types/ui.types"
import clsx from "clsx"
import { Store } from "effector"
import { useStore } from "effector-react"
import React, { memo, FC, ReactNode } from "react"

interface ListProps {
    children: ReactNode
}

const List: FC<ListProps> = ({ children }) => {
    const sortType = useStore($sortType)

    return (
        <div
            className={clsx(
                "grid  grow",
                sortType === "SMALL" && "grid-cols-8",
                sortType === "LARGE" && "grid-cols-2",
                sortType === "MEDIUM" && "grid-cols-4"
            )}
        >
            {children}
        </div>
    )
}

export default memo(List)
