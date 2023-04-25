import SidebarSection from "@/components/core/sidebar_section";
import Button from "@/components/core/button";

export default function Sidebar() {
    return (
        <div className="bg-admin-secondary-background absolute h-screen w-[25%]">
            <div className="p-4">
                <h1 className="text-6xl">NimbusX</h1>
                <span className="text-sm ml-2">v1.0.0-SNAPSHOT</span>
            </div>

            <div className="flex flex-col gap-6 mx-4">
                <SidebarSection title="DreamStudio App" />
                <Button tittle="+ Neuen Space anlegen" />
            </div>
        </div>
    )
}