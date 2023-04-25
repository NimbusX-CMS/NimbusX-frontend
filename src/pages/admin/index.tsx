import Sidebar from "@/components/admin/sidebar/sidebar";
import TextField from "@/components/core/text-field";

export default function Home() {
    return (
        <main className="flex">
            <Sidebar />
            <div className="p-4">
                <TextField title="Space Name" placeholder="Name..."/>
                <div className="flex flex-col border-2 rounded-xl px-4 py-1">
                    <input type="checkbox" className=""/>
                </div>
            </div>
        </main>
    )
}
