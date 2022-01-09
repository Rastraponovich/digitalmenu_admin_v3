import { $sortType } from "@/features/items"
import { $checkedRestaurants, $pending, $restaurants } from "@/features/restaurants"
import { SortTypes, TSortType } from "@/types/ui.types"
import clsx from "clsx"
import { useList, useStore } from "effector-react"
import React, { memo, FC } from "react"
import RestaurantCard from "./RestaurantCard"

interface RestaurantListProps {}

const RestaurantList: FC<RestaurantListProps> = () => {
    const pending = useStore($pending)
    const checkedRestaurants = useStore($checkedRestaurants)

    const currentSortType = useStore($sortType)
    console.log("render list")

    return (
        <div className={clsx("grid grid-cols-5 gap-4 grow", SortTypes[currentSortType])}>
            {/* <CreateDishCard /> */}
            {useList($restaurants, {
                keys: [pending, checkedRestaurants],
                fn: (restaurant) => (
                    <RestaurantCard
                        isLoading={pending}
                        restaurant={restaurant}
                        checked={checkedRestaurants.some((item) => item.id === restaurant.id)}
                    />
                ),
            })}
        </div>
    )
}

export default memo(RestaurantList)
