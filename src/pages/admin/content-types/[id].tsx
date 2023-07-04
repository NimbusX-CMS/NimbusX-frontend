import Sidebar from "@/components/admin/sidebar/sidebar";
import SidebarSpace, {SelectedOption} from "@/components/admin/sidebar/sidebar_space";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {checkBasicAdminAuth} from "@/util/page_auth_util";
import {useState} from "react";
import SpaceRepository from "@/repositories/space_repository";
import {Space} from "@/models/space/space";
import TextField from "@/components/core/input/text_field";
import ContentTypeHolder from "@/components/admin/content-type/content_type_holder";
import PrimaryButton from "@/components/core/input/primary_button";
import {getCookieValue} from "@/util/cookie_utils";
import ContentTypeFieldOverlay from "@/components/admin/content-type/content_type_field_overlay";
import ContentRepository from "@/repositories/content_repository";
import {ContentType} from "@/models/content-type/content_type";
import _ from "lodash";
import {Field} from "@/models/content-type/field";

export default function SpaceSettings({
                                          user,
                                          spaces,
                                          initCurrentSpace,
                                          contentTypes
                                      }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const newEmptyField = () => _.clone({
        name: "",
        type: "TEXT",
        required: false,
        editable: true,
        defaultText: "",
        maxLength: undefined
    })

    const [current, setCurrent] = useState<Space>(initCurrentSpace)
    const [isOverlayOpen, setOverlayOpen] = useState(false)
    const [editing, isEditing] = useState(false)
    const [selectedField, setSelectedField] = useState<Field>(newEmptyField())

    function submit() {

    }

    return (
        <main className="flex min-h-screen">
            {isOverlayOpen &&
                <ContentTypeFieldOverlay initField={selectedField}
                                         onClose={() => setOverlayOpen(false)}
                                         edit={editing}/>
            }
            <Sidebar user={user} spaces={
                spaces.map((space: Space) => (
                    space.id === current.id
                        ? <SidebarSpace key={space.id} space={space} selectedOption={SelectedOption.CONTENT_TYPES}/>
                        : <SidebarSpace key={space.id} space={space}/>
                ))
            }/>
            <div className="flex flex-col gap-2 p-9 ml-[20%] w-full">
                <h2 className="text-admin-text-secondary font-bold">CONTENT TYPEN</h2>
                <TextField title="Suchen" placeholder="Deinen Suchtext..."/>
                <div className="w-full">
                    {contentTypes.map((type: ContentType) =>
                        <ContentTypeHolder key={type.name} initContentType={type}
                                           onNewField={() => {
                                               setSelectedField(newEmptyField())
                                               setOverlayOpen(true)
                                               isEditing(false)
                                           }}
                                           onEdit={(field) => {
                                               setSelectedField(field)
                                               setOverlayOpen(true)
                                               isEditing(true)
                                           }}
                        />)
                    }
                </div>
                <PrimaryButton tittle="+ Neuen Content Typ" classname="mt-14"/>
            </div>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = (context) => {
    return checkBasicAdminAuth(context, async (props) => {
        const sessionCookie = getCookieValue("session", context.req.headers.cookie)

        props.spaces = await SpaceRepository.getAll(sessionCookie)
        props.initCurrentSpace = await SpaceRepository.get(Number(context.query.id), sessionCookie)

        const contentTypeNames = await ContentRepository.getTypes("sample-webseite", sessionCookie)
        props.contentTypes = await Promise.all(contentTypeNames.map(async (name) =>
            await ContentRepository.getType("sample-webseite", name, sessionCookie)))
    })
}