import Sidebar from "@/components/admin/sidebar/sidebar";
import SidebarSpace, {SelectedOption} from "@/components/admin/sidebar/sidebar_space";
import TextField from "@/components/core/input/text_field";
import ImagePicker from "@/components/core/input/image_picker";
import ColorPicker from "@/components/core/input/color_picker";
import PrimaryButton from "@/components/core/input/primary_button";
import LanguageItem from "@/components/core/language_item";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {checkBasicAdminAuth} from "@/util/page_auth_util";
import {ChangeEvent, useEffect, useState} from "react";
import {Space} from "@/models/space/space";
import SpaceRepository from "@/repositories/space_repository";
import {getCookieValue} from "@/util/cookie_utils";
import * as _ from "lodash";
import {useRouter} from "next/router";

export default function SpaceSettings({
                                          user,
                                          spaces,
                                          initCurrentSpace
                                      }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [current, setCurrent] = useState<Space>(initCurrentSpace)

    const [newLanguage, setNewLanguage] = useState("")
    const [isUnsaved, setUnsaved] = useState(false)

    const router = useRouter()

    useEffect(() => {
        setUnsaved(!_.isEqual(initCurrentSpace, current))
        console.log("test")
    }, [current, initCurrentSpace])

    function changeSpaceName(event: ChangeEvent<HTMLInputElement>) {
        const updatedCurrent = _.clone(current)
        updatedCurrent.name = event.target.value
        setCurrent(updatedCurrent)
    }

    function changePrimaryLanguage(lang: string) {
        const updatedCurrent = _.clone(current)
        updatedCurrent.primaryLanguage = lang
        setCurrent(updatedCurrent)
    }

    function addLanguage() {
        if (current.languages.includes(newLanguage)) return
        if (newLanguage.length < 1) return
        const updatedCurrent = _.cloneDeep(current)
        updatedCurrent.languages = [newLanguage, ...current.languages]
        setCurrent(updatedCurrent)
    }

    function deleteLanguage(lang: string) {
        if (lang === current.primaryLanguage) return
        const updatedCurrent = _.cloneDeep(current)
        updatedCurrent.languages.splice(updatedCurrent.languages.indexOf(lang), 1)
        setCurrent(updatedCurrent)
    }

    function updateColor(type: number, color: string) {
        const updatedCurrent = _.clone(current)
        switch (type) {
            case 1:
                updatedCurrent.color1 = color
                break
            case 2:
                updatedCurrent.color2 = color
                break
            case 3:
                updatedCurrent.color3 = color
                break
            case 4:
                updatedCurrent.color4 = color
                break
        }
        setCurrent(updatedCurrent)
    }

    async function submit() {
        await SpaceRepository.put(initCurrentSpace.id, current)
        router.reload()
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
            <div className="ml-[20%] w-full">
                {isUnsaved &&
                    <>
                        <div
                            className="fixed flex items-center gap-4 px-4 w-[75%] h-[5vh] bg-admin-secondary-background z-50 rounded-xl top-5 ml-9">
                            Achtung! Ungespeicherte Inhalte {'  '}
                            <button className="hover:underline ml-auto"
                                    onClick={() => setCurrent(initCurrentSpace)}>Zurücksetzen
                            </button>
                            <PrimaryButton tittle="Speichern" classname="max-w-[100px] h-[80%] bg-green-600 hover:bg-green-5003" onClick={submit}/>
                        </div>
                        <div className="h-[5vh]"/>
                    </>
                }
                <div className="flex flex-col gap-32 p-9 w-[40%]">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-admin-text-secondary font-bold">THEME EINSTELLUNGEN</h2>
                        <TextField title="Space Name"
                                   placeholder="Name..."
                                   value={current.name}
                                   className="w-full text-3xl"
                                   onChange={changeSpaceName}/>
                        <ImagePicker title="Lade ein Bild für diesen Space hoch." accept=".png,.jpg,.jpeg"/>
                        <ColorPicker title="Primary Color"
                                     placeholder={current.color1}
                                     onChange={(event) => updateColor(1, event.currentTarget.value)}/>
                        <ColorPicker title="Secondary Color"
                                     placeholder={current.color2}
                                     onChange={(event) => updateColor(2, event.currentTarget.value)}/>
                        <ColorPicker title="Primary Background Color"
                                     placeholder={current.color3}
                                     onChange={(event) => updateColor(3, event.currentTarget.value)}/>
                        <ColorPicker title="Secondary Background Color"
                                     placeholder={current.color4}
                                     onChange={(event) => updateColor(4, event.currentTarget.value)}/>
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