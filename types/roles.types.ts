import { TimeStampModel } from "./common.types"

export interface TRole extends TimeStampModel {
    id: number
    name: string
    altName: string
    image: string
    users?: any[]
    active: boolean
}
