export type TDirectory = {
    id: number | never
    name: string
    icon: string
    image: string
    parentId: TDirectory["id"]
    parent: TDirectory
    active: boolean
}
