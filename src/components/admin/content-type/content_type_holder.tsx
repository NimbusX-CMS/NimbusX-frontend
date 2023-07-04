import {GoTriangleDown, GoTriangleUp} from "react-icons/go";
import TextField from "@/components/core/input/text_field";
import CheckBox from "@/components/core/input/check_box";
import ContentTypeField from "@/components/admin/content-type/content_type_field";
import PrimaryButton from "@/components/core/input/primary_button";
import List from "@/components/core/input/list";
import {ChangeEvent, useEffect, useState} from "react";
import {ContentType} from "@/models/content-type/content_type";
import {Field} from "@/models/content-type/field";
import _ from "lodash";

export default function ContentTypeHolder({initContentType, onNewField, onEdit}: ContentTypeHolderProps) {
    const [open, setOpen] = useState(false)
    const [unsaved, setUnsaved] = useState(false)

    const [contentType, setContentType] = useState(initContentType)

    useEffect(() => {
        setUnsaved(!_.isEqual(initContentType, contentType))
    }, [contentType, initContentType])

    function updatePreviewUrl(event: ChangeEvent<HTMLInputElement>) {

    }

    function deleteField(field: Field) {
        const type = _.cloneDeep(contentType)
        const index = type.fields.findIndex(v => v.name === field.name)
        type.fields.splice(index, 1)
        setContentType(type)
    }

    function submit() {

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
                    {unsaved &&
                        <div
                            className="flex items-center gap-4 px-4 w-full h-[5vh] bg-admin-primary-background z-50 rounded-xl top-5">
                            Achtung! Ungespeicherte Inhalte {'  '}
                            <button className="hover:underline ml-auto"
                                    onClick={() => setContentType(initContentType)}>Zurücksetzen
                            </button>
                            <PrimaryButton tittle="Speichern"
                                           classname="max-w-[100px] h-[80%] bg-green-600 hover:bg-green-5003"
                                           onClick={submit}/>
                        </div>
                    }
                    <div className="mt-4 flex gap-4 items-start grow-0">
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
                            <ContentTypeField
                                key={field.name}
                                field={field}
                                onEdit={() => {
                                    if (!onEdit) return
                                    onEdit(field)
                                }}
                                onDelete={() => deleteField(field)}
                            />)}
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