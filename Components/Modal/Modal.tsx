import clsx from "clsx"
import { Event, Store } from "effector"
import { useEvent, useStore } from "effector-react"
import React, { memo, FC, ReactNode } from "react"

interface ModalProps {
    onClose: Event<void>
    show: Store<boolean>
    children: ReactNode
    onConfirm: Event<void>
}

const Modal: FC<ModalProps> = ({ onClose, show, children, onConfirm }) => {
    const isOpen = useStore(show)
    const handleClose = useEvent(onClose)
    const handleConfirm = useEvent(onConfirm)
    return (
        <div className={clsx("modal", isOpen && "modal-open backdrop-blur-[2px]")}>
            <div className="modal-box">
                {children}
                <div className="modal-action">
                    <button onClick={handleConfirm} className="btn btn-primary">
                        Accept
                    </button>
                    <button onClick={handleClose} className="btn">
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default memo(Modal)
