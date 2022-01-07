import { externalAPI } from "@/lib/api"
import { TDish } from "@/types/dishes.types"
import { TRole } from "@/types/roles.types"

const getAllRolesAPI = async (params?: any) => await externalAPI.get("/roles", { params: { params } })
const getOneRolesAPI = async (id: TRole["id"]) => await externalAPI.get("/roles", { params: { id } })
const updateRoleAPI = async (role: TRole) => await externalAPI.patch("/roles", role, { params: { id: role.id } })
const deleteRoleAPI = async (id: TRole["id"]) => await externalAPI.delete("/roles", { params: { id } })
const postRoleAPI = async (role: TRole) => await externalAPI.post("/roles", role)

export const RolesAPI = {
    getAll: getAllRolesAPI,
    getOne: getOneRolesAPI,
    update: updateRoleAPI,
    delete: deleteRoleAPI,
    save: postRoleAPI,
}
