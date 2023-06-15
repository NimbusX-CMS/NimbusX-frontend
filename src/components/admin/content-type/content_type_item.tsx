import {GoCalendar, GoClock, GoFileMedia, GoMarkdown} from "react-icons/go";
import React from "react";
import {Md123, MdDeleteOutline, MdList, MdOutlineColorLens, MdOutlineModeEdit} from "react-icons/md";
import {IoTextOutline} from "react-icons/io5";
import {GoLock} from "react-icons/go";
import {ContentTypeEnum} from "@/models/enum/content_type_enum";
import {getContentTypeDisplayData} from "@/util/content_type_util";

export default function ContentTypeItem({name, type, deletable}: ContentTypeItemProps) {
    const data = getContentTypeDisplayData(type)

    return (
        <div className="flex items-center border-2 border-admin-text-secondary rounded-xl px-4 py-1">
            <div style={{backgroundColor: data.color}}
                 className="flex items-center justify-center w-[52px] h-[35px] rounded-md">
                {data.icon}
            </div>
            <div className="flex flex-col items-center ml-10">
                <span className="text-xs text-admin-text-secondary">Name</span>
                <span className="text-sm">{name}</span>
            </div>
            <div className="flex flex-col items-center ml-10">
                <span className="text-xs text-admin-text-secondary">Typ</span>
                <span className="text-sm">{data.name}</span>
            </div>
            <div className="flex items-center ml-auto">
                <button className="hover:opacity-50 ml-auto">
                    <MdOutlineModeEdit className="w-[24px] h-[24px]"/>
                </button>
                {(deletable ?? true)
                    ? <button className="hover:opacity-50 ml-auto"><MdDeleteOutline className="w-[24px] h-[24px]"/></button>
                    : <GoLock className="w-[21px] h-[21px]"/>
                }
            </div>
        </div>
    )
}

type ContentTypeItemProps = {
    name: string
    type: ContentTypeEnum
    deletable?: boolean
}