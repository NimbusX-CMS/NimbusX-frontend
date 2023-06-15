import {GoTriangleDown, GoTriangleUp} from "react-icons/go";
import TextField from "@/components/core/input/text_field";
import CheckBox from "@/components/core/input/check_box";
import ContentTypeItem, {MediaItemType} from "@/components/admin/content-type/content_type_item";
import PrimaryButton from "@/components/core/input/primary_button";
import List from "@/components/core/input/list";
import {useState} from "react";

export default function ContentTypeHolder() {
    const [open, setOpen] = useState(false)

    return (
        <>
            {/* HEAD */}
            <button onClick={() => setOpen(!open)}
                className="flex items-center bg-admin-text text-admin-primary-background py-3 px-2 rounded-lg w-full">
                <span>Game</span>
                {open
                    ? <GoTriangleUp className="ml-auto"/>
                    : <GoTriangleDown className="ml-auto"/>
                }
            </button>
            {/* BODY */}
            {open &&
                <div className="bg-admin-secondary-background p-4">
                    <div className="flex gap-4 items-start grow-0">
                        <div className="flex gap-4 w-[55%]">
                            <TextField title="Stage URL" placeholder="https://stage.your-website.net/blog"
                                       className="w-[50%]"/>
                            <CheckBox title="Mehrsprachig"/>
                            <CheckBox title="Einzelner Typ"/>
                        </div>
                        <div>
                            <List title="Erlaubte HTTP Methoden" values={["GET", "POST", "DELETE"]}/>
                        </div>
                    </div>
                    <div className="mt-4">
                        <ContentTypeItem name="name" type={MediaItemType.TEXT} deletable={false}/>
                        <PrimaryButton tittle="+ Neues Feld" classname="h-[40px] mt-24"/>
                    </div>
                </div>
            }
        </>
    )
}