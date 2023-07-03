import List from "@/components/core/input/list";
import CheckBox from "@/components/core/input/check_box";
import ImagePicker from "@/components/core/input/image_picker";
import {MediaField} from "@/models/content-type/fields/media_field";
import {ChangeEvent, useEffect, useState} from "react";

export default function MediaSettings({field, onChange}: MediaSettingsProps) {
    const [defaultImage, setDefaultImage] = useState<string | undefined>(field?.defaultImage)
    const [allowedTypes, setAllowedTypes] = useState(field?.allowedTypes ?? [])
    const [differentResolution, setDifferentResolution] = useState(field?.differentResolution ?? false)

    useEffect(() => {
        if (!onChange) return
        onChange({defaultImage: defaultImage ?? "", allowedTypes, differentResolution})
    }, [defaultImage, allowedTypes, differentResolution])

    function updateDefaultImage(event: ChangeEvent<HTMLInputElement>) {
        const files = event.currentTarget.files
        if (files === null) {
            return
        }

        const file = files.item(0)
        if(file === null) {
            return
        }

        setDefaultImage(URL.createObjectURL(file.slice()))
    }

    function updateDifferentResolution(event: ChangeEvent<HTMLInputElement>) {
        const value = Boolean(event.currentTarget.value)
        setDifferentResolution(value)
    }

    return (
        <div className="flex flex-col gap-4">
            <ImagePicker defaultImage={defaultImage}
                         title="Setze einen Bild als Default"
                         accept={".png,.jpeg,.mp4"}
                         onChange={updateDefaultImage}/>
            <List title="Erlaubte Dateien"
                  values={[".png", ".jpeg", ".mp4"]}
                  defaultSelect={allowedTypes}
                  onChange={setAllowedTypes}/>
            <CheckBox checked={differentResolution}
                      title="In verschiedenen Auflösungen speichern"
                      onChange={updateDifferentResolution}/>
        </div>
    )
}

export type MediaSettingsProps = {
    field?: MediaField
    onChange?: (value: { defaultImage: string, allowedTypes: string[], differentResolution: boolean }) => void
}