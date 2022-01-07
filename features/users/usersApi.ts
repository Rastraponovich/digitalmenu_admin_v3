import { externalAPI } from "@/lib/api"

const getAllUsersAPI = async () => externalAPI.get("/users/all")

export const UserAPI = {
    getAll: getAllUsersAPI,
}
