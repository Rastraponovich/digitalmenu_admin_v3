import React, { memo, FC } from "react"

import { useList } from "effector-react"

import { $roles, $pending } from "@/features/roles"
import List from "../UI/List/List"

interface RolesListProps {}

const RolesList: FC<RolesListProps> = () => {
    return <List>{useList($roles, { keys: [$pending], fn: (role) => <div>{role.name}</div> })}</List>
}

export default memo(RolesList)
