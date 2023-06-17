import {Listbox} from "@headlessui/react";
import {useEffect, useState} from "react";
import {GoCheck, GoTriangleDown, GoTriangleUp} from "react-icons/go";

export default function List({title, onChange, values}: ListProps) {
    const [selectedOption, setSelectedOption] = useState<Array<string>>([values[0]])

    useEffect(() => {
        if (!onChange) return
        onChange(selectedOption)
    }, [onChange, selectedOption])

    return (
        <Listbox value={selectedOption} onChange={setSelectedOption} multiple>
            {({open}) => (
                <div className="flex flex-col">
                    <Listbox.Button
                        className="flex flex-col border-2 border-admin-text-secondary rounded-xl px-4 py-1">
                        <span className="text-admin-text-secondary text-xs">{title}</span>
                        <div className="flex items-center w-full">
                            {selectedOption.length === 0
                                ? <span className="text-admin-text-secondary">None</span>
                                : selectedOption.join(", ")
                            }
                            {open
                                ? <GoTriangleUp className="ml-auto"/>
                                : <GoTriangleDown className="ml-auto"/>
                            }
                        </div>
                    </Listbox.Button>
                    <Listbox.Options>
                        <div
                            className="flex flex-col border-2 border-admin-text-secondary border-t-transparent rounded-xl rounded-t-none px-4 py-1 pt-4 -mt-[9px]">
                            {values.map((value) => (
                                <Listbox.Option key={value} value={value}>
                                    {({selected}) => (
                                        <div className="flex items-center gap-2">
                                            {selected &&
                                                <GoCheck/>
                                            }
                                            <button>{value}</button>
                                        </div>
                                    )}
                                </Listbox.Option>
                            ))}
                        </div>
                    </Listbox.Options>
                </div>
            )}
        </Listbox>
    )
}

type ListProps = {
    title: string
    onChange?: (value: string[]) => void
    values: string[]
}