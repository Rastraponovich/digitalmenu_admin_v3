import { externalAPI } from "@/lib/api"
import { AxiosResponse } from "axios"

import { createUIEventsFactory } from "./uiEventsFactory"
import {
    attach,
    createApi,
    createEffect,
    createEvent,
    createStore,
    Event,
    forward,
    guard,
    sample,
    Store,
} from "effector"
import { ChangeEvent } from "react"

type FactoryProps = {
    endpoint: string
}

type FactoryReturn<T extends { id: number }> = {
    $store: Store<T[]>
    getAll: Event<void>
    getOne: Event<T["id"]>
    $selected: Store<T>
    update: Event<void>
    deleteItem: Event<void>
    $pending: Store<boolean>
    add: Event<void>
    onChange: Event<ChangeEvent<HTMLInputElement>>
    onChangeCheckBox: Event<ChangeEvent<HTMLInputElement>>
}

interface IFactory {
    <T extends { id: number }>(props: FactoryProps): FactoryReturn<T>
}

const createFactory: IFactory = <T extends { id: number }>(props: FactoryProps) => {
    const getAllAPI = async (params?: any) => await externalAPI.get(props.endpoint, { params: { params } })
    const getOneAPI = async (id: T["id"]) => await externalAPI.get(`${props.endpoint}/${id}`)
    const updateAPI = async (item: T) =>
        await externalAPI.patch<any, AxiosResponse<T[]>, T>(`${props.endpoint}/${item.id}`, item)
    const deleteAPI = async (id: T["id"]) => await externalAPI.delete(`${props.endpoint}/${id}`)
    const deleteAllAPI = async (id: T["id"][]) => await externalAPI.delete(`${props.endpoint}/all`)

    const postAPI = async (item: T) => await externalAPI.post(props.endpoint, item)

    const getAllFx = createEffect<any, AxiosResponse<T[]>, Error>(getAllAPI)
    const $store = createStore<T[]>([]).reset(getAllFx.pending)
    const getAll = createEvent<void>()

    forward({
        from: getAll,
        to: getAllFx,
    })

    sample({ clock: getAllFx.doneData, fn: (res) => res.data, target: $store })

    const getOne = createEvent<T["id"]>()
    const getOneFx = createEffect<T["id"], AxiosResponse<T>, Error>(getOneAPI)

    forward({
        from: getOne,
        to: getOneFx,
    })

    const $selected = createStore<T>({} as T)

    const { onChange, onChangeCheckBox } = createApi($selected, {
        onChange: (state, e: ChangeEvent<HTMLInputElement>) => ({ ...state, [e.target.name]: e.target.value }),
        onChangeCheckBox: (state, e: ChangeEvent<HTMLInputElement>) => ({
            ...state,
            [e.target.name]: e.target.checked,
        }),
    })

    sample({
        clock: getOneFx.doneData,
        fn: (res) => res.data,
        target: $selected,
    })

    const update = createEvent()

    const updateFx = createEffect<T, AxiosResponse<T[]>, Error>(updateAPI)

    sample({
        clock: update,
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
        fn: (res) => null,
        target: getAll,
    })

    const deleteItem = createEvent()

    const deleteItemFx = createEffect<T["id"], AxiosResponse<number>, Error>(deleteAPI)

    const attachDeleteItemFx = attach({
        source: $selected,
        effect: deleteItemFx,
        mapParams: (_, item) => item.id,
    })

    forward({
        from: deleteItem,
        to: attachDeleteItemFx,
    })

    const $pending = createStore<boolean>(false).on(
        [updateFx.pending, getAllFx.pending, getOneFx.pending, deleteItemFx.pending],
        (state, _) => !state
    )

    const addFx = createEffect<T, AxiosResponse<T>, Error>(postAPI)
    const add = createEvent()

    sample({
        clock: add,
        source: $selected,
        target: addFx,
    })

    const deleteAll = createEvent()

    const deleteAllFx = createEffect<number[], AxiosResponse<number>, Error>(deleteAllAPI)

    sample({
        clock: deleteAll,
        source: $store,
        fn: (store, _) => store.map((item) => item.id),
        target: deleteAllFx,
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
    }
}

export { createFactory, createUIEventsFactory }
