import { createEvent, createStore, sample } from "effector"

const toggleDrawer = createEvent()

const $isOpenDrawer = createStore<boolean>(false).on(toggleDrawer, (state, _) => !state)

export { toggleDrawer, $isOpenDrawer }
