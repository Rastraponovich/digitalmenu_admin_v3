import { externalAPI } from "@/lib/api"
import { TRestaurant } from "@/types/restaurants.types"

const getAllRestaurantsAPI = async (params?: any) => await externalAPI.get("/restaurants", { params: { params } })

const getOneRestaurantsAPI = async (id: TRestaurant["id"]) => await externalAPI.get("/restaurants", { params: { id } })

export const RestaurantsAPI = {
    getAll: getAllRestaurantsAPI,
    getOne: getOneRestaurantsAPI,
}
