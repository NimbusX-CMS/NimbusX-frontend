import styles from '@/styles/components/core/checkbox.module.css'
import {ChangeEvent, useEffect, useRef} from "react";

export default function CheckBox({title, checked, onChange}: CheckBoxProps) {

    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (ref === null) return
        ref.current!.checked = checked ?? false
    }, [checked])

    return (
        <div className="flex items-center gap-2">
            <input ref={ref} type="checkbox" className={styles.checkbox} onChange={onChange}/>
            {title}
        </div>
    )
}

type CheckBoxProps = {
    title?: string
    checked?: boolean
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}