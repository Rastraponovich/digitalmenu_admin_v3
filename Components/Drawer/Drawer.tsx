import { $isOpenDrawer, toggleDrawer } from "@/features/sidebar"
import clsx from "clsx"
import { useEvent, useStore } from "effector-react/scope"
import React, { memo, FC } from "react"

interface DrawerProps {}

const Drawer: FC<DrawerProps> = () => {
    const isOpenDrawer = useStore($isOpenDrawer)

    const handleToggleDrawer = useEvent(toggleDrawer)

    return (
        <aside
            className={clsx(
                "rounded-lg shadow bg-base-200 drawer h-screen fixed w-screen bg-transparent z-50",
                isOpenDrawer ? "translate-x-0" : "translate-x-[-100%]",
                "transition-all duration-500"
            )}
            onClick={handleToggleDrawer}
        >
            <div className="drawer-side max-w-sm">
                <button onClick={handleToggleDrawer}>Закрыть</button>
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
