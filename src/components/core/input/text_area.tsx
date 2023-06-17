import styles from "@/styles/components/core/textarea.module.css";
import {ChangeEvent, FormEvent} from "react";

export default function TextArea({title, placeholder, onChange}: TextAreaProps) {

    function handleInput(event: FormEvent<HTMLTextAreaElement>) {
        event.currentTarget.parentElement!.dataset.replicatedValue = event.currentTarget.value
    }

    return (
        <div className="flex flex-col border-2 border-admin-text-secondary rounded-xl px-4 py-1">
            <span className="text-admin-text-secondary text-xs">{title}</span>
            <div className={styles.grow}>
                <textarea placeholder={placeholder}
                          onChange={onChange}
                          onInput={handleInput}/>
            </div>
        </div>
    )
}

export type TextAreaProps = {
    title: string
    placeholder: string
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
}