import { closeRestaurantForm, saveRestaurant, $isOpenRestaurantForm } from "@/features/restaurants"
import { useEvent } from "effector-react"
import React, { memo, FC } from "react"
import RestaurantForm from "../Forms/RestaurantForm"
import Modal from "../Modal/Modal"

interface RestaurantModalProps {}

const RestaurantModal: FC<RestaurantModalProps> = () => {
    const handleCloseModal = useEvent(closeRestaurantForm)
    const handleSave = useEvent(saveRestaurant)
    return (
        <Modal onClose={closeRestaurantForm} show={$isOpenRestaurantForm}>
            <RestaurantForm />
            <div className="modal-action">
                <button onClick={handleCloseModal} className="btn">
                    Отмена
                </button>
                <button onClick={handleSave} className="btn btn-primary">
                    Принять
                </button>
            </div>
        </Modal>
    )
}

export default memo(RestaurantModal)
