import clsx from "clsx"
import { Event, Store } from "effector"
import { useEvent, useStore } from "effector-react"
import React, { memo, FC, ReactNode } from "react"

interface ModalProps {
    onClose: Event<void>
    show: Store<boolean>
    children: ReactNode
}

const Modal: FC<ModalProps> = ({ onClose, show, children }) => {
    const isOpen = useStore(show)

    return (
        <div className={clsx("modal", isOpen && "modal-open backdrop-blur-[2px]")}>
            <div className="modal-box">{children}</div>
        </div>
    )
}

export default memo(Modal)
