import TextField from "@/components/core/input/text_field";
import PrimaryButton from "@/components/core/input/primary_button";
import {ImCross} from "react-icons/im";
import SecondaryButton from "@/components/core/input/secondary_button";
import {ChangeEvent, useState} from "react";
import {ContentType} from "@/models/content-type/content_type";

export default function ContentTypeOverlay({onClose, onSave, contentTypes}: ContentTypeOverlayProps) {

    const [typeName, setTypeName] = useState('')

    const [duplicatedName, setDuplicatedName] = useState(false)

    function updateName(event: ChangeEvent<HTMLInputElement>) {
        setDuplicatedName(false)
        setTypeName(event.currentTarget.value)
    }

    function save() {
        if (contentTypes.find(value => value.name == typeName)) {
            setDuplicatedName(true)
            return
        }
        if (!onSave) {
            return
        }

        onSave(typeName)
    }

    return (
        <div className="fixed w-screen h-screen z-50 flex justify-center items-center top-0 left-0">
            <div className="absolute w-screen h-screen bg-admin-primary-background opacity-80 z-40"/>
            <div
                className="absolute flex flex-col w-[90vw] h-[90vh] bg-admin-secondary-background z-50 rounded-lg p-4 gap-4">
                <button className="sticky self-end top-4 right-4" onClick={onClose}>
                    <ImCross className="w-[32px] h-[32px] hover:opacity-75"/>
                </button>
                <div className="w-[25%]">
                    <h2 className="text-admin-text-secondary font-bold my-4">
                        NEUER CONTENT TYP</h2>
                    <div className="flex flex-col">
                        {duplicatedName &&
                            <span className="text-sm text-red-600">Dieser Name ist bereits vergeben.</span>
                        }
                        <TextField title="Content Type Name"
                                   className={duplicatedName ? "text-red-600 border-red-600" : ""}
                                   placeholder="my-content-type"
                                   onChange={updateName}/>
                    </div>
                </div>
                <div className="sticky self-end right-4 bottom-4 flex gap-4 w-[20%] mt-auto ml-auto ">
                    <PrimaryButton tittle="Anlegen" onClick={save}/>
                    <SecondaryButton tittle="Abbrechen" onClick={onClose}/>
                </div>
            </div>
        </div>
    )
}

export type ContentTypeOverlayProps = {
    contentTypes: ContentType[]
    onClose?: () => void
    onSave?: (name: string) => void
}