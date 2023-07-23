import React from "react";

export default function PrimaryButton({tittle, classname, onClick}: ButtonProps) {
    return (
        <button
            className={`w-full p-3 rounded-lg bg-admin-primary hover:bg-admin-secondary font-bold flex justify-center items-center ${classname ?? ''}`}
            onClick={onClick}>
            {tittle}
        </button>
    )
}

type ButtonProps = {
    tittle: string
    classname?: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}