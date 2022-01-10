import Layout from "@/Components/Layout/Layout"
import PageActionPanel from "@/Components/PageActionPanel/PageActionPanel"
import Pagination from "@/Components/Pagination/Pagination"
import RestaurantList from "@/Components/Restaurants/RestaurantList"
import RestaurantModal from "@/Components/Restaurants/RestaurantModal"
import RolesCard from "@/Components/Roles/RolesCard"
import RolesList from "@/Components/Roles/RolesList"
import RolesModal from "@/Components/Roles/RolesModal"
import List from "@/Components/UI/List/List"
import UsersCard from "@/Components/Users/UsersCard"
import UsersModal from "@/Components/Users/UsersModal"

import { $sortType, changeSortType } from "@/features/items"
import { $isOpenModal, toggleModal } from "@/features/modal"
import { usePagination } from "@/features/pagination/usePagination"
import { $pending, $roles, getAllRoles, rolesFactory, rolesPagination, rolesUI } from "@/features/roles"

import { toggleDrawer } from "@/features/sidebar"
import { userActionPanel, userPagination, usersFactory } from "@/features/users"
import { SortTypes } from "@/types/ui.types"
import clsx from "clsx"
import { allSettled, Event, fork, serialize, Store } from "effector"
import { useEvent, useList, useStore } from "effector-react/scope"
import type { GetServerSideProps, NextPage } from "next"

import { FC, memo } from "react"

const UsersPage: NextPage = () => {
    const items = useStore(usersFactory.$store)
    const { setPages, prevPage, nextPage, $pages, $currentPage, setPage } = usePagination(userPagination)

    return (
        <Layout title="Список рестаранов">
            <main className="p-8 space-y-4">
                <PageActionPanel
                    sort={changeSortType}
                    sortType={$sortType}
                    refresh={userActionPanel.refreshItems}
                    checkAll={userActionPanel.checkAllItems}
                    uncheckAll={userActionPanel.unCheckAllItems}
                    create={userActionPanel.createNewItem}
                />
                <UsersModal />
                <List>
                    {useList(usersFactory.$store, {
                        keys: [$pending, items],
                        fn: (user) => <UsersCard user={user} edit={userActionPanel.editItem} />,
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

export default memo(UsersPage)

export const getServerSideProps: GetServerSideProps = async () => {
    const scope = fork()
    const paranoid = scope.getState(usersFactory.$paranoid)
    const limit = scope.getState(userPagination.$itemsPerPage)
    await allSettled(usersFactory.getAll, { scope, params: { paranoid, limit, offset: 0 } })
    const serialized = serialize(scope)

    return {
        props: {
            initialState: serialized,
        },
    }
}
