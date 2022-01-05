import clsx from "clsx"
import React, { memo, FC, ReactNode } from "react"

interface ModalProps {
    onClick(): any
    show?: boolean
    children: ReactNode
}

const Modal: FC<ModalProps> = ({ onClick, show = false, children }) => {
    return (
        <div className={clsx("modal", show && "modal-open backdrop-blur-[2px]")}>
            <div className="modal-box">
                {children}
                <div className="modal-action">
                    <button onClick={onClick} className="btn btn-primary">
                        Accept
                    </button>
                    <button onClick={onClick} className="btn">
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default memo(Modal)
