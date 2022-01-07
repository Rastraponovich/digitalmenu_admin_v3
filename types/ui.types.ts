enum ESortTypes {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE",
}
export type TSortType = "SMALL" | "MEDIUM" | "LARGE"

export type TSortTypes = {
    [key in ESortTypes]: string
}

export const SortTypes: TSortTypes = { LARGE: "grid-cols-2", SMALL: "grid-cols-6", MEDIUM: "grid-cols-4" }
