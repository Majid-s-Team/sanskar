export type GenericType = {
    [key: string]: any
}

export enum RouteTypes {
    AUTH = 'auth',
    PRIVATE = 'private',
    PUBLIC = 'public'
}

export type FilterOptionsType = {
    filter_key: string,
    filter_value: string
}