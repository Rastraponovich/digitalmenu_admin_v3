import { TimeStampModel } from "./common.types"
import { TRestaurant } from "./restaurants.types"
import { TRole } from "./roles.types"

export interface TUser extends TimeStampModel {
    id: number
    active: boolean
    email: string
    firstName: string
    image: string
    lastName: string
    password: string
    refreshToken?: string
    restaurants?: TRestaurant[]
    role?: TRole
    roleId: TRole["id"]
}
