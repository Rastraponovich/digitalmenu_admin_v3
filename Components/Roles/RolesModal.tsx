import { rolesFactory, rolesUI } from "@/features/roles"
import { useEvent } from "effector-react"
import React, { memo, FC } from "react"
import RestaurantForm from "../Forms/RestaurantForm"
import RolesForm from "../Forms/RolesForm"
import Modal from "../Modal/Modal"

interface RolesModalProps {}

const RolesModal: FC<RolesModalProps> = () => {
    const handleCloseModal = useEvent(rolesUI.closeItemForm)
    const handleSave = useEvent(rolesUI.saveItem)
    const handleDelete = useEvent(rolesUI.deleteItem)

    return (
        <Modal onClose={rolesUI.closeItemForm} show={rolesUI.$isOpenItemForm}>
            <RolesForm />
            <div className="modal-action">
                <button onClick={handleDelete} className="btn">
                    Удалить
                </button>
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

export default memo(RolesModal)
