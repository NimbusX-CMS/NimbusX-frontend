import {HiOutlineUserCircle} from "react-icons/hi";
import {MdWebhook} from "react-icons/md";
import styles from "@/styles/components/admin/sidebar/sidebar_section.module.css";

export default function SidebarSelect({type, selected}: SideBarSelectProps) {
    return (
        <button className="p-2 pl-4 rounded-lg relative flex items-center gap-2">
            {type === SideBarSelectType.USER &&
                <HiOutlineUserCircle className="z-20 w-[24px] h-[24px]"/>
            }
            {type === SideBarSelectType.WEBHOOK &&
                <MdWebhook className="z-20 w-[24px] h-[24px]"/>
            }
            <span className="z-20">{type}</span>
            {selected ?
                <div className={styles.background_selected}/>
                :
                <div className={styles.background}/>
            }
        </button>
    )
}

export enum SideBarSelectType {
    USER = "Benutzer",
    WEBHOOK = "Webhook"
}

type SideBarSelectProps = {
    type: SideBarSelectType
    selected?: boolean
}