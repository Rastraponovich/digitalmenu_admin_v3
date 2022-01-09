import { $currentDish, changeDishValues } from "@/features/dishes"
import { $currentRestaurant, onChangeCurrentRestaurant } from "@/features/restaurants"
import { useEvent, useStore } from "effector-react"
import React, { memo, FC } from "react"
import InputField from "../InputFiled/InputField"

interface RestaurantFormProps {}

const RestaurantForm: FC<RestaurantFormProps> = () => {
    const { name, code, priceTypeId, rk7prefId, users, active } = useStore($currentRestaurant)

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <InputField value={name} onChange={onChangeCurrentRestaurant} name="name" title={"Название"} />
            <InputField
                value={code}
                onChange={onChangeCurrentRestaurant}
                name="code"
                title={"Код ресторана"}
                type="number"
            />
            <InputField
                value={rk7prefId}
                onChange={onChangeCurrentRestaurant}
                type="number"
                name="rk7prefId"
                title={"настройки ресторана"}
            />
            <InputField
                value={priceTypeId}
                onChange={onChangeCurrentRestaurant}
                type="number"
                name="priceTypeId"
                title={"Тип цен ресторана"}
            />
        </form>
    )
}

export default memo(RestaurantForm)
