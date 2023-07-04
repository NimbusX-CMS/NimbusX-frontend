import TextField from "@/components/core/input/text_field";
import {ChangeEvent, useEffect, useState} from "react";
import {TextField as TextFieldModel} from "@/models/content-type/fields/text_field";

export default function TextSettings({onChange, field}: TextSettingsProps) {
    const [maxLength, setMaxLength] = useState(field?.maxLength)
    const [defaultValue, setDefaultValue] = useState(field?.defaultText ?? "")

    useEffect(() => {
        if (!onChange) return
        onChange({maxLength: Number(maxLength), defaultValue: defaultValue})
    }, [maxLength, defaultValue, onChange])

    function updateMaxLength(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        setMaxLength(Number(value))
    }

    function updateDefaultValue(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        setDefaultValue(value)
    }

    return (
        <div className="flex flex-col gap-4">
            <TextField title="Maximale Länge" placeholder="250" onChange={updateMaxLength}
                       defaultValue={maxLength?.toString()} type="number"/>
            <TextField title="Standart Wert" placeholder="Default" onChange={updateDefaultValue}
                       value={defaultValue}/>
        </div>
    )
}

export type TextSettingsProps = {
    field?: TextFieldModel
    onChange?: (value: { maxLength: number, defaultValue: string }) => void
}