import PrimaryButton from "@/components/core/input/primary_button";
import SidebarSelect, {SideBarSelectType} from "@/components/admin/sidebar/sidebar_select";
import SidebarAccount from "@/components/admin/sidebar/sidebar_account";
import {ReactElement} from "react";
import SidebarSpace from "@/components/admin/sidebar/sidebar_space";
import Link from "next/link";

export default function Sidebar({spaces}: SidebarProps) {
    spaces.forEach(space => {
        if (space!.type !== SidebarSpace) {
            throw new Error('Elements in spaces should be of type "SidebarSpace".')
        }
    })

    return (
        <div className="bg-admin-secondary-background p-4 h-screen min-w-[20%] flex flex-col fixed">
            <Link href="/admin" className="p-2 text-left">
                <h1 className="text-6xl">NimbusX</h1>
                <span className="text-sm ml-2">v1.0.0-SNAPSHOT</span>
            </Link>

            <div className="flex flex-col gap-6 mt-14">
                <span className="-mb-4 font-extrabold text-admin-text-secondary">SPACES</span>
                {spaces}
                <PrimaryButton tittle="+ Neuen Space anlegen"/>
            </div>

            <div className="flex flex-col justify-end gap-1 mb-5 h-full">
                <span className="mb-2 font-extrabold text-admin-text-secondary">EINSTELLUNGEN</span>
                <SidebarSelect type={SideBarSelectType.USER}/>
                <SidebarSelect type={SideBarSelectType.WEBHOOK}/>
            </div>

            <SidebarAccount displayName="Alexander Aust" role="Super Admin"/>
        </div>
    )
}

type SidebarProps = {
    spaces: Array<ReactElement>
}