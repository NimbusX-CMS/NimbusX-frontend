import styles from '@/styles/components/core/sidebar_section.module.css'

export default function SidebarSection({title, selected, imageUrl}: SidebarSectionProps) {
    return (
        <div className="relative">
            {/*Head*/}
            <button className="p-4 w-full flex flex-cols gap-2 items-center relative">
                {imageUrl === undefined ?
                    <div
                        className="bg-admin-text w-[32px] h-[32px] rounded-lg z-20 text-admin-primary-background flex items-center justify-center">
                        {title.substring(0, 2)}
                    </div>
                    :
                    <div style={{backgroundImage: `url(${imageUrl})`}}
                         className="w-[32px] h-[32px] rounded-lg z-20 bg-contain bg-no-repeat bg-center"/>
                }
                <span className="text-white z-20">{title}</span>
                {selected ?
                    <div className={styles.background_selected}/>
                    :
                    <div className={styles.background}/>
                }
            </button>

            {/*Body*/}
            {selected &&
                <div className="absolute top-0 w-full h-[200px] opacity-50 bg-admin-primary-background rounded-xl">

                </div>
            }
        </div>
    )
}

type SidebarSectionProps = {
    title: string
    selected?: boolean
    imageUrl?: string
}

