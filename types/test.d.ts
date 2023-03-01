export interface BreadCrumbsItem {
    title: string;
    disabled?: boolean;
    href?: string;
    to?: any
}

export interface FbDocument {
    title: string;
    id?: string
    to?: any
    description?: string
    created_at?: string
    updated_at?: string
}