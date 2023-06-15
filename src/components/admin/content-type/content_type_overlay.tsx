import {ImCross} from "react-icons/im";
import TextField from "@/components/core/input/text_field";
import ContentTypeList from "@/components/admin/content-type/content_type_list";
import CheckBox from "@/components/core/input/check_box";
import TextSettings from "@/components/admin/content-type/settings/text_settings";
import {useState} from "react";
import {ContentTypeEnum} from "@/models/enum/content_type_enum";
import {Field} from "@/models/content-type/field";
import MediaSettings from "@/components/admin/content-type/settings/media_settings";

export default function ContentTypeOverlay() {
    const [settings, setSettings] = useState(<TextSettings/>)
    const [field, setField] = useStateWithField({name: "", required: false})

    function updateSettings(type: ContentTypeEnum) {
        switch (type) {
            case ContentTypeEnum.TEXT:
                setSettings(<TextSettings/>)
                break
            case ContentTypeEnum.MEDIA:
                setSettings(<MediaSettings/>)
                break
            default:
                setSettings(<div/>)
                break
        }
    }

    return (
        <div className="absolute w-screen h-screen z-50 flex justify-center items-center">
            <div className="absolute w-screen h-screen bg-admin-primary-background opacity-80 z-40"/>
            <div className="absolute w-[90vw] h-[90vh] bg-admin-secondary-background z-50 rounded-lg">
                <button className="absolute top-4 right-4">
                    <ImCross className="w-[32px] h-[32px] hover:opacity-75"/>
                </button>
                <div className="flex flex-col gap-4 m-8 w-[25%]">
                    <h2 className="text-admin-text-secondary font-bold my-4">NEUER CONTENT TYP</h2>
                    <TextField title="Name" placeholder="your-content-type"/>
                    <ContentTypeList onChange={updateSettings}/>
                    <CheckBox title="Erforderlich"/>
                </div>
                <div className="flex flex-col gap-4 m-8 w-[25%]">
                    <h2 className="text-admin-text-secondary font-bold my-4">TYP EINSTELLUNGEN</h2>
                    {settings}
                </div>
            </div>
        </div>
    )
}

function useStateWithField<T extends Field>(value: T) {
    const [field, setField] = useState<T>(value)
    return [field, setField]
}