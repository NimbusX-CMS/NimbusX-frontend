import * as Constants from "@/constants";
import UnauthorizedError from "@/exceptions/unauthorized";
import NotFoundError from "@/exceptions/not_found";
import InternalServerError from "@/exceptions/internal_server_error";
import {Media} from "@/models/media";

export default class MediaRepository {
    public async postMedia(multiResolution?: boolean, session?: string): Promise<Media> {
        let headers
        if (session) {
            headers = {"Cookie": `session=${session}`}
        }

        const response = await fetch(`${Constants.CONTENT_SERVING_SERVICE}/media`, {
            method: 'POST',
            credentials: "include",
            headers: headers
        })

        switch (response.status) {
            case 201:
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
}