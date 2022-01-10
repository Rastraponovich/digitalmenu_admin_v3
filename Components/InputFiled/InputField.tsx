import clsx from "clsx"
import { Event } from "effector"
import { useEvent } from "effector-react"
import React, { memo, FC, ChangeEvent } from "react"

interface InputFieldProps {
    value: string | number
    onChange: Event<ChangeEvent<HTMLInputElement>>
    name: string
    disabled?: boolean
    rootClassName?: string
    titleClassName?: string
    title: string
    inputClassName?: string
    type?: string
}

const InputField: FC<InputFieldProps> = ({
    name,
    title,
    onChange,
    value,
    type = "text",
    titleClassName,
    inputClassName,
    rootClassName,
}) => {
    const handleChange = useEvent(onChange)
    return (
        <label className={clsx("flex flex-col", rootClassName)}>
            <span className={clsx(titleClassName)}>{title}</span>
            <input
                value={value}
                name={name}
                onChange={handleChange}
                className={clsx("text-accent", inputClassName)}
                type={type}
                placeholder={title}
            />
        </label>
    )
}

export default memo(InputField)
