import { TDirectory } from "@/types/directories.types"
import { AxiosResponse } from "axios"
import { createEffect, createEvent, createStore, forward, sample } from "effector"
import { DirectoriesAPI } from "./directoriesApi"

const getAllDirectoriesFx = createEffect<any, AxiosResponse<TDirectory[]>, Error>(DirectoriesAPI.getAll)

const getAllDirectories = createEvent()

const $directories = createStore<TDirectory[]>([])

forward({
    from: getAllDirectories,
    to: getAllDirectoriesFx,
})

sample({
    clock: getAllDirectoriesFx.doneData,
    fn: (res) => res.data,
    target: $directories,
})

export { $directories, getAllDirectories }
