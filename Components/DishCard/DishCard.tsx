import clsx from "clsx"
import Image from "next/image"
import React, { memo, FC } from "react"

interface DishCardProps {
    isLoading: boolean
}

const DishCard: FC<DishCardProps> = ({ isLoading }) => {
    return (
        <div className="card text-center shadow-lg card-compact col-span-1 card-bordered">
            <figure>
                <Image src="https://picsum.photos/id/1005/400/250" height={250} width={400} layout="responsive" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">shadow, center, padding</h2>
                <p className="truncate">
                    Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed
                    molestiae voluptates incidunt iure sapiente.
                </p>
                <div className="justify-center card-actions">
                    <button className={clsx("btn btn-outline btn-accent", isLoading && "loading")} disabled={isLoading}>
                        More info
                    </button>
                </div>
            </div>
        </div>
    )
}

export default memo(DishCard)
