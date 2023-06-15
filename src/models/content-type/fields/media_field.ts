import {Field} from "@/models/content-type/field";

export type MediaField = Field & {
    defaultImage: string
    allowedTypes: string
    differentResolution: boolean
}