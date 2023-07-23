import CheckBox from "@/components/core/input/check_box";
import {MdDeleteOutline} from "react-icons/md";
import React, {ChangeEvent, useEffect, useState} from "react";

export default function LanguageItem({title, primary, onChange, onDelete}: LanguageItemProps) {

    const [isPrimary, setPrimary] = useState(primary)

    useEffect(() => {
        setPrimary(primary)
    }, [primary])

    return (
        <div className="flex gap-4 items-center border-[1px] border-admin-text p-2 px-4 rounded-xl">
            <div className="flex flex-col gap-1 items-center">
                <span className="text-xs text-admin-text-secondary">Primär</span>
                <CheckBox checked={isPrimary} onChange={onChange}/>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-xs text-admin-text-secondary">Sprache</span>
                <span className="text-sm">{title}</span>
            </div>
            {(!primary ?? false) &&
                <button className="hover:opacity-50 ml-auto" onClick={onDelete}>
                    <MdDeleteOutline className="w-[24px] h-[24px]"/>
                </button>
            }
        </div>
    )
}

type LanguageItemProps = {
    title: string
    primary?: boolean
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void
}