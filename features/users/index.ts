import { AxiosResponse } from "axios"
import { createEffect, createEvent, createStore, forward, sample } from "effector"
import { UserAPI } from "./usersApi"

const getAllUsersFx = createEffect<never, AxiosResponse<any>, Error>(UserAPI.getAll)

const $users = createStore<any[]>([])

const getAllUsers = createEvent()
forward({
    from: getAllUsers,
    to: getAllUsersFx,
})

sample({ clock: getAllUsersFx.doneData, fn: (res) => res.data, target: $users })

export { $users, getAllUsers }
