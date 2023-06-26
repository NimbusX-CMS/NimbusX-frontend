import {Field} from "@/models/content-type/field";
import {Dispatch, SetStateAction, useState} from "react";

export function useStateWithField<T extends Field>(value: T): [T, Dispatch<SetStateAction<T>>] {
    const [field, setField] = useState<T>(value)
    return [field, setField]
}