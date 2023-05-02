import TextField from "@/components/core/input/text_field";
import {ChangeEvent, useEffect, useRef} from "react";

export default function ColorPicker({title, placeholder}: ColorPickerProps) {

    const previewRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(!previewRef.current) {
            return
        }

        previewRef.current.style.backgroundColor = placeholder
    }, [])

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        if(!previewRef.current) {
            return
        }

        const value = event.target.value
        if(value.length === 0) {
            previewRef.current.style.backgroundColor = placeholder
        } else {
            previewRef.current.style.backgroundColor = value
        }
    }

    return (
        <div className="flex gap-1">
            <div ref={previewRef} className="w-24 h-full border-[1px] border-admin-text rounded-xl"/>
            <TextField title={title} placeholder={placeholder} onChange={handleInputChange}/>
        </div>
    )
}

type ColorPickerProps = {
    title: string
    placeholder: string
}