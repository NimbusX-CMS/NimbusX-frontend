import {User} from "@/models/user";
import UnauthorizedError from "@/exceptions/unauthorized";
import InternalServerError from "@/exceptions/internal_server_error";

export default class UserRepository {

    public static async getUser(session: string): Promise<User> {
        const response = await fetch("http://localhost:8080/login", {
            method: "GET",
            headers: {
                "Cookie": `session=${session}`
            }
        })

        switch (response.status) {
            case 200:
                return (await response.json())
            case 401:
                throw new UnauthorizedError('User is not authorized to access this resource')
            case 500:
                throw new InternalServerError('Server is unable to process the request')
            default:
                throw new Error(`Something unexpected happened, server responded with code ${response.status}`)
        }
    }
}