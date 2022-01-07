import { TRole } from "@/types/roles.types"
import { AxiosResponse } from "axios"
import { createEffect, createEvent, createStore, forward, sample } from "effector"
import { createFactory } from "../dictonaryFactory"
import { RolesAPI } from "./rolesApi"

const getAllRolesFx = createEffect<any, AxiosResponse<TRole[]>, Error>(RolesAPI.getAll)
const getOneRoleFx = createEffect<TRole["id"], AxiosResponse<TRole>, Error>(RolesAPI.getOne)
const updateRoleFx = createEffect<TRole, AxiosResponse<TRole>, Error>(RolesAPI.update)
const deteleRoleFx = createEffect<TRole["id"], AxiosResponse<TRole>, Error>(RolesAPI.delete)
const postRoleFx = createEffect<TRole, AxiosResponse<TRole>, Error>(RolesAPI.save)

const $roles = createStore<TRole[]>([])
const getAllRoles = createEvent()

forward({
    from: getAllRoles,
    to: getAllRolesFx,
})

sample({
    clock: getAllRolesFx.doneData,
    fn: (res) => res.data,
    target: $roles,
})

const $currentRole = createStore<TRole>({} as TRole)

const getOneRole = createEvent<TRole["id"]>()

forward({
    from: getOneRole,
    to: getOneRoleFx,
})

sample({
    clock: getOneRoleFx.doneData,
    fn: (res) => res.data,
    target: $currentRole,
})

const rolesFactory = createFactory<TRole>({ endpoint: "/roles" })

export { $roles, getAllRoles, $currentRole, getOneRole, rolesFactory }
