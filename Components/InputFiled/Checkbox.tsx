import { Event } from "effector"
import { useEvent } from "effector-react"
import React, { memo, FC, ChangeEvent } from "react"

interface CheckboxProps {
    value: boolean
    onChange: Event<ChangeEvent<HTMLInputElement>>
    name: string
    disabled?: boolean
    rootClassName?: string
    labelClassName?: string
    title: string
    inputClassName?: string
}

const Checkbox: FC<CheckboxProps> = ({
    name,
    title,
    onChange,
    value,
    inputClassName,
    labelClassName,
    rootClassName,
}) => {
    const handleChange = useEvent(onChange)
    return (
        <label className={rootClassName}>
            <span className={labelClassName}>{title}</span>
            <input checked={value} name={name} onChange={handleChange} className={inputClassName} type="checkbox" />
        </label>
    )
}

export default memo(Checkbox)
