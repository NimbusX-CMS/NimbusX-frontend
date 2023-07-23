import Sidebar from "@/components/admin/sidebar/sidebar";
import SidebarSpace, {SelectedOption} from "@/components/admin/sidebar/sidebar_space";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {checkBasicAdminAuth} from "@/util/page_auth_util";
import {ChangeEvent, useState} from "react";
import SpaceRepository from "@/repositories/space_repository";
import {Space} from "@/models/space/space";
import TextField from "@/components/core/input/text_field";
import ContentTypeHolder from "@/components/admin/content-type/content_type_holder";
import PrimaryButton from "@/components/core/input/primary_button";
import {getCookieValue} from "@/util/cookie_utils";
import ContentRepository from "@/repositories/content_repository";
import {ContentType} from "@/models/content-type/content_type";
import ContentTypeOverlay from "@/components/admin/content-type/content_type_overlay";
import {TextField as TextFieldModel} from "@/models/content-type/fields/text_field";
import _ from "lodash";

export default function SpaceSettings({
                                          user,
                                          spaces,
                                          initCurrentSpace,
                                          initContentTypes
                                      }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [current, setCurrent] = useState<Space>(initCurrentSpace)
    const [allContentTypes, setAllContentTypes] = useState<Array<ContentType>>(initContentTypes)
    const [contentTypes, setContentTypes] = useState<Array<ContentType>>(initContentTypes)
    const [isOverlayOpen, setOverlayOpen] = useState(false)

    function updateSearch(event: ChangeEvent<HTMLInputElement>) {
        const filteredType = allContentTypes.filter(value => value.name.includes(event.currentTarget.value))
        setContentTypes(filteredType)
    }

    function addContentType(name: string) {
        setOverlayOpen(false)
        const updatedContentTypes = _.cloneDeep(allContentTypes)
        updatedContentTypes.push({
            name: name, singleType: false, fields: [{
                name: "name",
                required: true,
                editable: false,
                type: "TEXT",
                maxLength: -1,
                defaultText: ""
            } as TextFieldModel], allowedMethods: ["GET"], multilanguage: false, preview: ""
        })
        console.log(updatedContentTypes)
        setAllContentTypes(updatedContentTypes)
        setContentTypes(updatedContentTypes)
    }

    function submit() {

    }

    return (
        <main className="flex min-h-screen">
            {isOverlayOpen &&
                <ContentTypeOverlay contentTypes={allContentTypes}
                                    onClose={() => setOverlayOpen(false)}
                                    onSave={addContentType}/>
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
                <TextField title="Suchen" placeholder="Deinen Suchtext..." onChange={updateSearch}/>
                <div className="w-full flex flex-col gap-2">
                    {contentTypes.map((type: ContentType) =>
                        <ContentTypeHolder key={type.name} initContentType={type}/>)
                    }
                </div>
                <PrimaryButton tittle="+ Neuen Content Typ" classname="mt-14" onClick={() => setOverlayOpen(true)}/>
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
        props.initContentTypes = await Promise.all(contentTypeNames.map(async (name) =>
            await ContentRepository.getType("sample-webseite", name, sessionCookie)))
    })
}