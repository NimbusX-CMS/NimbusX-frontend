import styles from '@/styles/components/core/checkbox.module.css'
import {ChangeEvent} from "react";

export default function CheckBox({title, checked, onChange}: CheckBoxProps) {
    return (
        <div className="flex items-center gap-2">
            <input type="checkbox" className={styles.checkbox} checked={checked} onChange={onChange}/>
            {title}
        </div>
    )
}

type CheckBoxProps = {
    title?: string
    checked?: boolean
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}