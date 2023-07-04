import {GoLock} from "react-icons/go";
import React from "react";
import {MdDeleteOutline, MdOutlineModeEdit} from "react-icons/md";
import {ContentTypeEnum} from "@/models/enum/content_type_enum";
import {getContentTypeDisplayData} from "@/util/content_type_util";
import {Field} from "@/models/content-type/field";

export default function ContentTypeField({field, onEdit, onDelete}: ContentTypeItemProps) {
    const data = getContentTypeDisplayData(ContentTypeEnum[field.type as keyof typeof ContentTypeEnum])

    return (
        <div className="flex items-center border-2 border-admin-text-secondary rounded-xl px-4 py-1">
            <div className="grid grid-cols-3 w-[20%]">
                <div style={{backgroundColor: data.color}}
                     className="flex items-center justify-center w-[52px] h-[35px] rounded-md">
                    {data.icon}
                </div>
                <div className="flex flex-col items-center ml-10">
                    <span className="text-xs text-admin-text-secondary">Name</span>
                    <span className="text-sm">{field.name}</span>
                </div>
                <div className="flex flex-col items-center ml-10">
                    <span className="text-xs text-admin-text-secondary">Typ</span>
                    <span className="text-sm">{data.name}</span>
                </div>
            </div>
            <div className="flex items-center ml-auto">
                {field.editable &&
                    <button className="hover:opacity-50 ml-auto" onClick={onEdit}>
                        <MdOutlineModeEdit className="w-[24px] h-[24px]"/>
                    </button>
                }
                {(field.editable ?? true)
                    ? <button className="hover:opacity-50 ml-auto" onClick={onDelete}>
                        <MdDeleteOutline className="w-[24px] h-[24px]"/>
                    </button>
                    : <GoLock className="w-[21px] h-[21px]"/>
                }
            </div>
        </div>
    )
}

type ContentTypeItemProps = {
    field: Field
    onEdit?: () => void
    onDelete?: () => void
}