import {LoginForm} from "@/models/login_form";
import UnauthorizedError from "@/exceptions/unauthorized";
import InternalServerError from "@/exceptions/internal_server_error";

export default class AuthRepository {

    public static async login(form: LoginForm): Promise<string> {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            body: JSON.stringify(form)
        })

        switch (response.status) {
            case 200:
                return (await response.json()).session
            case 401:
                throw new UnauthorizedError('Username or Password is wrong')
            case 500:
                throw new InternalServerError('Server is unable to process the request')
            default:
                throw new Error(`Something unexpected happened, server responded with code ${response.status}`)
        }
    }
}