import Layout from "@/Components/Layout/Layout"
import PageActionPanel from "@/Components/PageActionPanel/PageActionPanel"
import Pagination from "@/Components/Pagination/Pagination"
import RestaurantList from "@/Components/Restaurants/RestaurantList"
import RestaurantModal from "@/Components/Restaurants/RestaurantModal"
import RolesList from "@/Components/Roles/RolesList"
import List from "@/Components/UI/List/List"

import { $sortType, changeSortType } from "@/features/items"
import { $isOpenModal, toggleModal } from "@/features/modal"
import { usePagination } from "@/features/pagination/usePagination"
import { $pending, $roles, checkAllRoles, createRole, getAllRoles, uncheckAllRoles } from "@/features/roles"

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

    const { setPages, prevPage, nextPage, $pages, $currentPage, setPage } = usePagination(toggleDrawer)

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
                    refresh={getAllRoles}
                    checkAll={checkAllRoles}
                    uncheckAll={uncheckAllRoles}
                    create={createRole}
                />
                {/* <RestaurantList />
                <RestaurantModal /> */}
                <List>{useList($roles, { keys: [$pending], fn: (role) => <div>{role.name}</div> })}</List>
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

    await allSettled(getAllRoles, { scope })
    const serialized = serialize(scope)

    return {
        props: {
            initialState: serialized,
        },
    }
}
