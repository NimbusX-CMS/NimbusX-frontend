import SidebarSpace, {SelectedOption} from "@/components/admin/sidebar/sidebar_space";
import PrimaryButton from "@/components/core/primary_button";
import SidebarSelect, {SideBarSelectType} from "@/components/admin/sidebar/sidebar_select";
import SidebarAccount from "@/components/admin/sidebar/sidebar_account";

export default function Sidebar() {
    return (
        <div className="bg-admin-secondary-background p-4 h-screen w-[25%] flex flex-col">
            <div className="p-2">
                <h1 className="text-6xl">NimbusX</h1>
                <span className="text-sm ml-2">v1.0.0-SNAPSHOT</span>
            </div>

            <div className="flex flex-col gap-6 mt-14">
                <span className="-mb-4 font-extrabold text-admin-text-secondary">SPACES</span>
                <SidebarSpace title="Foodiee Webseite" selectedOption={SelectedOption.SPACE_SETTINGS} />
                <PrimaryButton tittle="+ Neuen Space anlegen" />
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