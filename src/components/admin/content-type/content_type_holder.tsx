import {GoTriangleDown, GoTriangleUp} from "react-icons/go";
import TextField from "@/components/core/input/text_field";
import CheckBox from "@/components/core/input/check_box";
import ContentTypeItem from "@/components/admin/content-type/content_type_item";
import PrimaryButton from "@/components/core/input/primary_button";
import List from "@/components/core/input/list";
import {ChangeEvent, useState} from "react";
import {ContentType} from "@/models/content-type/content_type";
import {Field} from "@/models/content-type/field";

export default function ContentTypeHolder({initContentType, onNewField, onEdit}: ContentTypeHolderProps) {
    const [open, setOpen] = useState(false)

    const [contentType, setContentType] = useState(initContentType)

    function updatePreviewUrl(event: ChangeEvent<HTMLInputElement>) {

    }

    return (
        <>
            {/* HEAD */}
            <button onClick={() => setOpen(!open)}
                    className="flex items-center bg-admin-text text-admin-primary-background py-3 px-2 rounded-lg w-full">
                <span>{contentType.name}</span>
                {open
                    ? <GoTriangleUp className="ml-auto"/>
                    : <GoTriangleDown className="ml-auto"/>
                }
            </button>
            {/* BODY */}
            {open &&
                <div className="bg-admin-secondary-background p-4">
                    <div className="flex gap-4 items-start grow-0">
                        <div className="flex gap-4 w-[55%]">
                            <TextField title="Stage URL"
                                       placeholder="https://stage.your-website.net/blog"
                                       className="w-[50%]"
                                       value={contentType.preview}
                                       onChange={updatePreviewUrl}/>
                            <CheckBox title="Mehrsprachig" checked={contentType.multilanguage}/>
                            <CheckBox title="Einzelner Typ" checked={contentType.singleType}/>
                        </div>
                        <div>
                            <List title="Erlaubte HTTP Methoden" values={["GET", "POST", "DELETE"]}/>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                        {contentType.fields.map((field) =>
                            <ContentTypeItem
                                key={field.name}
                                field={field}
                                onEdit={() => {
                                    if (!onEdit) return
                                    onEdit(field)
                                }}/>)}
                        <PrimaryButton tittle="+ Neues Feld" classname="h-[40px] mt-24" onClick={onNewField}/>
                    </div>
                </div>
            }
        </>
    )
}

export type ContentTypeHolderProps = {
    initContentType: ContentType
    onNewField?: () => void
    onEdit?: (field: Field) => void
    onDeleteField?: () => void
}