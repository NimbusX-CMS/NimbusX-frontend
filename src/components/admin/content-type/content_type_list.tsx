import {Listbox} from "@headlessui/react";
import {GoTriangleDown, GoTriangleUp} from "react-icons/go";
import React, {useEffect, useState} from "react";
import {ContentTypeEnum} from "@/models/enum/content_type_enum";
import {getContentTypeDisplayData} from "@/util/content_type_util";

export default function ContentTypeList({onChange}: ContentTypeListProps) {
    const [selectedOption, setSelectedOption] = useState(ContentTypeEnum.TEXT)
    const [selectedOptionData, setSelectedOptionData] = useState(getContentTypeDisplayData(ContentTypeEnum.TEXT))

    useEffect(() => {
        if (!onChange) return
        onChange(selectedOption)
        setSelectedOptionData(getContentTypeDisplayData(selectedOption))
    }, [selectedOption, onChange])

    return (
        <Listbox value={selectedOption} onChange={setSelectedOption}>
            {({open}) => (
                <div className="flex flex-col">
                    <Listbox.Button
                        className="flex flex-col border-2 border-admin-text-secondary rounded-xl px-4 py-1">
                        <span className="text-admin-text-secondary text-xs">Typ</span>
                        <div className="flex items-center gap-2 w-full">
                            <div style={{backgroundColor: selectedOptionData.color}}
                                 className="flex items-center justify-center w-[45px] h-[30px] rounded-md">
                                {selectedOptionData.icon}
                            </div>
                            {selectedOptionData.name}
                            {open
                                ? <GoTriangleUp className="ml-auto"/>
                                : <GoTriangleDown className="ml-auto"/>
                            }
                        </div>
                    </Listbox.Button>
                    <Listbox.Options>
                        <div
                            className="flex flex-col gap-2 border-2 border-admin-text-secondary border-t-transparent rounded-xl rounded-t-none px-4 py-1 pt-4 -mt-[9px]">
                            {Object.keys(ContentTypeEnum).filter((item) => isNaN(Number(item))).map((value) => {
                                const type = ContentTypeEnum[value as keyof typeof ContentTypeEnum]
                                const data = getContentTypeDisplayData(type)
                                return (
                                    <Listbox.Option key={value} value={type}>
                                        <div className="flex items-center gap-2">
                                            <div style={{backgroundColor: data.color}}
                                                 className="flex items-center justify-center w-[48px] h-[30px] rounded-md">
                                                {data.icon}
                                            </div>
                                            <button>{data.name}</button>
                                        </div>
                                    </Listbox.Option>
                                )
                            })}
                        </div>
                    </Listbox.Options>
                </div>
            )}
        </Listbox>
    )
}

export type ContentTypeListProps = {
    onChange?: (value: ContentTypeEnum) => void
}