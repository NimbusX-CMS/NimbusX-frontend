export default function TextField({title, placeholder}: TextFieldProps) {
    return (
        <div className="flex flex-col border-2 rounded-xl px-4 py-1">
            <span className="text-admin-text-secondary text-xs">{title}</span>
            <input className="bg-transparent outline-0" placeholder={placeholder}/>
        </div>
    )
}

type TextFieldProps = {
    title: string
    placeholder: string
}