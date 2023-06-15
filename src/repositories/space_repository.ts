import {Space} from "@/models/space/space";
import UnauthorizedError from "@/exceptions/unauthorized";
import InternalServerError from "@/exceptions/internal_server_error";

export default class SpaceRepository {
    public static async getAll(session?: string): Promise<Array<Space>> {
        let headers
        if (session) {
            headers = {"Cookie": `session=${session}`}
        }

        const response = await fetch("http://localhost:8080/spaces", {
            credentials: "include",
            headers: headers
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

    public static async get(id: number, session?: string) {
        let headers
        if (session) {
            headers = {"Cookie": `session=${session}`}
        }

        const response = await fetch(`http://localhost:8080/space/${id}`, {
            credentials: "include",
            headers: headers
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