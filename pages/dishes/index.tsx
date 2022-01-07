import CreateDishCard from "@/Components/DishCard/CreateDishCard"
import DishCard from "@/Components/DishCard/DishCard"
import DishForm from "@/Components/Forms/DishForm"
import Layout from "@/Components/Layout/Layout"
import Modal from "@/Components/Modal/Modal"
import PageActionPanel from "@/Components/PageActionPanel/PageActionPanel"
import Pagination from "@/Components/Pagination/Pagination"
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
import { toggleDrawer } from "@/features/sidebar"
import { getAllUsers } from "@/features/users"
import { SortTypes } from "@/types/ui.types"
import clsx from "clsx"
import { allSettled, Event, fork, serialize, Store } from "effector"
import { useEvent, useList, useStore } from "effector-react/scope"
import type { GetServerSideProps, NextPage } from "next"

import { FC } from "react"

interface FieldProps {
    status: Store<string>
    change: Event<any>
}
const Field: FC<FieldProps> = ({ status, change }) => {
    const value = useStore(status)
    const onChange = useEvent(change)

    return <input value={value} onChange={(e) => onChange(e.target.value)} className="text-black" />
}

const Dishes: NextPage = () => {
    const handleToggleDrawer = useEvent(toggleDrawer)
    const isOpenModal = useStore($isOpenModal)
    const handleOpenModal = useEvent(toggleModal)

    const handleChangeProgressBarStatus = useEvent(changeProgressBarStatus)

    const isEnablePB = useStore($isEnableProgressBar)

    const { setPages, prevPage, nextPage, $pages, $currentPage, setPage } = usePagination(toggleDrawer)

    const sortType = useStore($sortType)

    return (
        <Layout isEnable={isOpenModal}>
            <main className="p-8">
                <div className="btn-group mb-4 self-center">
                    <button className="btn btn-primary " onClick={handleToggleDrawer}>
                        daisyUI Button
                    </button>

                    <button onClick={handleOpenModal} className="btn btn-primary modal-button">
                        open modal
                    </button>
                </div>
                <PageActionPanel sort={changeSortType} sortType={$sortType} refresh={getAllDishes} />
                <button onClick={handleChangeProgressBarStatus}>{JSON.stringify(isEnablePB)}</button>

                <Modal show={$isOpenModal} onClose={toggleModal} onConfirm={toggleModal}>
                    showModal
                </Modal>
                <div className={clsx("grid grid-cols-5 gap-4", SortTypes[sortType])}>
                    <CreateDishCard />
                    {useList($dishes, { fn: (dish) => <DishCard isLoading={isOpenModal} /> })}
                </div>
                <div className="grow"></div>
                <Modal onClose={closeDishForm} show={$isOpenCurrentDish} onConfirm={saveDishTobase}>
                    <DishForm />
                </Modal>
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

export default Dishes

export const getServerSideProps: GetServerSideProps = async () => {
    const scope = fork()

    await allSettled(getAllDishes, { scope })
    await allSettled(getAllDirectories, { scope })
    await allSettled(getAllUsers, { scope })
    const serialized = serialize(scope)

    return {
        props: {
            initialState: serialized,
        },
    }
}
