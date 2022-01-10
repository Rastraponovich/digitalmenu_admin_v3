import { QueryParams } from "@/types/dictonary.types"
import { createEvent, createStore, Event, guard, sample, Store } from "effector"

type ActionPanelFactoryReturn<T extends { id: number }> = {
    createNewItem: Event<void>
    editItem: Event<T["id"] & QueryParams>
    saveItem: Event<void>
    openItemForm: Event<void>
    closeItemForm: Event<void>
    $isNewItem: Store<boolean>
    $isOpenItemForm: Store<boolean>
    unCheckAllItems: Event<void>
    checkOneItem: Event<T>
    $checkedItems: Store<T[]>
    checkAllItems: Event<void>
    refreshItems: Event<void>
    deleteItem: Event<void>
    setShowDeleted: Event<void>
    $showDeleted: Store<boolean>
}

interface ActionPanelFactory {
    <T extends { id: number }>(): ActionPanelFactoryReturn<T>
}
export const createActionPanelFactory: ActionPanelFactory = <T extends { id: number }>() => {
    const createNewItem = createEvent()
    /**
     * вынес в модель, подумать о необходимости
     ** sample({
        clock: editItem,
        target: getOne)}
    
     */
    const editItem = createEvent<T["id"] & QueryParams>()

    const saveItem = createEvent()
    const openItemForm = createEvent()
    const closeItemForm = createEvent()
    /**
      вынес в модель, подумать о необходимости
     ** .reset([editItem, getOne])
    
     */
    const $isNewItem = createStore<boolean>(false)
        .on(createNewItem, () => true)
        .reset(editItem)

    const $isOpenItemForm = createStore<boolean>(false)
        .on([createNewItem, openItemForm, editItem], () => true)
        .reset(closeItemForm)

    //вынес в модель, а надо ли?
    // const $selectedItemId = createStore<T["id"]>(0)
    //     .reset(closeItemForm)
    //     .on($selected, (_, { id }) => id)

    const unCheckAllItems = createEvent()

    const $checkedItems = createStore<T[]>([]).reset(unCheckAllItems)

    /**
     вынес в модель а нужно ли?
     ** sample({
        * clock: checkAllItems,
         * source: $store,
         * fn: (store, _) => store,
         * target: $checkedItems
     })
     */
    const checkAllItems = createEvent<void>()

    const checkOneItem = createEvent<T>()

    sample({
        clock: checkOneItem,
        source: $checkedItems,
        fn: (checkedItems, checkedItem) => {
            const isExistIndex = checkedItems.some((item) => item.id === checkedItem.id)
            if (isExistIndex) return checkedItems.filter((item) => item.id !== checkedItem.id)
            return [...checkedItems, checkedItem]
        },

        target: $checkedItems,
    })
    /**
     * вынести в модель
     */
    // guard({
    //     clock: saveItem,
    //     source: $isNewItem,
    //     filter: (newItem, _) => newItem,
    //     target: add,
    // })
    /**
     * вынести в модель
     */
    // guard({
    //     clock: saveItem,
    //     source: $isNewItem,
    //     filter: (newItem, _) => !newItem,
    //     target: update,
    // })

    const refreshItems = createEvent()

    const deleteItem = createEvent<void>()

    const setShowDeleted = createEvent()
    const $showDeleted = createStore<boolean>(true).on(setShowDeleted, (state, _) => !state)

    return {
        createNewItem,
        editItem,
        saveItem,
        deleteItem,
        openItemForm,
        closeItemForm,
        $isNewItem,
        $isOpenItemForm,
        unCheckAllItems,
        checkOneItem,
        $checkedItems,
        checkAllItems,
        refreshItems,
        setShowDeleted,
        $showDeleted,
    }
}
