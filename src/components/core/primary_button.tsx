export default function PrimaryButton({tittle}: ButtonProps) {
    return (
        <button className="w-full p-3 rounded-lg bg-admin-primary hover:bg-admin-secondary">
            <b>{tittle}</b>
        </button>
    )
}

type ButtonProps = {
    tittle: string
}