import TextField from "@/components/core/input/text_field";
import {ChangeEvent, useState} from "react";

export default function TextSettings({onChange}: TextSettingsProps) {

    const [maxLength, setMaxLength] = useState(0)
    const [defaultValue, setDefaultValue] = useState("")

    function updateMaxLength(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        setMaxLength(Number(value))

        if (!onChange) return
        onChange({maxLength: Number(value), defaultValue: defaultValue})
    }

    function updateDefaultValue(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        setDefaultValue(value)

        if (!onChange) return
        onChange({maxLength: maxLength, defaultValue: value})
    }

    return (
        <div className="flex flex-col gap-4">
            <TextField title="Maximale Länge" placeholder="250" onChange={updateMaxLength} type="number"/>
            <TextField title="Standart Wert" placeholder="Default" onChange={updateDefaultValue}/>
        </div>
    )
}

export type TextSettingsProps = {
    onChange?: (value: { maxLength: number, defaultValue: string }) => void
}