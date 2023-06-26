import React from "react";

export default function SecondaryButton({tittle, classname, onClick}: ButtonProps) {
    return (
        <button
            className={`w-full p-3 rounded-lg bg-admin-primary-background hover:opacity-60 font-bold flex justify-center items-center ${classname ?? ''}`}
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