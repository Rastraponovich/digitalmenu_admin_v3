import DishCard from "@/Components/DishCard/DishCard"
import Layout from "@/Components/Layout/Layout"
import Modal from "@/Components/Modal/Modal"
import PageActionPanel from "@/Components/PageActionPanel/PageActionPanel"
import Pagination from "@/Components/Pagination/Pagination"
import clsx from "clsx"
import { useEvent } from "effector-react/scope"
import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"

const Home: NextPage = () => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)

    const [pages, setPages] = useState(10)

    const handleOpenModal = () => setIsOpenModal(!isOpenModal)
    const handleOpenDrawer = useCallback(() => {
        setIsOpenDrawer(!isOpenDrawer)
    }, [isOpenDrawer])

    const handleSetCurrentPage = useCallback(
        (newPage: number) => {
            setCurrentPage(newPage)
        },
        [currentPage]
    )

    const handlePrevPage = useCallback(() => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }, [currentPage])

    const handleNextPage = useCallback(() => {
        if (currentPage < 10) setCurrentPage(currentPage + 1)
    }, [currentPage])

    return (
        <Layout openDrawer={handleOpenDrawer} isOpenDrawer={isOpenDrawer} isEnable={isOpenModal}>
            <main className="p-8">
                <div className="btn-group mb-4 self-center">
                    <button className="btn btn-primary " onClick={handleOpenDrawer}>
                        daisyUI Button
                    </button>

                    <button onClick={handleOpenModal} className="btn btn-primary modal-button">
                        open modal
                    </button>
                </div>

                <PageActionPanel />
                <Modal show={isOpenModal} onClick={handleOpenModal}>
                    asdasdsads
                </Modal>
                <div className="grid grid-cols-5 gap-4">
                    <DishCard isLoading={isOpenModal} />
                    <DishCard isLoading={isOpenModal} />
                    <DishCard isLoading={isOpenModal} />
                    <DishCard isLoading={isOpenModal} />
                </div>
                <div className="grow"></div>
                <Pagination
                    currentPage={currentPage}
                    pages={pages}
                    onClick={handleSetCurrentPage}
                    prevPage={handlePrevPage}
                    nextPage={handleNextPage}
                />
            </main>
        </Layout>
    )
}

export default Home
