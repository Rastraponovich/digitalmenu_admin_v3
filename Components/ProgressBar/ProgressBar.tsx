import React, { memo, FC, useState, useEffect } from "react"

interface ProgressBarProps {
    isEnable: boolean
}

const ProgressBar: FC<ProgressBarProps> = ({ isEnable }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (isEnable) {
            const timer = setInterval(() => {
                if (count < 100) {
                    setCount((sec) => sec + 15)
                }
            }, 1000)

            return () => clearInterval(timer)
        }
    }, [isEnable])

    useEffect(() => {
        if (count > 100) setCount(0)
    }, [count])

    useEffect(() => {
        if (!isEnable) setCount(0)
    }, [isEnable])

    return (
        <div className="artboard flex items-start">
            <progress className="rounded-none progress progress-secondary" value={count} max="100"></progress>
        </div>
    )
}

export default memo(ProgressBar)
