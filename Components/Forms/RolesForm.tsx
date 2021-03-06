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
            <div className="flex justify-between py-2 border-b items-center ">
                <h2 className="text-2xl uppercase divide-y-2">Роль: {name}</h2>
                <span className="text-sm">ID:{id}</span>
            </div>

            <InputField
                value={name}
                onChange={rolesFactory.onChange}
                name="name"
                title={"Название"}
                rootClassName="form-control"
                titleClassName="label-text label"
                inputClassName="input input-accent input-bordered"
            />
            <InputField
                value={altName}
                onChange={rolesFactory.onChange}
                name="altName"
                title={"altName"}
                type="text"
                rootClassName="form-control"
                titleClassName="label-text label"
                inputClassName="input input-accent input-bordered"
            />
            <InputField
                value={image}
                onChange={rolesFactory.onChange}
                type="text"
                name="image"
                title={"image"}
                rootClassName="form-control"
                titleClassName="label-text label"
                inputClassName="input input-accent input-bordered"
            />
            <Checkbox
                value={active}
                onChange={rolesFactory.onChangeCheckBox}
                name="active"
                title={"active"}
                inputClassName="checkbox checkbox-accent"
                labelClassName="label-text  mr-4"
                rootClassName="flex cursor-pointer items-center py-4"
            />
            <button
                className={clsx("btn btn-accent", deletedAt !== null && "btn-accent ")}
                disabled={deletedAt === null}
                onClick={() => handleRestore(id)}
            >
                Восстановить
            </button>
        </form>
    )
}

export default memo(RolesForm)
