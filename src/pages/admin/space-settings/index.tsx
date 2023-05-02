import Sidebar from "@/components/admin/sidebar/sidebar";
import SidebarSpace, {SelectedOption} from "@/components/admin/sidebar/sidebar_space";
import TextField from "@/components/core/input/text_field";
import ImagePicker from "@/components/core/input/image_picker";
import ColorPicker from "@/components/core/input/color_picker";
import PrimaryButton from "@/components/core/input/primary_button";
import LanguageItem from "@/components/core/language_item";

export default function SpaceSettings() {
    return (
        <main className="flex min-h-screen">
            <Sidebar spaces={[
                <SidebarSpace key="Foodiee Webseite" title="Foodiee Webseite"
                              selectedOption={SelectedOption.SPACE_SETTINGS}/>
            ]}/>
            <div className="flex flex-col gap-32 p-9 ml-[20%]">
                <div className="flex flex-col gap-4">
                    <h2 className="text-admin-text-secondary font-bold">THEME EINSTELLUNGEN</h2>
                    <TextField title="Space Name" placeholder="Name..." className="w-full text-3xl"/>
                    <ImagePicker/>
                    <ColorPicker title="Primary Color" placeholder="#576CA8"/>
                    <ColorPicker title="Secondary Color" placeholder="#274690"/>
                    <ColorPicker title="Primary Background Color" placeholder="#1D1F25"/>
                    <ColorPicker title="Secondary Background Color" placeholder="#272A30"/>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-admin-text-secondary font-bold">MULTI-LANGUAGE EINSTELLUNGEN</h2>
                    <div className="flex gap-4">
                        <TextField title="Name" placeholder="en-US"/>
                        <PrimaryButton tittle="Hinzufügen"/>
                    </div>
                    <LanguageItem title="de-DE"/>
                    <LanguageItem title="en-US"/>
                </div>
            </div>
        </main>
    )
}
