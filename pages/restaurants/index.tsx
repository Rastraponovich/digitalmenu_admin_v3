import CreateDishCard from "@/Components/DishCard/CreateDishCard"
import DishCard from "@/Components/DishCard/DishCard"
import DishForm from "@/Components/Forms/DishForm"
import RestaurantForm from "@/Components/Forms/RestaurantForm"
import Layout from "@/Components/Layout/Layout"
import Modal from "@/Components/Modal/Modal"
import PageActionPanel from "@/Components/PageActionPanel/PageActionPanel"
import Pagination from "@/Components/Pagination/Pagination"
import RestaurantCard from "@/Components/Restaurants/RestaurantCard"
import RestaurantList from "@/Components/Restaurants/RestaurantList"
import RestaurantModal from "@/Components/Restaurants/RestaurantModal"
import { getAllDirectories } from "@/features/directories"
import {
    $dishes,
    $isOpenCurrentDish,
    getAllDishes,
    createNewDish,
    closeDishForm,
    saveDishTobase,
} from "@/features/dishes"
import { $sortType, changeSortType } from "@/features/items"
import { $isOpenModal, toggleModal } from "@/features/modal"
import { usePagination } from "@/features/pagination/usePagination"
import { $isEnableProgressBar, changeProgressBarStatus } from "@/features/progressBar"
import {
    $checkedRestaurants,
    $isOpenRestaurantForm,
    $pending,
    $restaurants,
    checkAllRestaurants,
    closeRestaurantForm,
    createRestaurant,
    getAllRestaurants,
    saveRestaurant,
    uncheckAllRestaurants,
    updateRestaurant,
} from "@/features/restaurants"
import { toggleDrawer } from "@/features/sidebar"
import { getAllUsers } from "@/features/users"
import { SortTypes } from "@/types/ui.types"
import clsx from "clsx"
import { allSettled, Event, fork, serialize, Store } from "effector"
import { useEvent, useList, useStore } from "effector-react/scope"
import type { GetServerSideProps, NextPage } from "next"

import { FC, memo } from "react"

interface FieldProps {
    status: Store<string>
    change: Event<any>
}
const Field: FC<FieldProps> = ({ status, change }) => {
    const value = useStore(status)
    const onChange = useEvent(change)

    return <input value={value} onChange={(e) => onChange(e.target.value)} className="text-black" />
}

const RestaurantsPage: NextPage = () => {
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
                    refresh={getAllRestaurants}
                    checkAll={checkAllRestaurants}
                    uncheckAll={uncheckAllRestaurants}
                    create={createRestaurant}
                />
                <RestaurantList />
                <RestaurantModal />
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

export default memo(RestaurantsPage)

export const getServerSideProps: GetServerSideProps = async () => {
    const scope = fork()

    await allSettled(getAllRestaurants, { scope })
    const serialized = serialize(scope)

    return {
        props: {
            initialState: serialized,
        },
    }
}
