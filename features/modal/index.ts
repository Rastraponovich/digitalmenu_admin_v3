import { createEvent, createStore } from "effector"

const toggleModal = createEvent()
const $isOpenModal = createStore<boolean>(false).on(toggleModal, (state, _) => !state)

export { toggleModal, $isOpenModal }
