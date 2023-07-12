import {ImCross} from "react-icons/im";
import TextField from "@/components/core/input/text_field";
import ContentTypeList from "@/components/admin/content-type/content_type_list";
import CheckBox from "@/components/core/input/check_box";
import TextSettings from "@/components/admin/content-type/settings/text_settings";
import {ChangeEvent, useEffect, useState} from "react";
import {ContentTypeEnum} from "@/models/enum/content_type_enum";
import {Field} from "@/models/content-type/field";
import MediaSettings from "@/components/admin/content-type/settings/media_settings";
import ColorSettings from "@/components/admin/content-type/settings/color_settings";
import ListSettings from "@/components/admin/content-type/settings/list_settings";
import PrimaryButton from "@/components/core/input/primary_button";
import SecondaryButton from "@/components/core/input/secondary_button";
import {TextField as TextFieldModel} from "@/models/content-type/fields/text_field";
import _ from "lodash";
import {MediaField} from "@/models/content-type/fields/media_field";
import {ColorField} from "@/models/content-type/fields/color_field";

export default function ContentTypeFieldOverlay({initField, onClose, edit, onSave}: ContentTypeOverlayProps) {

    const [settings, setSettings] = useState<undefined | JSX.Element>()
    const [field, setField] = useState<Field>(initField)

    function updateSettings(type: ContentTypeEnum) {
        const updatedField: Field = ContentTypeEnum[field.type as keyof typeof ContentTypeEnum] == type
            ? field
            : {
                type: ContentTypeEnum[type],
                name: field.name,
                editable: field.editable,
                required: field.required
            }

        switch (type) {
            case ContentTypeEnum.TEXT:
                setSettings(<TextSettings field={field as TextFieldModel}
                                          onChange={value => setField({...updatedField, ...value})}/>)
                break
            case ContentTypeEnum.MEDIA:
                setSettings(<MediaSettings field={field as MediaField}
                                           onChange={value => setField({...updatedField, ...value})}/>)
                break
            case ContentTypeEnum.COLOR:
                setSettings(<ColorSettings field={field as ColorField}
                                           onChange={value => setField({...updatedField, ...value})}/>)
                break
            case ContentTypeEnum.LIST:
                setSettings(<ListSettings/>)
                break
            default:
                setSettings(undefined)
                break
        }
    }

    function updateName(event: ChangeEvent<HTMLInputElement>) {
        const updatedField: Field = _.cloneDeep(field)
        updatedField.name = event.currentTarget.value
        setField(updatedField)
    }

    function updateRequired(event: ChangeEvent<HTMLInputElement>) {
        const updatedField: Field = _.cloneDeep(field)
        updatedField.required = Boolean(event.currentTarget.value)
        setField(updatedField)
    }

    return (
        <div className="fixed w-screen h-screen z-50 flex justify-center items-center top-0 left-0">
            <div className="absolute w-screen h-screen bg-admin-primary-background opacity-80 z-40"/>
            <div
                className="absolute flex flex-col w-[90vw] h-[90vh] bg-admin-secondary-background z-50 rounded-lg overflow-y-scroll">
                <button className="sticky self-end top-4 right-4" onClick={onClose}>
                    <ImCross className="w-[32px] h-[32px] hover:opacity-75"/>
                </button>
                <div className="flex flex-col gap-4 m-8 w-[25%]">
                    <h2 className="text-admin-text-secondary font-bold my-4">
                        {edit ? "CONTENT TYP BEARBEITEN" : "NEUER CONTENT TYP"}</h2>
                    <TextField title="Name" placeholder="your-content-type" onChange={updateName} value={field.name}/>
                    <ContentTypeList onChange={updateSettings}
                                     value={ContentTypeEnum[field.type as keyof typeof ContentTypeEnum]}/>
                    <CheckBox title="Erforderlich" onChange={updateRequired} checked={field.required}/>
                </div>
                {settings &&
                    <div className="flex flex-col gap-4 m-8 w-[25%]">
                        <h2 className="text-admin-text-secondary font-bold my-4">TYP EINSTELLUNGEN</h2>
                        {settings}
                    </div>
                }
                <div className="sticky self-end right-4 bottom-4 flex gap-4 w-[20%] mt-auto ml-auto ">
                    <PrimaryButton tittle={edit ? "Speichern" : "Anlegen"} onClick={() => {
                        if (!onSave) return
                        console.log(field)
                        onSave(field, !edit)
                    }}/>
                    <SecondaryButton tittle="Abbrechen" onClick={onClose}/>
                </div>
            </div>
        </div>
    )
}

export type ContentTypeOverlayProps = {
    initField: Field
    onClose?: () => void
    edit?: boolean
    onSave?: (field: Field, create: boolean) => void
}