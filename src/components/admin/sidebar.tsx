import SidebarSection from "@/components/core/sidebar_section";

export default function Sidebar() {
    return (
        <div className="bg-admin-secondary-background absolute h-screen w-[25%]">
            <div className="p-4">
                <h1 className="text-6xl">NimbusX</h1>
                <span className="text-sm ml-2">v1.0.0-SNAPSHOT</span>
            </div>

            <div className="p-4">
                <SidebarSection title="DreamStudio App" selected={true} />
            </div>
        </div>
    )
}