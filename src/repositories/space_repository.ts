import {Space} from "@/models/space/space";
import UnauthorizedError from "@/exceptions/unauthorized";
import InternalServerError from "@/exceptions/internal_server_error";
import NotFoundError from "@/exceptions/not_found";
import * as Constants from "@/constants";

export default class SpaceRepository {
    public static async getAll(session?: string): Promise<Array<Space>> {
        let headers
        if (session) {
            headers = {"Cookie": `session=${session}`}
        }

        const response = await fetch(`${Constants.CONTENT_SERVING_SERVICE}/spaces`, {
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

        const response = await fetch(`${Constants.CONTENT_SERVING_SERVICE}/space/${id}`, {
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

    public static async put(id: number, space: Space, session?: string) {
        let headers
        if (session) {
            headers = {"Cookie": `session=${session}`}
        }

        const response = await fetch(`${Constants.CONTENT_SERVING_SERVICE}/space/${id}`, {
            credentials: "include",
            headers: headers,
            body: JSON.stringify(space),
            method: 'PUT'
        })

        switch (response.status) {
            case 201:
                return (await response.json())
            case 401:
                throw new UnauthorizedError('User is not authorized to access this resource')
            case 404:
                throw new NotFoundError('Space not found, by the given id')
            case 500:
                throw new InternalServerError('Server is unable to process the request')
            default:
                throw new Error(`Something unexpected happened, server responded with code ${response.status}`)
        }
    }
}