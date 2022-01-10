import { $currentRestaurant, onChangeCurrentRestaurant } from "@/features/restaurants"
import { $currentRole, rolesFactory } from "@/features/roles"
import clsx from "clsx"
import { useEvent, useStore } from "effector-react"
import React, { memo, FC } from "react"
import Checkbox from "../InputFiled/Checkbox"
import InputField from "../InputFiled/InputField"

interface RolesFormProps {}

const RolesForm: FC<RolesFormProps> = () => {
    const { name, altName, image, users, active, deletedAt, id } = useStore($currentRole)

    const handleRestore = useEvent(rolesFactory.restoreItem)

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <InputField value={name} onChange={rolesFactory.onChange} name="name" title={"Название"} />
            <InputField value={altName} onChange={rolesFactory.onChange} name="altName" title={"altName"} type="text" />
            <InputField value={image} onChange={rolesFactory.onChange} type="text" name="image" title={"image"} />
            <Checkbox value={active} onChange={rolesFactory.onChangeCheckBox} name="active" title={"active"} />
            <button
                className={clsx(deletedAt === null && "opacity-70 italic")}
                disabled={deletedAt === null}
                onClick={() => handleRestore(id)}
            >
                Восстановить
            </button>
        </form>
    )
}

export default memo(RolesForm)
