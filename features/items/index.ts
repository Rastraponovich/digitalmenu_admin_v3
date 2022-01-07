import { TSortType } from "@/types/ui.types"
import { createEvent, createStore, sample } from "effector"

const $sortType = createStore<TSortType>("MEDIUM")

const changeSortType = createEvent<TSortType>()

sample({
    clock: changeSortType,
    fn: (sortType) => sortType,
    target: $sortType,
})

export { $sortType, changeSortType }
