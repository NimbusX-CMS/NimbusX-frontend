import Sidebar from "@/components/admin/sidebar/sidebar";
import SidebarSpace, {SelectedOption} from "@/components/admin/sidebar/sidebar_space";

export default function SpaceSettings() {
    return (
        <main className="flex min-h-screen">
            <Sidebar spaces={[
                <SidebarSpace key="Foodiee Webseite" title="Foodiee Webseite"
                              selectedOption={SelectedOption.CONTENT_TYPES}/>
            ]}/>
            <div className="flex flex-col gap-32 p-9 ml-[20%]">

            </div>
        </main>
    )
}
