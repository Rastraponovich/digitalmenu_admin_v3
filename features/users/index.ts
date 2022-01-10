import { TUser } from "@/types/users.types"
import { createEvent, guard, sample } from "effector"
import { createActionPanelFactory, createFactory } from "../dictonaryFactory"
import { createPaginationFactory } from "../pagination"

const newUser: TUser = {
    active: false,
    roleId: 0,
    password: "",
    email: "",
    firstName: "",
    image: "",
    lastName: "",
    id: 0,
}

const usersFactory = createFactory<TUser>({ endpoint: "/users" })

const userPagination = createPaginationFactory({ totalItems: usersFactory.$lengthItems, cb: usersFactory.getAll })

const userActionPanel = createActionPanelFactory<TUser>()

sample({
    clock: userActionPanel.editItem,
    fn: (id) => id,
    target: usersFactory.getOne,
})

guard({
    clock: userActionPanel.saveItem,
    source: userActionPanel.$isNewItem,
    filter: (isNew, _) => isNew,
    target: usersFactory.add,
})

guard({
    clock: userActionPanel.saveItem,
    source: userActionPanel.$isNewItem,
    filter: (isNew, _) => !isNew,
    target: usersFactory.update,
})

sample({ clock: userActionPanel.createNewItem, fn: () => newUser, target: usersFactory.$selected })

userActionPanel.$isOpenItemForm.reset([
    usersFactory.restoreItem,
    usersFactory.deleteItem,
    usersFactory.add,
    usersFactory.update,
])

const prependQueryForGetAll = sample({
    source: [userPagination.$itemsPerPage, userPagination.$currentPage],
    fn: ([limit, page]) => ({ offset: (page - 1) * limit, limit }),
})

sample({
    clock: userActionPanel.refreshItems,
    source: prependQueryForGetAll,
    target: usersFactory.getAll,
})

sample({
    clock: usersFactory.restoreItem,
    source: prependQueryForGetAll,
    target: usersFactory.getAll,
})

sample({
    clock: userActionPanel.deleteItem,
    target: usersFactory.deleteItem,
})

sample({
    clock: usersFactory.deleteItem,
    source: prependQueryForGetAll,
    target: usersFactory.getAll,
})

userPagination.$currentPage.reset(userActionPanel.refreshItems)

export { usersFactory, userPagination, userActionPanel }
