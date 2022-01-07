import { $currentDish, changeDishValues } from "@/features/dishes"
import { useEvent, useStore } from "effector-react"
import React, { memo, FC } from "react"
import InputField from "../InputFiled/InputField"

interface DishFormProps {}

const DishForm: FC<DishFormProps> = () => {
    const { name } = useStore($currentDish)
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <InputField value={name} onChange={changeDishValues} name="name" title={"Название"} />
        </form>
    )
}

export default memo(DishForm)
