import { Event } from "effector"
import { useEvent } from "effector-react"
import React, { memo, FC, ChangeEvent } from "react"

interface CheckboxProps {
    value: boolean
    onChange: Event<ChangeEvent<HTMLInputElement>>
    name: string
    disabled?: boolean
    rootClassName?: string
    titleClassName?: string
    title: string
    inputClassName?: string
}

const Checkbox: FC<CheckboxProps> = ({ name, title, onChange, value }) => {
    const handleChange = useEvent(onChange)
    return (
        <label className="flex flex-col">
            <span>{title}</span>
            <input checked={value} name={name} onChange={handleChange} className="text-black" type="checkbox" />
        </label>
    )
}

export default memo(Checkbox)
