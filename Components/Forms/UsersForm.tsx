import { usersFactory } from "@/features/users"
import clsx from "clsx"
import { useEvent, useStore } from "effector-react"
import React, { memo, FC } from "react"
import Checkbox from "../InputFiled/Checkbox"
import InputField from "../InputFiled/InputField"

interface UsersFormProps {}

const UsersForm: FC<UsersFormProps> = () => {
    const { email, firstName, lastName, image, active, deletedAt, id } = useStore(usersFactory.$selected)

    const handleRestore = useEvent(usersFactory.restoreItem)

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex justify-between py-2 border-b items-center ">
                <h2 className="text-2xl uppercase divide-y-2">Роль: {name}</h2>
                <span className="text-sm">ID:{id}</span>
            </div>

            <InputField
                value={firstName}
                onChange={usersFactory.onChange}
                name="firstName"
                title={"firstName"}
                rootClassName="form-control"
                titleClassName="label-text label"
                inputClassName="input input-accent input-bordered"
            />
            <InputField
                value={lastName}
                onChange={usersFactory.onChange}
                name="lastName"
                title={"lastName"}
                type="text"
                rootClassName="form-control"
                titleClassName="label-text label"
                inputClassName="input input-accent input-bordered"
            />
            <InputField
                value={email}
                onChange={usersFactory.onChange}
                type="text"
                name="email"
                title={"email"}
                rootClassName="form-control"
                titleClassName="label-text label"
                inputClassName="input input-accent input-bordered"
            />
            <Checkbox
                value={active}
                onChange={usersFactory.onChangeCheckBox}
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

export default memo(UsersForm)
