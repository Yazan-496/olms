import { useLayout } from "layout";
import { ReactElement } from "react";


export interface CanCallProps {
    children?: ReactElement | string | any,
    permission: string
}
export default function CanCall({
    children,
    permission
}: CanCallProps) {

    const { user } = useLayout()

    const permissionGranted = !user.access_token ? false : user?.permissions?.some((one) => (one === permission) || (one === "SUPER_ADMIN"));

    if (!permissionGranted) return <></>
    else return <>{children}</>;
}