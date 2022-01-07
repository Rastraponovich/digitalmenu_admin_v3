import ProgressBar from "@/Components/ProgressBar/ProgressBar"
import { externalAPI } from "@/lib/api"
import { AxiosResponse } from "axios"
import { attach, createEffect, createEvent, createStore, Event, forward, sample, Store } from "effector"

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
}

interface IFactory {
    <T extends { id: number }>(props: FactoryProps): FactoryReturn<T>
}

const createFactory: IFactory = <T extends { id: number }>(props: FactoryProps) => {
    const getAllAPI = async (params?: any) => await externalAPI.get(props.endpoint, { params: { params } })
    const getOneAPI = async (id: T["id"]) => await externalAPI.get(props.endpoint, { params: { id } })
    const updateAPI = async (item: T) => await externalAPI.patch(props.endpoint, item, { params: { id: item.id } })
    const deleteAPI = async (id: T["id"]) => await externalAPI.delete(props.endpoint, { params: { id } })

    const $store = createStore<T[]>([])
    const getAll = createEvent()
    const getAllFx = createEffect<any, AxiosResponse<T[]>, Error>(getAllAPI)

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

    sample({
        clock: getOneFx.doneData,
        fn: (res) => res.data,
        target: $selected,
    })

    const update = createEvent()

    const updateFx = createEffect<T, AxiosResponse<T>, Error>(updateAPI)

    sample({
        clock: update,
        source: $selected,
        fn: (selected, _) => selected,
        target: updateFx,
    })

    sample({
        clock: updateFx.doneData,
        fn: (res) => res.data,
        target: $selected,
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

    return { $store, getAll, getOne, $selected, update, deleteItem, $pending }
}

export { createFactory }
