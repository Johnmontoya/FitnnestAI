import { lazy } from "react";

const pages = import.meta.glob("../features/**/pages/**/*.tsx");

export const lazyImport = (feature: string, site: string, pageName: string) => {
    const path = `../features/${feature}/pages/${site}/${pageName}.tsx`

    return lazy(pages[path] as () => Promise<any>);
}