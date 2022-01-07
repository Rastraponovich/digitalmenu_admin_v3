import { TRestaurant } from "@/types/restaurants.types"
import { AxiosResponse } from "axios"
import { createEffect, createEvent, createStore, forward, sample } from "effector"
import { createFactory } from "../dictonaryFactory"
import { changeProgressBarStatus } from "../progressBar"
import { RestaurantsAPI } from "./restaurantsApi"

const getAllRestaurantsFx = createEffect<any, AxiosResponse<TRestaurant[]>, Error>(RestaurantsAPI.getAll)
const getOneRestaurantFx = createEffect<TRestaurant["id"], AxiosResponse<TRestaurant>, Error>(RestaurantsAPI.getOne)

const $restaurants = createStore<TRestaurant[]>([])

const getAllRestaurants = createEvent()

forward({
    from: getAllRestaurants,
    to: getAllRestaurantsFx,
})

sample({
    clock: getAllRestaurantsFx.doneData,
    fn: (res) => res.data,
    target: $restaurants,
})

const $currentRestaurant = createStore<TRestaurant>({} as TRestaurant)

const getOneRestaurant = createEvent<TRestaurant["id"]>()

forward({
    from: getOneRestaurant,
    to: getOneRestaurantFx,
})

sample({
    clock: getOneRestaurantFx.doneData,
    fn: (res) => res.data,
    target: $currentRestaurant,
})

const restaurantFactory = createFactory<TRestaurant>({ endpoint: "/restaurants" })

export { $restaurants, getAllRestaurants, $currentRestaurant, getOneRestaurant, restaurantFactory }
