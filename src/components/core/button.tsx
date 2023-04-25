export default function Button({tittle}: ButtonProps) {
    return (
        <button style={{backgroundColor: "#576CA8"}}
                className="w-full p-4 rounded-lg">
            <b>{tittle}</b>
        </button>
    )
}

type ButtonProps = {
    tittle: string
}