import { useState } from "react";

type DefaultTypes = {
    [key: string]: any;
};

type InputElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

type ReturnTypes = [
    any,
    (event: React.ChangeEvent<InputElements>) => void,
    React.Dispatch<React.SetStateAction<any>>
];

const useInputs = (initialValues: DefaultTypes): ReturnTypes => {
    const [values, setValues] = useState(initialValues);

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