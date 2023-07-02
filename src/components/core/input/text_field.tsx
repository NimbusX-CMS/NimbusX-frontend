import {ChangeEvent} from "react";
import styles from "@/styles/components/core/textfield.module.css"

export default function TextField({
                                      title,
                                      placeholder,
                                      className,
                                      onChange,
                                      type,
                                      value,
                                      defaultValue
                                  }: TextFieldProps) {
    return (
        <div className={`flex flex-col border-2 border-admin-text-secondary rounded-xl px-4 py-1 ${className}`}>
            <span className="text-admin-text-secondary text-xs">{title}</span>
            <input id={styles.input} className="bg-transparent outline-0"
                   type={type ?? "text"}
                   placeholder={placeholder}
                   onChange={onChange}
                   value={value}
                   defaultValue={defaultValue}/>
        </div>
    )
}

type TextFieldProps = {
    title: string
    placeholder: string
    className?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    value?: string
    defaultValue?: string
    type?: "number" | "text" | "password"
}