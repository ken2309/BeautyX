export const formatOrgParam = (pathname: string) => {
    const sub_domain = pathname.slice(5, pathname.length);
    return sub_domain
}