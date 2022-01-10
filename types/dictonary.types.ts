import { Event, Store } from "effector"
import { ChangeEvent } from "react"

export type QueryParams = {
    paranoid?: boolean
    name?: string
    offset?: number
    limit?: number
}

export type CreateAPIProps = {
    endpoint: string
}

export type DictonaryFactoryProps = {
    endpoint: string
}
export interface DictonaryFactory {
    <T extends { id: number }>(props: DictonaryFactoryProps): DictonaryFactoryReturn<T>
}

export type DictonaryFactoryReturn<T extends { id: number }> = {
    $store: Store<T[]>
    getAll: Event<QueryParams | void>
    getOne: Event<T["id"]>
    $selected: Store<T>
    update: Event<void>
    deleteItem: Event<void>
    $pending: Store<boolean>
    add: Event<void>
    onChange: Event<ChangeEvent<HTMLInputElement>>
    onChangeCheckBox: Event<ChangeEvent<HTMLInputElement>>
    $isChangedItem: Store<boolean>
    $lengthItems: Store<number>
    restoreItem: Event<T["id"]>
    setParanoid: Event<void>
    $paranoid: Store<boolean>
}
