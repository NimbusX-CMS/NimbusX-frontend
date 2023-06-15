import Sidebar from "@/components/admin/sidebar/sidebar";
import SidebarSpace, {SelectedOption} from "@/components/admin/sidebar/sidebar_space";
import TextField from "@/components/core/input/text_field";
import ImagePicker from "@/components/core/input/image_picker";
import ColorPicker from "@/components/core/input/color_picker";
import PrimaryButton from "@/components/core/input/primary_button";
import LanguageItem from "@/components/core/language_item";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {checkBasicAdminAuth} from "@/util/page_auth_util";
import {ChangeEvent, useState} from "react";
import {Space} from "@/models/space/space";
import SpaceRepository from "@/repositories/space_repository";
import {getCookieValue} from "@/util/cookie_utils";

export default function SpaceSettings({
                                          user,
                                          spaces,
                                          initCurrentSpace
                                      }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [current, setCurrent] = useState<Space>(initCurrentSpace)

    const [newLanguage, setNewLanguage] = useState("")

    function changeSpaceName(event: ChangeEvent<HTMLInputElement>) {
        const updatedCurrent = {...current}
        updatedCurrent.name = event.target.value
        setCurrent(updatedCurrent)
    }

    function changePrimaryLanguage(lang: string) {
        const updatedCurrent = {...current}
        updatedCurrent.primaryLanguage = lang
        setCurrent(updatedCurrent)
    }

    function addLanguage() {
        if (current.languages.includes(newLanguage)) return
        if (newLanguage.length < 1) return
        const updatedCurrent = {...current}
        updatedCurrent.languages.push(newLanguage)
        setCurrent(updatedCurrent)
    }

    function deleteLanguage(lang: string) {
        if (lang === current.primaryLanguage) return
        const updatedCurrent = {...current}
        updatedCurrent.languages.splice(updatedCurrent.languages.indexOf(lang), 1)
        setCurrent(updatedCurrent)
    }

    return (
        <main className="flex min-h-screen">
            <Sidebar user={user} spaces={
                spaces.map((space: Space) => (
                    space.id === current.id
                        ? <SidebarSpace key={space.id} space={space} selectedOption={SelectedOption.SPACE_SETTINGS}/>
                        : <SidebarSpace key={space.id} space={space}/>
                ))
            }/>
            <div className="flex flex-col gap-32 p-9 ml-[20%]">
                <div className="flex flex-col gap-4">
                    <h2 className="text-admin-text-secondary font-bold">THEME EINSTELLUNGEN</h2>
                    <TextField title="Space Name" placeholder="Name..." value={current.name} className="w-full text-3xl"
                               onChange={changeSpaceName}/>
                    <ImagePicker title="Lade ein Bild für diesen Space hoch." accept=".png,.jpg,.jpeg"/>
                    <ColorPicker title="Primary Color" placeholder={current.color1}/>
                    <ColorPicker title="Secondary Color" placeholder={current.color2}/>
                    <ColorPicker title="Primary Background Color" placeholder={current.color3}/>
                    <ColorPicker title="Secondary Background Color" placeholder={current.color4}/>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-admin-text-secondary font-bold">MULTI-LANGUAGE EINSTELLUNGEN</h2>
                    <form className="flex gap-4"
                          onSubmit={(event) => {
                              event.preventDefault()
                          }}>
                        <TextField title="Name"
                                   placeholder="en-US"
                                   onChange={(event) => {
                                       setNewLanguage(event.target.value.trim())
                                   }}/>
                        <PrimaryButton tittle="Hinzufügen" onClick={addLanguage}/>
                    </form>
                    {
                        (current?.languages ?? []).map(lang => (
                            <LanguageItem key={lang}
                                          title={lang}
                                          primary={current?.primaryLanguage === lang}
                                          onChange={() => changePrimaryLanguage(lang)}
                                          onDelete={() => deleteLanguage(lang)}/>
                        ))
                    }
                </div>
            </div>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = (context) => {
    return checkBasicAdminAuth(context, async (props) => {
        const sessionCookie = getCookieValue("session", context.req.headers.cookie)

        props.spaces = await SpaceRepository.getAll(sessionCookie)
        props.initCurrentSpace = await SpaceRepository.get(Number(context.query.id), sessionCookie)
    })
}