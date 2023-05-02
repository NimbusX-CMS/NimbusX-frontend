import Sidebar from "@/components/admin/sidebar/sidebar";
import {FaGithub} from "react-icons/fa";
import SidebarSpace from "@/components/admin/sidebar/sidebar_space";
import Head from "next/head";

export default function Home() {
    return (
        <>
            <Head>
                <title>NimbusX - Admin</title>
            </Head>
            <main className="flex min-h-screen">
                <Sidebar spaces={[
                    <SidebarSpace key="Foodiee Webseite" title="Foodiee Webseite"/>
                ]}/>
                <div className="grid grid-rows-2 grid-cols-3 gap-9 p-9 ml-[20%]">
                    <div className="bg-admin-secondary-background p-4 rounded-2xl col-span-2">
                        <h2 className="text-3xl ">Hallo {'  '}
                            <span className="text-admin-primary font-bold">Alexander</span>,
                        </h2>
                        schön dich wieder zu sehen, hier kannst du Deine Instanz von <span
                        className="text-admin-primary">NimbusX</span> verwalten.
                    </div>
                    <div className="bg-admin-secondary-background p-4 rounded-2xl row-span-1">
                        <h2 className="text-admin-primary text-3xl">Links</h2>
                        Dich interessieren unsere Projekte und möchtest mehr darüber erfahren oder willst deinen Beitrag
                        dazu leisten? Besuche uns doch gerne auf diesen Plattformen:
                        <div className="mt-10">
                            <a href="https://github.com/NimbusX-CMS/" target="_blank"
                               className="flex flex-cols items-center gap-2 text-2xl">
                                <FaGithub/>
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
