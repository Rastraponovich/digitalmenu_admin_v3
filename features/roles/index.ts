import { TRole } from "@/types/roles.types"
import { createEffect, createEvent, createStore, forward, guard, sample } from "effector"
import { createFactory, createActionPanelFactory } from "../dictonaryFactory"
import { createPaginationFactory } from "../pagination"

const newRole: TRole = { id: 0, name: "new Role", altName: "Новая роль", image: "noimage.png", active: false }

const rolesFactory = createFactory<TRole>({ endpoint: "/roles" })

const rolesUI = createActionPanelFactory()

const { $store: $roles, getAll: getAllRoles, $selected: $currentRole, getOne: getOneRole, $pending } = rolesFactory

sample({
    clock: rolesUI.editItem,
    fn: (id) => id,
    target: rolesFactory.getOne,
})

guard({
    clock: rolesUI.saveItem,
    source: rolesUI.$isNewItem,
    filter: (isNew, _) => isNew,
    target: rolesFactory.add,
})

guard({
    clock: rolesUI.saveItem,
    source: rolesUI.$isNewItem,
    filter: (isNew, _) => !isNew,
    target: rolesFactory.update,
})

sample({ clock: rolesUI.createNewItem, fn: () => newRole, target: rolesFactory.$selected })

rolesUI.$isOpenItemForm.reset([
    rolesFactory.restoreItem,
    rolesFactory.deleteItem,
    rolesFactory.add,
    rolesFactory.update,
])

const rolesPagination = createPaginationFactory({ cb: rolesFactory.getAll, totalItems: rolesFactory.$lengthItems })

const prependQueryForGetAll = sample({
    source: [rolesPagination.$itemsPerPage, rolesPagination.$currentPage],
    fn: ([limit, page]) => ({ paranoid: true, offset: (page - 1) * limit, limit }),
})

sample({
    clock: rolesUI.refreshItems,
    source: prependQueryForGetAll,
    target: rolesFactory.getAll,
})

sample({
    clock: rolesFactory.restoreItem,
    source: prependQueryForGetAll,
    target: rolesFactory.getAll,
})

sample({
    clock: rolesUI.deleteItem,
    target: rolesFactory.deleteItem,
})

sample({
    clock: rolesFactory.deleteItem,
    source: prependQueryForGetAll,
    target: rolesFactory.getAll,
})

rolesPagination.$currentPage.reset(rolesUI.refreshItems)

export { $roles, getAllRoles, $currentRole, getOneRole, $pending, rolesUI, rolesFactory, rolesPagination }
