import { TUser } from "@/types/users.types"
import clsx from "clsx"
import { Event } from "effector"
import { useEvent } from "effector-react"
import React, { memo, FC } from "react"

interface UsersCardProps {
    user: TUser
    edit: Event<TUser["id"]>
}

const UsersCard: FC<UsersCardProps> = ({ user, edit }) => {
    const handleEdit = useEvent(edit)
    return (
        <div
            className={clsx(
                "card text-center shadow-lg card-compact col-span-1 card-bordered self-start",
                user.deletedAt !== null && "bg-orange-600"
            )}
        >
            <div className="card-body">
                <h2 className="card-title">
                    {user.firstName} {user.lastName}
                </h2>

                <span>Роль: {user.role?.altName}</span>
            </div>
            <div className="card-actions justify-center mb-4">
                <button className="btn" onClick={() => handleEdit(user.id)}>
                    Редактировать
                </button>
            </div>
        </div>
    )
}

export default memo(UsersCard)
