import {ChangeEvent, useRef} from "react";

export default function ImagePicker({title, accept}: FilePickerProps) {

    const previewRef = useRef<HTMLImageElement>(null)

    function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files
        if (files === null) {
            return
        }

        const file = files.item(0)
        if (file === null) {
            return
        }

        previewRef.current!.style.backgroundImage = `url('${URL.createObjectURL(file.slice())}')`
    }

    return (
        <div className="grid grid-cols-2 grid-rows-2 w-[545px]">
            <div ref={previewRef} className="row-span-2 w-[256px] h-[256px] bg-contain bg-no-repeat bg-center"/>
            <div className="justify-self-start self-center w-[75%]">
                {title}
            </div>
            <div className="row-start-2 col-start-2 justify-self-start self-end py-4">
                <label htmlFor="upload"
                       className="w-full h-full bg-admin-primary hover:bg-admin-secondary cursor-pointer p-2 px-6 rounded-lg font-bold">
                    Wähle ein Bild aus</label>
                <input type="file" accept={accept} className="opacity-0 absolute -z-10" id="upload"
                       onChange={handleFileInput}/>
            </div>
        </div>
    )
}

type FilePickerProps = {
    title: string
    accept: string
}