import { externalAPI } from "@/lib/api"
import { TDish } from "@/types/dishes.types"

const postDishAPI = async (dish: TDish) => await externalAPI.post("/dishes", dish)
const getAllDishesAPI = async () => await externalAPI.get("/dishes")

export const DishAPI = {
    save: postDishAPI,
    getAll: getAllDishesAPI,
}
