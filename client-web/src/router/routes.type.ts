export interface IRouterMeta {
    name?: string;
    path: string;
    feature?: string;
    site?: string;
    page?: string;
    file?: string;
    requiresLayout?: boolean;
    isAdmin?: boolean;
}

export type RouterMetaType = {
    [key: string]: IRouterMeta;
};