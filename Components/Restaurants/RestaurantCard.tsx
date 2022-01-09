import {
    $checkedRestaurants,
    $selectedRestaurantId,
    checkRestaurant,
    editRestaurant,
    getOneRestaurant,
} from "@/features/restaurants"
import { TRestaurant } from "@/types/restaurants.types"
import clsx from "clsx"
import { useEvent, useStore } from "effector-react"
import React, { memo, FC } from "react"

interface RestaurantCardProps {
    isLoading: boolean
    restaurant: TRestaurant
    checked?: boolean
}

const RestaurantCard: FC<RestaurantCardProps> = ({ isLoading, restaurant, checked }) => {
    const { name, users, rk7prefId, active, priceTypeId, id, code } = restaurant

    const handleClick = useEvent(checkRestaurant)
    const handleEdit = useEvent(editRestaurant)

    console.log("render card")

    return (
        <div
            className={clsx(
                "card text-center shadow-lg card-compact col-span-1 card-bordered self-start",
                checked && "bg-orange-700"
            )}
        >
            <div className="card-body">
                <h2 className="card-title">Ресторан: {name}</h2>
                <span>Код ресторана: {code}</span>
                <span>Статус: {active ? "Активен" : "Неактивен"}</span>

                <div className="justify-center card-actions">
                    <button
                        className={clsx("btn  btn-accent", !checked && "btn-outline")}
                        onClick={() => handleClick(restaurant)}
                    >
                        {!checked ? "выбрать" : "анвыбрать"}
                    </button>
                    <button
                        className={clsx("btn btn-outline btn-accent", isLoading && "loading")}
                        disabled={isLoading}
                        onClick={() => handleEdit(id)}
                    >
                        Редактировать
                    </button>
                </div>
            </div>
        </div>
    )
}

export default memo(RestaurantCard)
