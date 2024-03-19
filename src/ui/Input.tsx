import { ChangeEventHandler } from "react";

type Props = {
    onChange: ChangeEventHandler<HTMLInputElement>;
    onSubmit: Function;
    input: string;
    placeholder: string;
};

export default function Input({ onChange, onSubmit, input, placeholder }: Props) {
    return (
        <input
            placeholder={placeholder}
            onChange={onChange}
            value={input}
            onKeyDown={(e) => (e.key == "Enter" ? onSubmit() : null)}
        />
    );
}
