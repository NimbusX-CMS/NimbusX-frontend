import styles from '@/styles/components/core/sidebar_section.module.css'

export default function SidebarSpace({title, selectedOption, imageUrl}: SidebarSpaceProps) {
    let selected = selectedOption !== undefined

    return (
        <div className="relative">
            {/*Head*/}
            <button className="p-3 w-full flex flex-cols gap-2 items-center relative">
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
                <div className="relative -top-2 w-full h-auto py-4 pt-6">
                    <div className="relative z-20 px-4 flex flex-col">
                        <button
                            className={selectedOption === SelectedOption.SPACE_SETTINGS
                                ? styles.selected_text
                                : styles.selectable_text}>
                            SPACE EINSTELLUNGEN
                        </button>
                        <button className={selectedOption === SelectedOption.CONTENT_TYPES
                            ? styles.selected_text
                            : styles.selectable_text}>
                            CONTENT TYPEN
                        </button>
                    </div>
                    <div
                        className="absolute top-0 h-full w-full opacity-50 bg-admin-primary-background rounded-b-xl z-10"/>
                </div>
            }
        </div>
    )
}

type SidebarSpaceProps = {
    title: string
    selectedOption?: SelectedOption
    imageUrl?: string
}

export enum SelectedOption {
    SPACE_SETTINGS,
    CONTENT_TYPES
}

