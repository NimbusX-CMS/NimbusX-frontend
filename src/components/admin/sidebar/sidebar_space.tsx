import styles from '@/styles/components/admin/sidebar/sidebar_space.module.css'
import {MdOutlineContentCopy, MdSpaceDashboard} from "react-icons/md";
import Link from "next/link";
import {Space} from "@/models/space/space";

export default function SidebarSpace({space, selectedOption, imageUrl}: SidebarSpaceProps) {
    let selected = selectedOption !== undefined

    return (
        <div className="relative">
            {/*Head*/}
            <Link href={`/admin/space-settings/${space.id}`} className={styles.head} data-selected={selected}>
                {imageUrl === undefined ?
                    <div
                        className={styles.default_space_icon}>
                        {space.name.substring(0, 2)}
                    </div>
                    :
                    <div style={{backgroundImage: `url(${imageUrl})`}}
                         className="w-[32px] h-[32px] rounded-lg z-20 bg-contain bg-no-repeat bg-center"/>
                }
                <span className="text-white z-20">{space.name}</span>
                <div className={styles.background}/>
            </Link>

            {/*Body*/}
            {selected &&
                <div className={styles.body}>
                    <div className="relative z-20 flex flex-col">
                        <Link href={`/admin/space-settings/${space.id}`} className="p-2 pl-14 relative flex items-center gap-2"
                              data-selected={selectedOption === SelectedOption.SPACE_SETTINGS}>
                            <MdSpaceDashboard className="z-20 w-[24px] h-[24px]"/>
                            <span className="z-20">Space Einstellungen</span>
                            <div className={styles.background}/>
                        </Link>
                        <Link href={`/admin/content-types/${space.id}`} className="p-2 pl-14 relative flex items-center gap-2"
                              data-selected={selectedOption === SelectedOption.CONTENT_TYPES}>
                            <MdOutlineContentCopy className="z-20 w-[24px] h-[24px]"/>
                            <span className="z-20">Content Typen</span>
                            <div className={styles.background}/>
                        </Link>
                    </div>
                    <div
                        className={styles.background}/>
                </div>
            }
        </div>
    )
}

type SidebarSpaceProps = {
    space: Space
    selectedOption?: SelectedOption
    imageUrl?: string
}

export enum SelectedOption {
    SPACE_SETTINGS,
    CONTENT_TYPES
}

