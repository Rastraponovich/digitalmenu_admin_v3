import { TDish } from "@/types/dishes.types"
import { AxiosResponse } from "axios"
import { createEffect, createEvent, createStore, forward, sample } from "effector"
import { ChangeEvent } from "react"
import { DishAPI } from "./dishesApi"

const newDish: TDish = {
    active: false,
    unit: "",
    type: "",
    reciept: "",
    priceTypeId: 0,
    price: 0,
    parentId: 1,
    out: "",
    name: "",
    image: "vercel.svg",
    description: "",
}

const saveDishToBaseFx = createEffect<TDish, AxiosResponse<any>, Error>(DishAPI.save)

const $dishes = createStore<TDish[]>([])
const getAllDishesFx = createEffect<never, AxiosResponse<TDish[]>, Error>(DishAPI.getAll)
const getAllDishes = createEvent()

forward({
    from: getAllDishes,
    to: getAllDishesFx,
})

sample({
    clock: getAllDishesFx.doneData,
    fn: (res) => res.data,
    target: $dishes,
})

const createNewDish = createEvent()

const $currentDish = createStore<TDish>(newDish).reset([createNewDish])

const changeDishValues = createEvent<ChangeEvent<HTMLInputElement>>()

sample({
    clock: changeDishValues,
    source: $currentDish,
    fn: (dish, event) => ({ ...dish, [event.target.name]: event.target.value }),
    target: $currentDish,
})
const closeDishForm = createEvent()
const $isOpenCurrentDish = createStore<boolean>(false)
    .on(createNewDish, (state, _) => !state)
    .on(closeDishForm, () => false)

saveDishToBaseFx.watch(console.log)

const saveDishTobase = createEvent()

sample({
    clock: saveDishTobase,
    source: $currentDish,
    target: saveDishToBaseFx,
})

export {
    $dishes,
    getAllDishes,
    createNewDish,
    $currentDish,
    changeDishValues,
    $isOpenCurrentDish,
    closeDishForm,
    saveDishTobase,
}
