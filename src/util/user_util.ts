import {User} from "@/models/user";

export function getUserRole(user: User): string {
    if (user.isOrigin) {
        return "Super Admin"
    }
    if (user.isInstanceAdmin) {
        return "Instance Admin"
    }
    return "Space Admin"
}