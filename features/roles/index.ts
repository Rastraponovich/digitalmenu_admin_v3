import { TRole } from "@/types/roles.types"
import { createEffect, createEvent, createStore, forward, sample } from "effector"
import { createFactory, createUIEventsFactory } from "../dictonaryFactory"

const rolesFactory = createFactory<TRole>({ endpoint: "/roles" })

const rolesUI = createUIEventsFactory()

const { $store: $roles, getAll: getAllRoles, $selected: $currentRole, getOne: getOneRole, $pending } = rolesFactory

const { checkAllItems: checkAllRoles, unCheckAllItems: uncheckAllRoles, createNewItem: createRole } = rolesUI

export { $roles, getAllRoles, $currentRole, getOneRole, checkAllRoles, uncheckAllRoles, createRole, $pending }
