import {ChangeEvent, useEffect, useState} from "react";
import TextField from "@/components/core/input/text_field";
import {NumberField} from "@/models/content-type/fields/number_field";

export function NumberSettings({field, onChange}: NumberSettingsProps) {
    const [minValue, setMinValue] = useState(field?.minValue)
    const [maxValue, setMaxValue] = useState(field?.maxValue)

    useEffect(() => {
        if (!onChange) return
        onChange({minValue, maxValue})
    }, [minValue, maxValue])

    function updateMinValue(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        setMinValue(Number(value))
    }

    function updateMaxValue(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        setMaxValue(Number(value))
    }

    return (
        <div>
            <TextField type="number" title="Mindest Wert" placeholder={String(minValue)} onChange={updateMinValue}/>
            <TextField type="number" title="Höchst Wert" placeholder={String(maxValue)} onChange={updateMaxValue}/>
        </div>
    )
}

export type NumberSettingsProps = {
    field?: NumberField
    onChange?: (value: { minValue: undefined | number, maxValue: undefined | number }) => void
}