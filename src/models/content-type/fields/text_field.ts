import {Field} from "@/models/content-type/field";

export type TextField = Field & {
    maxLength: number
    defaultText: string
}