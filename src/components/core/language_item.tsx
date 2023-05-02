import CheckBox from "@/components/core/input/check_box";
import {MdDeleteOutline} from "react-icons/md";

export default function LanguageItem({title, primary}: LanguageItemProps) {
    return (
        <div className="flex gap-4 items-center border-[1px] border-admin-text p-2 px-4 rounded-xl">
            <div className="flex flex-col gap-1 items-center">
                <span className="text-xs text-admin-text-secondary">Primär</span>
                <CheckBox checked={primary}/>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-xs text-admin-text-secondary">Sprache</span>
                <span className="text-sm">{title}</span>
            </div>
            <button className="hover:opacity-50 ml-auto">
                <MdDeleteOutline className="w-[24px] h-[24px]"/>
            </button>
        </div>
    )
}

type LanguageItemProps = {
    title: string
    primary?: boolean
}