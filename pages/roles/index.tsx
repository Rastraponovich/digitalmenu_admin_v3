import Layout from "@/Components/Layout/Layout"
import PageActionPanel from "@/Components/PageActionPanel/PageActionPanel"
import Pagination from "@/Components/Pagination/Pagination"
import RestaurantList from "@/Components/Restaurants/RestaurantList"
import RestaurantModal from "@/Components/Restaurants/RestaurantModal"
import RolesList from "@/Components/Roles/RolesList"
import RolesModal from "@/Components/Roles/RolesModal"
import List from "@/Components/UI/List/List"

import { $sortType, changeSortType } from "@/features/items"
import { $isOpenModal, toggleModal } from "@/features/modal"
import { usePagination } from "@/features/pagination/usePagination"
import { $pending, $roles, getAllRoles, rolesFactory, rolesPagination, rolesUI } from "@/features/roles"

import { toggleDrawer } from "@/features/sidebar"
import { SortTypes } from "@/types/ui.types"
import clsx from "clsx"
import { allSettled, Event, fork, serialize, Store } from "effector"
import { useEvent, useList, useStore } from "effector-react/scope"
import type { GetServerSideProps, NextPage } from "next"

import { FC, memo } from "react"

const RolesPage: NextPage = () => {
    const handleToggleDrawer = useEvent(toggleDrawer)
    const handleOpenModal = useEvent(toggleModal)

    const handleEdit = useEvent(rolesUI.editItem)
    const roles = useStore($roles)
    const { setPages, prevPage, nextPage, $pages, $currentPage, setPage } = usePagination(rolesPagination)

    console.log("render page")

    return (
        <Layout title="Список рестаранов">
            <main className="p-8 space-y-4">
                <div className="btn-group mb-4 self-center">
                    <button className="btn btn-primary " onClick={handleToggleDrawer}>
                        daisyUI Button
                    </button>

                    <button onClick={handleOpenModal} className="btn btn-primary modal-button">
                        open modal
                    </button>
                </div>
                <PageActionPanel
                    sort={changeSortType}
                    sortType={$sortType}
                    refresh={rolesUI.refreshItems}
                    checkAll={rolesUI.checkAllItems}
                    uncheckAll={rolesUI.unCheckAllItems}
                    create={rolesUI.createNewItem}
                />
                <RolesModal />
                <List>
                    {useList($roles, {
                        keys: [$pending, roles],
                        fn: (role) => (
                            <div
                                className={clsx(
                                    "card text-center shadow-lg card-compact col-span-1 card-bordered self-start",
                                    role.deletedAt !== null && "bg-orange-600"
                                )}
                            >
                                <div className="card-body">
                                    <h2 className="card-title">{role.altName}</h2>

                                    <span>Пользователи: {role.users?.length}</span>
                                </div>
                                <div className="card-actions justify-center mb-4">
                                    <button className="btn" onClick={() => handleEdit(role.id)}>
                                        Редактировать
                                    </button>
                                </div>
                            </div>
                        ),
                    })}
                </List>
                <Pagination
                    currentPage={$currentPage}
                    pages={$pages}
                    setPage={setPage}
                    prevPage={prevPage}
                    nextPage={nextPage}
                />
            </main>
        </Layout>
    )
}

export default memo(RolesPage)

export const getServerSideProps: GetServerSideProps = async () => {
    const scope = fork()

    await allSettled(getAllRoles, { scope, params: { paranoid: true, limit: 2, offset: 0 } })
    const serialized = serialize(scope)

    return {
        props: {
            initialState: serialized,
        },
    }
}
