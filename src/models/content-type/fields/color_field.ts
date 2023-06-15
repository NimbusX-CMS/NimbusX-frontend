import {Field} from "@/models/content-type/field";

export type ColorField = Field & {
    defaultColor: string
}