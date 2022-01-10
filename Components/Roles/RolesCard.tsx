import { TRole } from "@/types/roles.types"
import clsx from "clsx"
import { Event } from "effector"
import { useEvent } from "effector-react"
import React, { memo, FC } from "react"

interface RolesCardProps {
    role: TRole
    edit: Event<TRole["id"]>
}

const RolesCard: FC<RolesCardProps> = ({ role, edit }) => {
    const handleEdit = useEvent(edit)
    return (
        <div
            className={clsx(
                "card text-center shadow-lg card-compact col-span-1 card-bordered self-start",
                role.deletedAt !== null && "bg-orange-600"
            )}
        >
            <div className="card-body">
                <h2 className="card-title">{role.altName}</h2>

                <span>Пользователи: {role.users?.length}</span>
            </div>
            <div className="card-actions justify-center mb-4">
                <button className="btn" onClick={() => handleEdit(role.id)}>
                    Редактировать
                </button>
            </div>
        </div>
    )
}

export default memo(RolesCard)
