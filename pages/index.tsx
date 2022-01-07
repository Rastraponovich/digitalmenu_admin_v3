import Layout from "@/Components/Layout/Layout"
import { $isOpenModal, toggleModal } from "@/features/modal"
import { restaurantFactory } from "@/features/restaurants"
import { rolesFactory } from "@/features/roles"
import { toggleDrawer } from "@/features/sidebar"
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

const Home: NextPage = () => {
    const handleToggleDrawer = useEvent(toggleDrawer)
    const isOpenModal = useStore($isOpenModal)
    const handleOpenModal = useEvent(toggleModal)

    const { $store: $restaurants, $pending } = restaurantFactory

    return (
        <Layout>
            <main className="p-8">
                <div className="btn-group mb-4 self-center">
                    <button className="btn btn-primary " onClick={handleToggleDrawer}>
                        daisyUI Button
                    </button>

                    <button onClick={handleOpenModal} className="btn btn-primary modal-button">
                        open modal
                    </button>
                    <div className="w-full grid grid-cols-3">
                        {useList($restaurants, { keys: [$pending], fn: (rest) => <div>{rest.name}</div> })}
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
    const scope = fork()

    await allSettled(rolesFactory.getAll, { scope })
    await allSettled(restaurantFactory.getAll, { scope })

    const serialized = serialize(scope)

    return {
        props: {
            initialState: serialized,
        },
    }
}
