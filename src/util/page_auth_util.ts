import {GetServerSidePropsContext} from "next";
import {getCookieValue} from "@/util/cookie_utils";
import {User} from "@/models/user";
import UserRepository from "@/repositories/user_repository";
import UnauthorizedError from "@/exceptions/unauthorized";

export async function checkAuthenticated(context: GetServerSidePropsContext): Promise<User> {
    const cookies = context.req.headers.cookie
    const sessionCookie = getCookieValue("session", cookies)
    let user: User

    try {
        user = await UserRepository.getUser(sessionCookie)
        return user
    } catch (error) {
        throw error
    }
}

export async function checkBasicAdminAuth(context: GetServerSidePropsContext, onSuccessful?: (props: any) => Promise<void>) {
    let user: User
    try {
        user = await checkAuthenticated(context)
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false
                }
            }
        }

        return {
            redirect: {
                destination: '/500',
                permanent: false
            }
        }
    }

    const props = {user: user}
    if(onSuccessful) {
        await onSuccessful(props)
    }

    return {
        props: props
    }
}