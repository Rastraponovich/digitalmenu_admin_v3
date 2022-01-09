import { createEvent, createStore, Event, guard, sample, Store } from "effector"

type UIEventsFactoryReturn<T extends { id: number }> = {
    createNewItem: Event<void>
    editItem: Event<T["id"]>
    saveItem: Event<void>
    openItemForm: Event<void>
    closeItemForm: Event<void>
    $isNewItem: Store<boolean>
    $isOpenItemForm: Store<boolean>
    unCheckAllItems: Event<void>
    checkOneItem: Event<T>
    $checkedItems: Store<T[]>
    checkAllItems: Event<void>
}

interface IUIEventFactory {
    <T extends { id: number }>(): UIEventsFactoryReturn<T>
}
export const createUIEventsFactory: IUIEventFactory = <T extends { id: number }>() => {
    const createNewItem = createEvent()
    /**
     * вынес в модель, подумать о необходимости
     ** sample({
        clock: editItem,
        target: getOne)}
    
     */
    const editItem = createEvent<T["id"]>()

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
    const checkAllItems = createEvent()

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

    return {
        createNewItem,
        editItem,
        saveItem,
        openItemForm,
        closeItemForm,
        $isNewItem,
        $isOpenItemForm,
        unCheckAllItems,
        checkOneItem,
        $checkedItems,
        checkAllItems,
    }
}
