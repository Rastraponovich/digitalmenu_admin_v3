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

const InputField: FC<InputFieldProps> = ({ name, title, onChange, value, type = "text" }) => {
    const handleChange = useEvent(onChange)
    return (
        <label className="flex flex-col">
            <span>{title}</span>
            <input value={value} name={name} onChange={handleChange} className="text-black" type={type} />
        </label>
    )
}

export default memo(InputField)
