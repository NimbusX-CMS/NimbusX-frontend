import ColorPicker from "@/components/core/input/color_picker";
import {ChangeEvent, useState} from "react";
import {ColorField} from "@/models/content-type/fields/color_field";

export default function ColorSettings({field, onChange}: ColorSettingsProps) {
    const [defaultColor, setDefaultColor] = useState(field?.defaultColor ?? "")

    function updateDefaultColor(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        setDefaultColor(value)

        if (!onChange) return
        onChange({defaultColor})
    }

    return (
        <div>
            <ColorPicker title="Standard Farbe" placeholder={defaultColor} onChange={updateDefaultColor}/>
        </div>
    )
}

export type ColorSettingsProps = {
    field?: ColorField
    onChange?: (value: { defaultColor: string }) => void
}