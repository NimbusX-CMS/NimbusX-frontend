import Head from "next/head";
import TextField from "@/components/core/input/text_field";
import PrimaryButton from "@/components/core/input/primary_button";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {LoginForm} from "@/models/login_form";
import AuthRepository from "@/repositories/auth_repository";
import UnauthorizedError from "@/exceptions/unauthorized";

export default function Login() {
    const [login, setLogin] = useState<LoginForm>({
        email: "",
        password: ""
    })
    const router = useRouter()

    useEffect(() => {
        console.log(router.query)
    }, [router])

    function updateUsername(event: ChangeEvent<HTMLInputElement>) {
        let current = login
        current.email = event.target.value.trim()
        setLogin(current)
    }
    function updatePassword(event: ChangeEvent<HTMLInputElement>) {
        let current = login
        current.password = event.target.value
        setLogin(current)
    }

    async function submit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()

        let session: string
        try {
            session = await AuthRepository.login(login)
            document.cookie=`session=${session};`
            await router.push("/")
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                await router.push("/login?error")
            } else {
                await router.push("/500")
            }
        }
    }

    return (
        <>
            <Head>
                <title>NimbusX - Login</title>
            </Head>
            <main className="flex justify-center items-center h-screen">
                <div className="bg-admin-secondary-background max-w-md h-[75vh] rounded-2xl flex items-center flex-col">
                    <h1 className="text-4xl mt-32">NimbusX</h1>
                    <form className="flex flex-col gap-4 mt-16 max-w-[80%]">
                        <TextField title="Email" placeholder="Email" onChange={updateUsername}/>
                        <TextField title="Passwort" placeholder="Passwort" type="password" onChange={updatePassword}/>
                        <PrimaryButton tittle="Login" onClick={submit}/>
                        {router.query.error !== undefined &&
                            <div className="bg-red-600 py-1 px-2 text-center rounded-lg break-words bg-opacity-75">
                                Falscher Benutzername oder Passwort
                            </div>
                        }
                    </form>
                    <span className="w-[80%] text-xs text-center mt-8">
                        Wenn du dein Passwort verbessen hast,
                        melde dich bitte bei einem Instanz-Admin,
                        um es zurück setzen zu lassen.</span>
                </div>
            </main>
        </>
    )
}