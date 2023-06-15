import TextField from "@/components/core/input/text_field";
import {ChangeEvent, useEffect, useRef, useState} from "react";

export default function ColorPicker({title, placeholder}: ColorPickerProps) {
    const [value, setValue] = useState(placeholder)

    const previewRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(!previewRef.current) {
            return
        }

        previewRef.current.style.backgroundColor = placeholder
    }, [placeholder])

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        if(!previewRef.current) {
            return
        }

        const input = event.target.value
        if(input.length === 0) {
            previewRef.current.style.backgroundColor = placeholder
            return
        }
        if (input.length > 7 || !/^#[a-fA-F0-9]{0,6}$/.test(input)) {
            return
        }
        setValue(input)
        previewRef.current.style.backgroundColor = input
    }

    return (
        <div className="flex gap-1">
            <div ref={previewRef} className="w-24 h-full border-[1px] border-admin-text rounded-xl"/>
            <TextField title={title} placeholder={placeholder} onChange={handleInputChange} value={value}/>
        </div>
    )
}

type ColorPickerProps = {
    title: string
    placeholder: string
}