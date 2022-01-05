import clsx from "clsx"
import React, { memo, FC } from "react"

interface DrawerProps {
    openDrawer(): void
    isOpenDrawer: boolean
}

const Drawer: FC<DrawerProps> = ({ openDrawer, isOpenDrawer }) => {
    return (
        <aside
            className={clsx(
                "rounded-lg shadow bg-base-200 drawer h-screen fixed w-screen bg-transparent z-50",
                isOpenDrawer ? "translate-x-0" : "translate-x-[-100%]",
                "transition-all duration-500"
            )}
            onClick={openDrawer}
        >
            {/* <div className="w-screen h-screen" onClick={openDrawer}></div> */}

            <div className="drawer-side max-w-sm">
                <button onClick={openDrawer}>Закрыть</button>
                <ul className="menu p-4 overflow-y-auto bg-base-100 text-base-content h-screen">
                    <li>
                        <a>Menu Item</a>
                    </li>
                    <li>
                        <a>Menu Item</a>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default memo(Drawer)
