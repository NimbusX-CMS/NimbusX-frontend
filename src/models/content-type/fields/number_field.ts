import {Field} from "@/models/content-type/field";

export type Number_field = Field & {
    minValue: number
    maxValue: number
}