import {Field} from "@/models/content-type/field";

export type ContentType = {
    name: string
    preview: string
    multilanguage: boolean
    singleType: boolean
    allowedMethods: string[]
    fields: Field[]
}