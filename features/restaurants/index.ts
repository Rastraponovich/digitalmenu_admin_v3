import { TRestaurant } from "@/types/restaurants.types"
import { createEvent, createStore, forward, guard, sample, scopeBind, split } from "effector"
import { createFactory, createUIEventsFactory } from "../dictonaryFactory"

const newRestaurant: TRestaurant = {
    id: 0,
    name: "",
    active: false,
    code: 0,
    priceTypeId: 0,
    rk7prefId: 0,
} as TRestaurant

const restaurantFactory = createFactory<TRestaurant>({ endpoint: "/restaurants" })

const {
    $pending,
    $selected: $currentRestaurant,
    $store: $restaurants,
    deleteItem: deleteRestaurant,
    getAll: getAllRestaurants,
    getOne: getOneRestaurant,
    update: updateRestaurant,
    add: addRestaurant,
    onChange: onChangeCurrentRestaurant,
    onChangeCheckBox: onChangeCheckBoxCurrentRestaurant,
} = restaurantFactory

const uiFactory = createUIEventsFactory()

const {
    unCheckAllItems: uncheckAllRestaurants,
    saveItem: saveRestaurant,
    openItemForm: openRestaurantForm,
    editItem: editRestaurant,
    createNewItem: createRestaurant,
    closeItemForm: closeRestaurantForm,
    checkOneItem: checkRestaurant,
    checkAllItems: checkAllRestaurants,
    $isOpenItemForm: $isOpenRestaurantForm,
    $isNewItem: $isNewRestaurant,
    $checkedItems: $checkedRestaurants,
} = uiFactory

sample({ clock: editRestaurant, target: getOneRestaurant })

sample({
    clock: createRestaurant,
    fn: () => newRestaurant,
    target: $currentRestaurant,
})

$isNewRestaurant.reset(getOneRestaurant)

const $selectedRestaurantId = createStore<TRestaurant["id"]>(0)
    .reset(closeRestaurantForm)
    .on($currentRestaurant, (_, { id }) => id)

sample({
    clock: checkAllRestaurants,
    source: $restaurants,
    fn: (store, _) => store,
    target: $checkedRestaurants,
})

/** вилка сохранения


*/
guard({
    clock: saveRestaurant,
    source: $isNewRestaurant,
    filter: (isNewRestaurant, _) => isNewRestaurant,
    target: addRestaurant,
})

guard({
    clock: saveRestaurant,
    source: $isNewRestaurant,
    filter: (isNewRestaurant, _) => !isNewRestaurant,
    target: updateRestaurant,
})

export {
    //STORES
    $restaurants,
    $currentRestaurant,
    $isOpenRestaurantForm,
    $selectedRestaurantId,
    $pending,
    $isNewRestaurant,
    //CRUD
    getAllRestaurants,
    getOneRestaurant,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    //EDIT
    createRestaurant,
    editRestaurant,
    saveRestaurant,
    onChangeCurrentRestaurant,
    onChangeCheckBoxCurrentRestaurant,
    openRestaurantForm,
    closeRestaurantForm,
    restaurantFactory,
    //ui
    $checkedRestaurants,
    uncheckAllRestaurants,
    checkAllRestaurants,
    checkRestaurant,
}
