import List from "@/components/core/input/list";
import CheckBox from "@/components/core/input/check_box";
import ImagePicker from "@/components/core/input/image_picker";

export default function MediaSettings() {
    return (
        <div className="flex flex-col gap-4">
            <ImagePicker title="Setze einen Bild als Default" accept={".png,.jpeg,.mp4"}/>
            <List title="Erlaubte Dateien" values={[".png", ".jpeg", ".mp4"]}/>
            <CheckBox title="In verschiedenen Auflößungen speichern"/>
        </div>
    )
}