import { externalAPI } from "@/lib/api"
import { TDish } from "@/types/dishes.types"

const getAll = async () => await externalAPI.get("/directories")

export const DirectoriesAPI = {
    getAll,
}
