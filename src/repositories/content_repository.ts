import UnauthorizedError from "@/exceptions/unauthorized";
import InternalServerError from "@/exceptions/internal_server_error";
import NotFoundError from "@/exceptions/not_found";
import {ContentType} from "@/models/content-type/content_type";
import * as Constants from "@/constants";

export default class ContentRepository {

    public static async getTypes(space: string, session?: string): Promise<Array<string>> {
        let headers
        if (session) {
            headers = {"Cookie": `session=${session}`}
        }

        const response = await fetch(`${Constants.CONTENT_SERVING_SERVICE}/${space}`, {
            credentials: "include",
            headers: headers
        })

        switch (response.status) {
            case 200:
                return (await response.json())
            case 401:
                throw new UnauthorizedError('Access to this ressource was denied')
            case 404:
                throw new NotFoundError('Space not found, by the given name')
            case 500:
                throw new InternalServerError('Server is unable to process the request')
            default:
                throw new Error(`Something unexpected happened, server responded with code ${response.status}`)
        }
    }

    public static async getType(space: string, type: string, session?: string): Promise<ContentType> {
        let headers
        if (session) {
            headers = {"Cookie": `session=${session}`}
        }

        const response = await fetch(`${Constants.CONTENT_SERVING_SERVICE}/${space}/${type}`, {
            credentials: "include",
            headers: headers
        })

        switch (response.status) {
            case 200:
                return (await response.json())
            case 401:
                throw new UnauthorizedError('Access to this ressource was denied')
            case 404:
                throw new NotFoundError('ContentType not found, by the given name')
            case 500:
                throw new InternalServerError('Server is unable to process the request')
            default:
                throw new Error(`Something unexpected happened, server responded with code ${response.status}`)
        }
    }
}