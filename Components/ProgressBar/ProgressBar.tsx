import { $progressValue, resetPB, startPB, stopPB } from "@/features/progressBar"
import { useStore } from "effector-react"
import { useEvent } from "effector-react/scope"
import React, { memo, FC, useState, useEffect, useMemo } from "react"

interface ProgressBarProps {}

const ProgressBar: FC<ProgressBarProps> = () => {
    const $count = useStore($progressValue)

    const count = useMemo(() => $count, [$count])

    return (
        <div className="artboard flex items-start">
            <progress className="rounded-none progress progress-secondary" value={count} max="100"></progress>
        </div>
    )
}

export default memo(ProgressBar)
