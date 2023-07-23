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
import ContentTypeFieldOverlay from "@/components/admin/content-type/content_type_field_overlay";

export default function ContentTypeHolder({initContentType}: ContentTypeHolderProps) {

    const newEmptyField = () => _.clone({
        name: "",
        type: "TEXT",
        required: false,
        editable: true,
        defaultText: "",
        maxLength: undefined
    })

    const [open, setOpen] = useState(false)
    const [unsaved, setUnsaved] = useState(false)
    const [contentType, setContentType] = useState(initContentType)
    const [selectedField, setSelectedField] = useState<Field>(newEmptyField)
    const [isOverlayOpen, setOverlayOpen] = useState(false)


    useEffect(() => {
        setUnsaved(!_.isEqual(initContentType, contentType))
    }, [contentType, initContentType])

    function updatePreviewUrl(event: ChangeEvent<HTMLInputElement>) {
        const updatedType = _.cloneDeep(contentType)
        updatedType.preview = event.currentTarget.value
        setContentType(updatedType)
    }

    function updateMultiLanguage(event: ChangeEvent<HTMLInputElement>) {
        const updatedType = _.cloneDeep(contentType)
        updatedType.multilanguage = event.currentTarget.checked
        setContentType(updatedType)
    }

    function updateSingleType(event: ChangeEvent<HTMLInputElement>) {
        const updatedType = _.cloneDeep(contentType)
        updatedType.singleType = event.currentTarget.checked
        setContentType(updatedType)
    }

    function updateAllowedMethods(list: string[]) {
        console.log(list)
        const updatedType = _.cloneDeep(contentType)
        updatedType.allowedMethods = list
        setContentType(updatedType)
    }

    function saveField(field: Field, create: boolean) {
        const updatedType = _.cloneDeep(contentType)
        if (create) {
            updatedType.fields.push(field)

        } else {
            const index = updatedType.fields.findIndex(value => value.name == field.name)
            updatedType.fields[index] = field
        }
        console.log(updatedType)
        setContentType(updatedType)
        setOverlayOpen(false)
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
            {isOverlayOpen &&
                <ContentTypeFieldOverlay parentContentType={contentType}
                                         initField={selectedField}
                                         edit={!_.isEqual(selectedField, newEmptyField())}
                                         onClose={() => setOverlayOpen(false)}
                                         onSave={saveField}/>
            }
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
                            <CheckBox title="Mehrsprachig"
                                      checked={contentType.multilanguage}
                                      onChange={updateMultiLanguage}/>
                            <CheckBox title="Einzelner Typ"
                                      checked={contentType.singleType}
                                      onChange={updateSingleType}/>
                        </div>
                        <div>
                            <List title="Erlaubte HTTP Methoden"
                                  values={["GET", "POST", "DELETE"]}
                                  selectedValues={contentType.allowedMethods}
                                  onChange={updateAllowedMethods}/>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                        {contentType.fields.map((field) =>
                            <ContentTypeField
                                key={field.name}
                                field={field}
                                onEdit={() => {
                                    setSelectedField(field)
                                    setOverlayOpen(true)
                                }}
                                onDelete={() => deleteField(field)}
                            />)}
                        <PrimaryButton tittle="+ Neues Feld"
                                       classname="h-[40px] mt-24"
                                       onClick={() => {
                                           setSelectedField(newEmptyField)
                                           setOverlayOpen(true)
                                       }}/>
                    </div>
                </div>
            }
        </>
    )
}

export type ContentTypeHolderProps = {
    initContentType: ContentType
}