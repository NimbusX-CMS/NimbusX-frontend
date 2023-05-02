import {ChangeEvent} from "react";

export default function TextField({title, placeholder, className, onChange}: TextFieldProps) {
    return (
        <div className={`flex flex-col border-2 border-admin-text-secondary rounded-xl px-4 py-1 ${className}`}>
            <span className="text-admin-text-secondary text-xs">{title}</span>
            <input className="bg-transparent outline-0" placeholder={placeholder} onChange={onChange}/>
        </div>
    )
}

type TextFieldProps = {
    title: string
    placeholder: string
    className?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}