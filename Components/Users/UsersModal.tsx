import { userActionPanel } from "@/features/users"
import { useEvent } from "effector-react"
import React, { memo, FC } from "react"
import UsersForm from "../Forms/UsersForm"
import Modal from "../Modal/Modal"

interface UsersModalProps {}

const UsersModal: FC<UsersModalProps> = () => {
    const handleCloseModal = useEvent(userActionPanel.closeItemForm)
    const handleSave = useEvent(userActionPanel.saveItem)
    const handleDelete = useEvent(userActionPanel.deleteItem)

    return (
        <Modal onClose={userActionPanel.closeItemForm} show={userActionPanel.$isOpenItemForm}>
            <UsersForm />
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

export default memo(UsersModal)
