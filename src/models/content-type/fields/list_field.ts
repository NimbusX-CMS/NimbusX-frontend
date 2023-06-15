import {Field} from "@/models/content-type/field";

export type ListField = Field & {
    entries: string[]
}