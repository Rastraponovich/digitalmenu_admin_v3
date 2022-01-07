import { createNewDish } from "@/features/dishes"
import clsx from "clsx"
import { useEvent } from "effector-react/scope"
import Image from "next/image"
import React, { memo, FC, useRef } from "react"

interface CreateDishCardProps {}

const CreateDishCard: FC<CreateDishCardProps> = () => {
    const isLoading = false

    const handleClick = useEvent(createNewDish)

    return (
        <div className="card text-center shadow-lg card-compact col-span-1 card-bordered">
            <figure>
                <Image
                    src="/vercel.svg"
                    height={250}
                    loading="lazy"
                    blurDataURL="/vercel.svg"
                    placeholder="blur"
                    width={400}
                    layout="responsive"
                    // priority={false}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">shadow, center, padding</h2>
                <p className="truncate">
                    Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed
                    molestiae voluptates incidunt iure sapiente.
                </p>
                <div className="justify-center card-actions">
                    <button
                        className={clsx("btn btn-outline btn-accent", isLoading && "loading")}
                        disabled={isLoading}
                        onClick={handleClick}
                    >
                        создать
                    </button>
                </div>
            </div>
        </div>
    )
}

export default memo(CreateDishCard)
