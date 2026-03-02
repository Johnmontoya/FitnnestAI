import { useState } from "react";

type DefaultTypes = Record<string, unknown>;

type InputElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

type ReturnTypes<T> = [
    T,
    (event: React.ChangeEvent<InputElements>) => void,
    React.Dispatch<React.SetStateAction<T>>
];

const useInputs = <T extends DefaultTypes>(initialValues: T): ReturnTypes<T> => {
    const [values, setValues] = useState<T>(initialValues);

    const onChange = (event: React.ChangeEvent<InputElements>) => {
        const { name, value, type } = event.target;

        const newValue =
            type === "checkbox"
                ? (event.target as HTMLInputElement).checked
                : type === "number"
                    ? parseFloat(value) || 0
                    : value;

        setValues({
            ...values,
            [name]: newValue,
        });
    };

    return [values, onChange, setValues];
};

export default useInputs;