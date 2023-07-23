import {GoCalendar, GoClock, GoFileMedia, GoMarkdown} from "react-icons/go";
import {IoTextOutline} from "react-icons/io5";
import {Md123, MdDeleteOutline, MdList, MdOutlineColorLens} from "react-icons/md";
import {ContentTypeEnum} from "@/models/enum/content_type_enum";
import React from "react";
import {Field} from "@/models/content-type/field";
import {TextField} from "@/models/content-type/fields/text_field";

const itemData = new Map([
    [ContentTypeEnum.MEDIA, {name: 'Medien', icon: <GoFileMedia className="w-[24px] h-[24px]"/>, color: '#903B7E'}],
    [ContentTypeEnum.TEXT, {name: 'Text', icon: <IoTextOutline className="w-[24px] h-[24px]"/>, color: '#3B3E90'}],
    [ContentTypeEnum.COLOR, {
        name: 'Farbe',
        icon: <MdOutlineColorLens className="w-[24px] h-[24px]"/>,
        color: '#3B907C'
    }],
    [ContentTypeEnum.LIST, {name: 'Liste', icon: <MdList className="w-[24px] h-[24px]"/>, color: '#7F903B'}],
    [ContentTypeEnum.NUMBER, {name: 'Nummer', icon: <Md123 className="w-[24px] h-[24px]"/>, color: '#90643B'}],
    [ContentTypeEnum.MARKDOWN, {name: 'Markdown', icon: <GoMarkdown className="w-[24px] h-[24px]"/>, color: '#903B3B'}],
    [ContentTypeEnum.DATE, {name: 'Datum', icon: <GoCalendar className="w-[24px] h-[24px]"/>, color: '#3D903B'}],
    [ContentTypeEnum.DATETIME, {name: 'Uhrzeit', icon: <GoClock className="w-[24px] h-[24px]"/>, color: '#3B3E90'}]
]);

export function getContentTypeDisplayData(type: ContentTypeEnum): { name: string, color: string, icon: JSX.Element } {
    return itemData.get(type) ?? {
        name: 'UNDEFINED',
        icon: <MdDeleteOutline className="w-full h-full"/>,
        color: '#FF0000'
    }
}