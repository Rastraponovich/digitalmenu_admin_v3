import { ChangeEvent } from "react"
import { AxiosResponse } from "axios"
import { attach, createApi, createEffect, createEvent, createStore, guard, sample } from "effector"

import { externalAPI } from "@/lib/api"
import { createActionPanelFactory } from "./actionPanelFactory"

import { DictonaryFactory, DictonaryFactoryProps, QueryParams } from "@/types/dictonary.types"

const createAPI = <T extends { id: number }>(props: DictonaryFactoryProps) => {
    const getAll = async (params?: QueryParams) => await externalAPI.get(props.endpoint, { params })
    const getOne = async (id: T["id"]) =>
        await externalAPI.get(`${props.endpoint}/${id}`, {
            params: { paranoid: true },
        })
    const update = async (item: T) =>
        await externalAPI.patch(`${props.endpoint}/${item.id}`, item, { params: { paranoid: true } })
    const remove = async (id: T["id"]) => await externalAPI.delete(`${props.endpoint}/${id}`)
    const restore = async (id: T["id"]) => await externalAPI.patch(`${props.endpoint}/restore/${id}`)
    const deleteAll = async () => await externalAPI.delete(`${props.endpoint}/all`)
    const post = async ({ id, ...item }: T) => await externalAPI.post(props.endpoint, item)

    const API = {
        getAll,
        getOne,
        update,
        remove,
        restore,
        deleteAll,
        post,
    }

    return API
}

const createFactory: DictonaryFactory = <T extends { id: number }>(props: DictonaryFactoryProps) => {
    const API = createAPI<T>(props)

    const APIFx = createEffect()

    const addFx = createEffect<T, AxiosResponse<T>, Error>(API.post)
    const restoreItemFx = createEffect<T["id"], any, Error>(API.restore)
    const updateFx = createEffect<T, AxiosResponse<T[]>, Error>(API.update)
    const getOneFx = createEffect<T["id"], AxiosResponse<T>, Error>(API.getOne)
    const deleteItemFx = createEffect<number, AxiosResponse<number>, Error>(API.remove)
    const deleteAllFx = createEffect<number[], AxiosResponse<number>, Error>(API.deleteAll)
    const getAllFx = createEffect<QueryParams | any, AxiosResponse<{ rows: T[]; count: number }>, Error>(API.getAll)

    const $pending = createStore<boolean>(false).on(
        [updateFx.pending, getAllFx.pending, getOneFx.pending, deleteItemFx.pending],
        (state, _) => !state
    )

    const $store = createStore<T[]>([]).on(getAllFx.doneData, (state, payload) => payload.data.rows)

    const getAll = createEvent<QueryParams | void>()

    const $lengthItems = createStore<number>(0).on(getAllFx.doneData, (state, payload) => payload.data.count)
    sample({
        clock: getAll,
        fn: (params) => params,
        target: getAllFx,
    })

    const getOne = createEvent<T["id"]>()

    sample({
        clock: getOne,
        fn: (query) => query,
        target: getOneFx,
    })

    const $selected = createStore<T>({} as T).on(getOneFx.doneData, (_, payload) => payload.data)

    const { onChange, onChangeCheckBox } = createApi($selected, {
        onChange: (state, e: ChangeEvent<HTMLInputElement>) => ({ ...state, [e.target.name]: e.target.value }),
        onChangeCheckBox: (state, e: ChangeEvent<HTMLInputElement>) => ({
            ...state,
            [e.target.name]: e.target.checked,
        }),
    })
    const $isChangedItem = createStore<boolean>(false)
        .reset(getAllFx.doneData)
        .on([onChange, onChangeCheckBox], () => true)

    const update = createEvent()

    const isAllowUpdate = guard({
        clock: update,
        source: $isChangedItem,
        filter: (allow) => allow,
    })

    sample({
        clock: isAllowUpdate,
        source: $selected,
        fn: (selected, _) => selected,
        target: updateFx,
    })

    sample({
        clock: updateFx.doneData,
        fn: (res) => res.data[0],
        target: $selected,
    })

    sample({
        clock: updateFx.finally,
        fn: (res) => {
            console.log(res)
            return { paranoid: true, offset: 0, limit: 2 }
        },
        target: getAll,
    })

    const deleteItem = createEvent()

    sample({
        clock: deleteItem,
        source: $selected,
        fn: (item, _) => item.id,
        target: deleteItemFx,
    })

    const add = createEvent()

    const isAllowAdd = guard({
        clock: add,
        source: $isChangedItem,
        filter: (allow) => allow,
    })

    sample({
        clock: isAllowAdd,
        source: $selected,
        fn: (selected, _) => selected,
        target: addFx,
    })

    sample({
        clock: addFx.finally,
        fn: (res) => null,
        target: getAll,
    })

    const deleteAll = createEvent()

    sample({
        clock: deleteAll,
        source: $store,
        fn: (store, _) => store.map((item) => item.id),
        target: deleteAllFx,
    })

    const restoreItem = createEvent<T["id"]>()

    sample({
        clock: restoreItem,
        fn: (id) => id,
        target: restoreItemFx,
    })

    return {
        $store,
        getAll,
        getOne,
        $selected,
        update,
        deleteItem,
        $pending,
        add,
        onChange,
        onChangeCheckBox,
        $isChangedItem,
        $lengthItems,
        restoreItem,
    }
}

export { createFactory, createActionPanelFactory }
