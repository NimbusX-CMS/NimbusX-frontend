export default function SidebarAccount({displayName, role}: SidebarAccountProps) {
    return (
        <div className="bg-admin-primary-background flex items-center gap-4 rounded-xl p-4">
            <div className="h-[64px] w-[64px] bg-admin-primary rounded-full flex items-center justify-center text-3xl">
                {displayName.substring(0, 2)}
            </div>
            <div className="flex flex-col">
                <span className="font-bold">{displayName}</span>
                <span className="text-xs"><i>{role}</i></span>
            </div>
        </div>
    )
}

type SidebarAccountProps = {
    displayName: string
    role: string
}